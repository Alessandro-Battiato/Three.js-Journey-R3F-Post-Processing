import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
    Vignette,
    ToneMapping,
    EffectComposer,
    Glitch,
    Noise,
    Bloom,
    DepthOfField,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { GlitchMode, BlendFunction } from "postprocessing";
import { useRef } from "react";
import Drunk from "./Drunk";
import { useControls } from "leva";

export default function Experience() {
    const drunkRef = useRef();

    const drunkProps = useControls("Drunk Effect", {
        frequency: { value: 2, min: 1, max: 20 },
        amplitude: { value: 0.1, min: 0, max: 1 },
    });

    return (
        <>
            <color args={["#ffffff"]} attach="background" />

            {/*Multisampling solves the aliasing effect (stair like effect) if you put the value to 0 the stairs on the edges of the objects appear*/}
            <EffectComposer multisampling={8}>
                {/*Tone mapping MUST always remain at the very beginning... or atleast this is what Bruno Simon said in the course but the BLOOM EFFECT won't work if the TONEMAPPING component comes BEFORE the BLOOM component*/}
                {/*BlendFunction has many more effects, we are just sticking to the normal one*/}

                {/*
                    <Vignette
                        offset={0.3}
                        darkness={0.9}
                        blendFunction={BlendFunction.NORMAL}
                    />
                    <Glitch
                        delay={[0.5, 1]}
                        duration={[0.1, 0.3]}
                        strength={[0.2, 0.4]}
                        mode={GlitchMode.SPORADIC}
                    />
                    <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} />
                    <Bloom mipmapBlur luminanceThreshold={1.1} />
                    The following effect is a bit complicated and overall bad for performances, not encouraged by Bruno Simon
                    <DepthOfField
                        focusDistance={0.025}
                        focalLength={0.025}
                        bokehScale={6}
                    />
                */}
                <Drunk
                    ref={drunkRef}
                    blendFunction={BlendFunction.DARKEN}
                    {...drunkProps}
                />
                <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
            </EffectComposer>

            <Perf position="top-left" />

            <OrbitControls makeDefault />

            <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
            <ambientLight intensity={1.5} />

            <mesh castShadow position-x={-2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>

            <mesh castShadow position-x={2} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" toneMapped={false} />
                {/*
                    Reasons why you switched to the meshBasicMaterial instead of using the meshStandardMaterial:

                    The main reason was to fix an issue mentioned by Bruno Simon where, using the meshStandardMaterial
                    to make the cube glow, presented a problem where we had the face of the cube facing the camera which was
                    the brightest side of them all, while the remaining sides were less bright, and meshBasicMaterial solves this issue as it doesn't care of the lights and all sides of the cube are equally bright

                    In addition, meshBasicMaterial is better for performance reasons

                    A drawback of meshBasicMaterial though is that it cannot use the props emissive and emissive intensity
                    but you can still make it glow using the color with the array as provided beneath

                    <meshStandardMaterial
                        color="white"
                        emissive="orange"
                        emissiveIntensity={20}
                        toneMapped={false}
                    />
                */}
                {/*<meshBasicMaterial color={[1.5, 1, 4]} toneMapped={false} />*/}
            </mesh>

            <mesh
                receiveShadow
                position-y={-1}
                rotation-x={-Math.PI * 0.5}
                scale={10}
            >
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </>
    );
}
