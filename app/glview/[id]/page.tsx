"use client";
// import glb from '/glb/sony_bluetooth_speaker.glb'
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, OrbitControls, PerspectiveCamera, useGLTF, useHelper } from "@react-three/drei";
import { Mesh, Object3D, SpotLight, SpotLightHelper } from "three";
// import { LinearEncoding } from "@react-three/drei/helpers/deprecated";

const Model = () => {
    const ref = useRef<Mesh>(null);
    // const { camera } = useThree()
    const { scene } = useGLTF("/glb/sony_bluetooth_speaker.glb", true);
    // useGLTF.preload('https://res.cloudinary.com/di7boajee/image/upload/v1730315920/monitor_speaker_jdmuzt.glb')
    scene.scale.set(12, 12, 12); // Adjust scale if necessary
    scene.position.set(0, -1, 0);

    // const [roughnessMap, normalMap] = useLoader(TextureLoader, [
    //     "/assets/textures/metal-siding-base-bl/metal-siding-base_roughness.png",
    //     "/assets/textures/metal-siding-base-bl/metal-siding-base_normal-ogl.png",
    // ])
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
    // useEffect(() => {
    //     [roughnessMap, normalMap].forEach((map) => {
    //         map.wrapS = RepeatWrapping;
    //         map.wrapT = RepeatWrapping;
    //         map.repeat.set(20, 20);
    //     })
    //     // normalMap.encoding = LinearE
    // }, [roughnessMap, normalMap])

    const spotLightRef = useRef<SpotLight | null>(null);
    // useHelper(spotLightRef, SpotLightHelper, "hotpink");
    useHelper(spotLightRef as React.MutableRefObject<Object3D>, SpotLightHelper, "hotpink");
    const [lightintensity, setlightintensity] = useState(0)
    const [isInitialFlikkerdone, setisInitialFlikkerdone] = useState(false)
    const [InitialFlikkercount, setInitialFlikkercount] = useState(0)
    useFrame(() => {
        // console.log(delta);        

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

    return (
        <>
            <primitive ref={ref} object={scene} />
            <PerspectiveCamera
                makeDefault position={[3, 2, 5]}
                fov={50} />
            <color attach="background" args={[0, 0, 0]} />
            <ambientLight intensity={.05} />
            {/* <spotLight castShadow
                penumbra={1}
                shadow-bias={-0.0001}
                color={[1, 0.25, 0.7]}
                position={[5, 5, 0]}
                intensity={lightintensity}
            /> */}
            <spotLight castShadow
                // ref={spotLightRef}
                penumbra={1}
                shadow-bias={-0.0001}
                color={[1, 0.25, 0.7]}
                position={[0, 5, 5]}
                intensity={lightintensity}
            />
            <spotLight castShadow
                // ref={spotLightRef}
                penumbra={1}
                shadow-bias={-0.0001}
                color={[1, 0.25, 0.7]}
                position={[0, 5, -5]}
                intensity={lightintensity}
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

            {/* <spotLight
                castShadow
                intensity={lightintensity}
                angle={0.6}
                penumbra={1}
                // // ref={spotLightRef}
                position={[5, 5, 0]}
                shadow-bias={-0.0001}
                color={[1, 0.25, 0.7]}
            /> */}
            {/* <spotLight
                castShadow
                color={[0.14, 0.5, 1]}
                intensity={lightintensity}
                angle={0.6}
                penumbra={1}
                position={[-5, 5, 0]}
                shadow-bias={-0.0001}
            /> */}
            {/* <spotLight
                castShadow
                color={[0.14, 1, 1]}
                intensity={lightintensity}
                angle={0.6}
                penumbra={1}
                position={[0, 5, 5]}
                shadow-bias={-0.0001}
            /> */}
            {/* <spotLight
                castShadow
                intensity={lightintensity}
                angle={0.6}
                penumbra={1}
                position={[5, 10, 5]} // Right and above
                shadow-bias={-0.0001}
                color={[1, 0.25, 0.7]}
            /> */}
            {/* <spotLight
                castShadow
                intensity={lightintensity}
                angle={0.6}
                penumbra={1}
                position={[-5, 10, 5]} // Left and above
                shadow-bias={-0.0001}
                color={[0.14, 0.5, 1]}
            /> */}
            {/* <spotLight
                castShadow
                intensity={lightintensity}
                angle={0.6}
                penumbra={1}
                position={[5, 10, -5]} // Right and back
                shadow-bias={-0.0001}
                color={[0.14, 1, 1]}
            />
            <spotLight
                castShadow
                intensity={lightintensity}
                angle={0.6}
                penumbra={1}
                position={[-5, 10, -5]} // Left and back
                shadow-bias={-0.0001}
                color={[0.14, 1, 1]}
            /> */}
            <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
                <planeGeometry args={[30, 30]} />
                <MeshReflectorMaterial
                    envMapIntensity={0}
                    // normalMap={normalMap}
                    // normalMap-encoding={LinearEncoding}
                    // roughnessMap={roughnessMap}
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
        </>
    )
};

const Page = () => {
    return (
        <div className="w-full h-full fixed inset-0 z-[1000] bg-black cursor-grab">
            <Canvas

                className="fixed top-0 left-0 right-0 bottom-0  w-full h-full"
                camera={{ position: [2, 2, 3] }}
            >
                <mesh>
                    <meshStandardMaterial color={"red"} />
                    <boxGeometry args={[1, 2, 4]} />
                </mesh>
                <OrbitControls autoRotate={true} autoRotateSpeed={0.2} minDistance={2} maxDistance={10} maxPolarAngle={Math.PI / 2.4} minPolarAngle={Math.PI / 9} />
                <Model />
                {/* <CubeCamera resolution={256} frames={Infinity}>
                    {(texture) => (
                        <>
                        <Environment map={texture} />
                        </>
                    )}
                </CubeCamera> */}
                {/* <TorosGeos /> */}
            </Canvas>
        </div>
    );
};
// const TorosGeos = () => {
//     const [colors, setcolors] = useState("hsl(0, 100%, 50%)")
//     const [order, setorder] = useState(true)
//     const torosRef: MutableRefObject<(Mesh | null)[]> = useRef([]);
//     // const [colors, setcolors] = useState({ one: "rgb(255, 0, 0)", two: "rgb(255, 0, 0)", three: "rgb(255, 0, 0)", four: "rgb(255, 0, 0)", five: "rgb(255, 0, 0)" })
//     let [clrref, setcolorref] = useState(0)
//     useFrame(() => {
//         // const ramdomval = Math.ceil(Math.random() * 2)
//         // // console.log(delta,ramdomval);
//         // console.log(colors);
//         // setcolors(`hsl(${clrref}, 100%, 50%)`)
//         // if (order) {
//         //     setcolorref(clrref + ramdomval)
//         // } else {
//         //     setcolorref(clrref - ramdomval)
//         //     // setcolors(`hsl(${clrref-ramdomval}, 100%, 50%)`)
//         // }

//         // for (let i = 0; i < torosRef.current.length; i++) {
//         //     let mesh = torosRef.current[i]

//         //     let z = Math.abs((i - 7) * 3.5)
//         //     mesh?.position.set(0, 0, z)
//         //     mesh?.scale.set(1 - z * .04, 1 - z * .04, 1 - z * .04)
//         //     let colorscale = 1
//         //     if (z > 2) {
//         //         colorscale = 1 - (Math.min(z, 12) - 2) / 10
//         //     }
//         //     colorscale *= .5
//         //     if (i % 2 == 1) {
//         //         if (mesh?.material instanceof MeshStandardMaterial) {
//         //             mesh.material.emissive = new Color(6, 0.16, 4).multiplyScalar(colorscale)
//         //         }
//         //     } else {
//         //         if (mesh?.material instanceof MeshStandardMaterial) {
//         //             mesh.material.emissive = new Color(.2, 0.6, 3).multiplyScalar(colorscale)
//         //         }
//         //     }

//         // }

//     })
//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (order) {
//                 setorder(false)
//             } else {
//                 setorder(true)
//             }
//         }, 3000);
//         return (
//             clearInterval(interval)
//         )
//     }, [order])
//     return (
//         <>
//             {
//                 Array(14).fill(0).map((v, i) => {
//                     return (<mesh
//                         ref={(ref) => { torosRef.current[i] = ref }}
//                         key={i} position={[0, 0, 0]}>
//                         <torusGeometry args={[1.2, 0.13, 160, 100]} />
//                         <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />
//                     </mesh>)
//                 })
//             }
//         </>
//     )
// }

export default Page;