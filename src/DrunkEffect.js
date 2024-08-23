import { Effect } from "postprocessing";
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

    void mainUv(inout vec2 uv) {
        uv.y += sin(uv.x * frequency) * amplitude;
    }
    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
    {
        vec4 color = inputColor;
        color.rgb *= vec3(0.8, 1.0, 0.5);
        outputColor = color;
    }
`;

export default class DrunkEffect extends Effect {
    constructor({ amplitude, frequency }) {
        super("DrunkEffect", fragmentShader, {
            uniforms: new Map([
                ["frequency", new Uniform(frequency)],
                ["amplitude", new Uniform(amplitude)],
            ]),
        }); // this calls the constructor method on the Effect
    }
}
