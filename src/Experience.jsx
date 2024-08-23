import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
    Vignette,
    ToneMapping,
    EffectComposer,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

export default function Experience() {
    return (
        <>
            {/*Multisampling solves the aliasing effect (stair like effect) if you put the value to 0 the stairs on the edges of the objects appear*/}
            <EffectComposer multisampling={8}>
                {/*Tone mapping MUST always remain at the very beginning*/}
                <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
                <Vignette offset={0.3} darkness={0.9} />
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
                <meshStandardMaterial color="mediumpurple" />
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
