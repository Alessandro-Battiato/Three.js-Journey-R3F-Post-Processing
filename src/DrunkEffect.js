import { Effect } from "postprocessing";

/* 
    The following is a glsl function that must follow the same strict parameter order or it might break
    we are using the WebGL 2 syntax where we can specify more information associated with each parameter:

    - const means that the parameter is not writable.
    - in means that it’s a copy of the actual variable and changing it won’t affect the initial variable sent when calling the function.
    - out means that changing this value will change the variable sent when calling the function.

    - inputColor contains the current color for that pixel which is defined by the previous effects.
    - uv contains the render coordinates (from 0,0 at the bottom left corner to 1,1 in the top right corner).
    - outputColor is what we need to change in order to apply the effect.
*/
const fragmentShader = /* glsl */ `
    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
    {
        outputColor = vec4(uv, 1.0, 1.0);
    }
`;

export default class DrunkEffect extends Effect {
    constructor() {
        super("DrunkEffect", fragmentShader, {}); // this calls the constructor method on the Effect
    }
}
