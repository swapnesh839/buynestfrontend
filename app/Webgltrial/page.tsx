"use client";
// import glb from '/glb/sony_bluetooth_speaker.glb'
import * as THREE from 'three';
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshReflectorMaterial, OrbitControls, PerspectiveCamera, useGLTF, useHelper } from "@react-three/drei";
import { Mesh, Object3D, SpotLight, SpotLightHelper } from "three";
// import { useParams, useRouter } from "next/navigation";
import { ArrowLeftCircle } from "lucide-react";
// import { LinearEncoding } from "@react-three/drei/helpers/deprecated";
interface ModelProps {
  MODEL_PATH: string
}

const MODEL_PATH = "https://res.cloudinary.com/di7boajee/image/upload/v1730542084/headphones_ualmu2.glb"
// const MODEL_PATH = "https://res.cloudinary.com/di7boajee/image/upload/v1730315920/monitor_speaker_jdmuzt.glb"

const Page = () => {
  const containerRef2 = useRef<HTMLDivElement>(null)
  const ModelComponent: React.FC<ModelProps> = ({ MODEL_PATH }) => {
    const ref = useRef<Mesh>(null);
    const [dimention, setdimention] = useState<THREE.Vector3 | null>(null)
    const { scene } = useGLTF(MODEL_PATH)
    useEffect(() => {
      if (!scene) return;
      scene.updateWorldMatrix(true, true);
      const obj = new THREE.Box3().setFromObject(scene);
      setdimention(obj.getSize(new THREE.Vector3()))
    }, [scene]);
    const screen = useThree()
    useEffect(() => {
      const updatedimensions = () => {
        if (ref.current) {
          const { width } = screen.size
          if (dimention?.x && dimention?.x < 1) {
            switch (true) {
              case width < 340:
                ref.current.scale.set(20, 20, 20)
                break;
              case width < 800:
                ref.current.scale.set(30, 30, 30)
                break;
              case width < 1100:
                ref.current.scale.set(40, 40, 40)
                break;
              case width < 1500:
                ref.current.scale.set(60, 60, 60)
                break;
            }
          } else if (dimention?.x && dimention?.x < 1.5) {
            switch (true) {
              case width < 340:
                ref.current.scale.set(.2, .2, .2)
                break;
              case width < 800:
                ref.current.scale.set(.3, .3, .3)
                break;
              case width < 1100:
                ref.current.scale.set(.4, .4, .4)
                break;
              case width < 1500:
                ref.current.scale.set(.43, .43, .43)
                break;
            }
          } else if (dimention?.x && dimention?.x < 2) {
            switch (true) {
              case width < 340:
                ref.current.scale.set(.2, .2, .2)
                break;
              case width < 800:
                ref.current.scale.set(.33, .33, .33)
                break;
              case width < 1100:
                ref.current.scale.set(.42, .42, .42)
                break;
              case width < 1500:
                ref.current.scale.set(.44, .44, .44)
                break;
            }
          } else {
            console.log("can't show scale");
          }
          console.log(screen.size.width);
        }
      }
      updatedimensions()
      window.addEventListener('resize', updatedimensions)
      return () => {
        window.removeEventListener('resize', updatedimensions)
      }
    }, [screen, dimention])

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
          intensity={lightintensity * 1}
        />
        <spotLight castShadow
          // ref={spotLightRef}
          penumbra={1}
          shadow-bias={-0.0001}
          color={[1, 1, 1]}
          position={[0, 1.5, 4]}
          intensity={lightintensity * 1}
        />
        <spotLight castShadow
          // ref={spotLightRef}
          penumbra={1}
          shadow-bias={-0.0001}
          color={[1, 0.25, 0.7]}
          position={[0, 1.5, -4]}
          intensity={lightintensity * .3}
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

  // const { id } = params;
  return (
    <div ref={containerRef2} className="w-full h-full fixed top-0 text-white left-0 right-0 bottom-0 z-[1000] bg-black cursor-grab">
      <div onClick={() => { }} className="absolute bg-cyan-300 cursor-pointer p-1 text-black rounded-full z-[1002] top-[2%] left-[2%] flex justify-center align-middle">
        <ArrowLeftCircle />
      </div>
      <Canvas
        className="w-full h-full"
      >
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
        <Model MODEL_PATH={MODEL_PATH} />
      </Canvas>
    </div>
  );
};
export default React.memo(Page);