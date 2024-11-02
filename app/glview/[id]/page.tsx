"use client";
// import glb from '/glb/sony_bluetooth_speaker.glb'
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, OrbitControls, PerspectiveCamera, useGLTF, useHelper } from "@react-three/drei";
import { Mesh, Object3D, SpotLight, SpotLightHelper } from "three";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeftCircle } from "lucide-react";
// import { LinearEncoding } from "@react-three/drei/helpers/deprecated";
interface ModelProps {
    scale: number,
    MODEL_PATH: string
}
const ModelComponent: React.FC<ModelProps> = ({ scale, MODEL_PATH }) => {
    const ref = useRef<Mesh>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.traverse((object) => {
                if (object instanceof Mesh) {
                    object.castShadow = true;
                    object.receiveShadow = true;
                }
            });
        }
    }, [ref])

    const spotLightRef = useRef<SpotLight | null>(null);
    // useHelper(spotLightRef, SpotLightHelper, "hotpink");
    useHelper(spotLightRef as React.MutableRefObject<Object3D>, SpotLightHelper, "hotpink");
    const [lightintensity, setlightintensity] = useState(0)
    const [isInitialFlikkerdone, setisInitialFlikkerdone] = useState(false)
    const [InitialFlikkercount, setInitialFlikkercount] = useState(0)
    useFrame(() => {
        if (isInitialFlikkerdone) {
            if (lightintensity < 8) {
                setlightintensity(lightintensity + 0.1)
            }
        } else {
            if (InitialFlikkercount > 6) {
                const flikkerstrength = Math.random() * 90
                // console.log(flikkerstrength,"flickerstength");
                setlightintensity(flikkerstrength)
                setInitialFlikkercount(InitialFlikkercount + 1)
            } else {
                setlightintensity(0)
                setisInitialFlikkerdone(true)
            }
        }
    })
    const { scene } = useGLTF(MODEL_PATH)
    useEffect(() => {
        if (scene) {
            scene.scale.set(scale, scale, scale);
        }
    }, [scene, scale]);
    // scene.position.set(0, 0, 0);

    return (
        <>
            <primitive ref={ref} object={scene} />
            <color attach="background" args={[0, 0, 0]} />

            <spotLight castShadow
                // ref={spotLightRef}
                penumbra={1}
                shadow-bias={-0.0001}
                color={[1, 1, 1]}
                position={[0, 5, 5]}
                intensity={lightintensity}
            />
            <spotLight castShadow
                // ref={spotLightRef}
                penumbra={1}
                shadow-bias={-0.0001}
                color={[1, 1, 1]}
                position={[0, 5, -5]}
                intensity={lightintensity}
            />
            <spotLight castShadow
                // ref={spotLightRef}
                penumbra={1}
                shadow-bias={-0.0001}
                color={[1, 1, 1]}
                position={[0, 1.5, 0]}
                intensity={lightintensity*1}
            />
            <spotLight castShadow
                // ref={spotLightRef}
                penumbra={1}
                shadow-bias={-0.0001}
                color={[1, 0.25, 0.7]}
                position={[0, 1.5, 0]}
                intensity={lightintensity*.3}
            />
            <spotLight castShadow
                // ref={spotLightRef}
                penumbra={1}
                shadow-bias={-0.0001}
                color={[1, 0.25, 0.7]}
                position={[5, 5, 0]}
                intensity={lightintensity}
            />
            <spotLight castShadow
                // ref={spotLightRef}
                penumbra={1}
                shadow-bias={-0.0001}
                color={[1, 0.25, 0.7]}
                position={[-5, 5, 0]}
                intensity={lightintensity}
            />
            <spotLight castShadow
                // ref={spotLightRef}
                penumbra={1}
                shadow-bias={-0.0001}
                color={[0.14, 0.5, 1]}
                position={[0, 5, 5]}
                intensity={lightintensity}
            />
            <spotLight castShadow
                // ref={spotLightRef}
                penumbra={1}
                shadow-bias={-0.0001}
                color={[0.14, 0.5, 1]}
                position={[0, 5, -5]}
                intensity={lightintensity}
            />
            <spotLight castShadow
                // ref={spotLightRef}
                penumbra={1}
                shadow-bias={-0.0001}
                color={[0.14, 0.5, 1]}
                position={[5, 5, 0]}
                intensity={lightintensity}
            />
            <spotLight castShadow
                // ref={spotLightRef}
                penumbra={1}
                shadow-bias={-0.0001}
                color={[0.14, 0.5, 1]}
                position={[-5, 5, 0]}
                intensity={lightintensity}
            />
            <spotLight castShadow
                // ref={spotLightRef}
                penumbra={1}
                shadow-bias={-0.0001}
                color={[0.14, 0.5, 1]}
                position={[0, 5, 0]}
                intensity={lightintensity}
            />

        </>
    )
};
const Model: React.FC<ModelProps> = React.memo(ModelComponent);

const MODEL_PATH = "https://res.cloudinary.com/di7boajee/image/upload/v1730315920/monitor_speaker_jdmuzt.glb"

const Page = () => {
    const containerRef2 = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState<number>(1)
    const { id } = useParams();
    const router = useRouter()
    // const { id } = params;

    const debounce = <F extends (...args: unknown[]) => void>(func: F, delay: number): ((...args: Parameters<F>) => void) => {
        let timeoutId: NodeJS.Timeout
        return (...args: Parameters<F>) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => func(...args), delay)
        }
    }
    useEffect(() => {
        const updateScale = () => {
            if (containerRef2.current) {
                const { width } = containerRef2.current.getBoundingClientRect()
                const w = 300
                const minDimension = Math.min(width, w)
                setScale(minDimension * .25)
            }
        }

        updateScale()
        const handleResize = debounce(updateScale, 100)
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [id])
    return (
        <div ref={containerRef2} className="w-full h-full fixed top-0 text-white left-0 right-0 bottom-0 z-[1000] bg-black cursor-grab">
            <div onClick={() => { router.back() }} className="absolute bg-cyan-300 cursor-pointer p-1 text-black rounded-full z-[1002] top-[2%] left-[2%] flex justify-center align-middle">
                <ArrowLeftCircle />
            </div>
            <Canvas
                className="w-full h-full"
            // camera={{ position: [2, 2, 3] }}
            >
                {/* <mesh>
                    <meshStandardMaterial color={"red"} />
                    <boxGeometry args={[1, 2, 4]} />
                </mesh> */}

                <PerspectiveCamera
                    makeDefault
                    position={[0, 0, 0]}
                    fov={50} />
                <ambientLight intensity={.05} />
                <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
                    <planeGeometry args={[60, 60]} />
                    <MeshReflectorMaterial
                        envMapIntensity={0}
                        dithering={true}
                        mirror={0}
                        blur={[1000, 300]}
                        mixBlur={20}
                        depthScale={0.01}
                        minDepthThreshold={0.9}
                        maxDepthThreshold={1}
                        depthToBlurRatioBias={0.25}
                        mixStrength={80}
                        mixContrast={1}
                        resolution={1024}
                        metalness={0.5}
                        reflectorOffset={0.2}
                        roughness={.8} />
                </mesh>
                <OrbitControls autoRotate={true} autoRotateSpeed={0.2} minDistance={2} maxDistance={10} maxPolarAngle={Math.PI / 2.4} minPolarAngle={Math.PI / 9} />
                <Model MODEL_PATH={MODEL_PATH} scale={scale} />
            </Canvas>
        </div>
    );
};
export default React.memo(Page);