import React, { forwardRef } from "react";
import DrunkEffect from "./DrunkEffect";

const Drunk = forwardRef(({ amplitude, frequency }, ref) => {
    const effect = new DrunkEffect({ amplitude, frequency });

    return <primitive object={effect} ref={ref} />;
});

export default Drunk;
