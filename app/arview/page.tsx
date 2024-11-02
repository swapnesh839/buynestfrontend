"use client"
import React, { useEffect, useRef, useState } from 'react'
import { createXRStore, XR } from "@react-three/xr"
import { Canvas, useThree } from '@react-three/fiber'
import { ArrowLeftCircle } from 'lucide-react'
import * as THREE from "three"
import { useGLTF } from '@react-three/drei'
// import { Button } from '@/components/ui/button'
const store = createXRStore({
  controller: { left: false },
})


interface ModelProps {
  MODEL_PATH: string
}

// const MODEL_PATH = "https://res.cloudinary.com/di7boajee/image/upload/v1730542084/headphones_ualmu2.glb"
const MODEL_PATH = "https://res.cloudinary.com/di7boajee/image/upload/v1730315920/monitor_speaker_jdmuzt.glb"


const ModelComponent: React.FC<ModelProps> = ({ MODEL_PATH }) => {
  const ref = useRef<THREE.Mesh>(null);
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
      ref.current.traverse((object: THREE.Object3D) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
    }
  }, [ref])

  return (
    <>
      <primitive ref={ref} object={scene} />
    </>
  )
};
const Model: React.FC<ModelProps> = React.memo(ModelComponent);


const App = () => {
  const Artrigger = ()=>{
    store.enterAR()
  }
  useEffect(() => {
    Artrigger()
  }, [])
  return (
    <div className="w-full h-full fixed top-0 text-white left-0 right-0 bottom-0 z-[1000] bg-white cursor-grab">
      <div onClick={() => { }} className="absolute bg-cyan-300 cursor-pointer p-1 text-black rounded-full z-[1002] top-[2%] left-[2%] flex justify-center align-middle">
        <ArrowLeftCircle />
      </div>
      {/* <div onClick={() => { }} className="absolute w-full cursor-pointer p-1 text-black rounded-full z-[1002] bottom-0 left-0 flex justify-center align-middle">
        <Button onClick={()=>{Artrigger()}}>EnterAr</Button>
      </div> */}
      <Canvas
        className="w-full h-full"
        camera={{ position: [1, 1, 2] }}
      >
        <ambientLight intensity={1}/>
        <XR store={store}>
          <Model MODEL_PATH={MODEL_PATH} />
        </XR>
      </Canvas>
    </div>
  )
}

export default App