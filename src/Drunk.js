import React, { forwardRef } from "react";
import DrunkEffect from "./DrunkEffect";

const Drunk = forwardRef(({ amplitude, frequency, blendFunction }, ref) => {
    const effect = new DrunkEffect({ amplitude, frequency, blendFunction });

    return <primitive object={effect} ref={ref} />;
});

export default Drunk;
