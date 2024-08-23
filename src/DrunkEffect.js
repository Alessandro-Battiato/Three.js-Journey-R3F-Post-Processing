import { BlendFunction, Effect } from "postprocessing";
import { Uniform } from "three";

/* 
    The following is a glsl function that must follow the same strict parameter order or it might break
    we are using the WebGL 2 syntax where we can specify more information associated with each parameter:

    - const means that the parameter is not writable.
    - in means that it’s a copy of the actual variable and changing it won’t affect the initial variable sent when calling the function.
    - out means that changing this value will change the variable sent when calling the function.

    - inputColor contains the current color for that pixel which is defined by the previous effects.
    - uv contains the render coordinates (from 0,0 at the bottom left corner to 1,1 in the top right corner).
    - outputColor is what we need to change in order to apply the effect.

    - inout means we can both read and write it
*/
const fragmentShader = /* glsl */ `
    uniform float frequency;
    uniform float amplitude;
    uniform float offset;

    void mainUv(inout vec2 uv) {
        uv.y += sin(uv.x * frequency + offset) * amplitude;
    }
    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
    {
        outputColor = vec4(0.8, 1.0, 0.5, inputColor.a);
    }
`;

export default class DrunkEffect extends Effect {
    constructor({
        amplitude = 0,
        frequency = 0,
        blendFunction = BlendFunction.DARKEN, // this is to make the component Drunk easily reusable by other developers, without applying this fallback value, when rendering <Drunk /> without props all they would see is a green screen because of the filter
    }) {
        super("DrunkEffect", fragmentShader, {
            blendFunction,
            uniforms: new Map([
                ["frequency", new Uniform(frequency)],
                ["amplitude", new Uniform(amplitude)],
                ["offset", new Uniform(0)],
            ]),
        }); // this calls the constructor method on the Effect
    }

    // Since we are creating a DrunkEffect for the post processing and not for R3F itself, we are not animating this using useFrame in R3F's style, rather we will animate this using the update method faithful to the postprocessing style
    update(renderer, inputBuffer, deltaTime) {
        this.uniforms.get("offset").value += deltaTime; // fix the framerate issue using the delta time, so that this animation works the same for everybody regardless of the PC build
    }
}
