'use client'

import React, { Suspense, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, Environment, OrbitControls } from "@react-three/drei"
import { Loader2 } from "lucide-react"
// import { Group } from "three"

const MODEL_PATH = "https://res.cloudinary.com/di7boajee/image/upload/v1730315920/monitor_speaker_jdmuzt.glb"
// const MODEL_PATH = "/glb/sony_bluetooth_speaker.glb"

// const debounce = <F extends (...args: unknown[]) => void>(func: F, delay: number): ((...args: Parameters<F>) => void) => {
//   let timeoutId: NodeJS.Timeout
//   return (...args: Parameters<F>) => {
//     clearTimeout(timeoutId)
//     timeoutId = setTimeout(() => func(...args), delay)
//   }
// }

// interface ModelProps {
//   scale: number
// }

const Model: React.FC = () => {
  const { scene } = useGLTF(MODEL_PATH)
  useEffect(() => {
    scene.scale.set(100, 100, 100)
  }, [scene])
  return <group>
    <primitive object={scene} />
  </group>
}

interface HoverModelViewProps {
  id: string | number
}

const HoverModelView: React.FC<HoverModelViewProps> = ({ id }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  // const [scale, setScale] = useState<number>(1)

  useEffect(() => {
    // const updateScale = () => {
    //   if (containerRef.current) {
    //     const { width } = containerRef.current.getBoundingClientRect()
    //     const w = 300
    //     const minDimension = Math.min(width, w)
    //     setScale(minDimension * .8)
    //   }
    // }

    // updateScale()
    // const handleResize = debounce(updateScale, 100)
    // window.addEventListener("resize", handleResize)

    // return () => window.removeEventListener("resize", handleResize)
  }, [id])
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <div
      ref={containerRef}
      className="h-full w-full cursor-grab"
      onClick={handleClick}
      role="presentation"
    >
      <Suspense fallback={
        <div className="h-full w-full flex justify-center items-center bg-gray-100">
          <Loader2 className="w-8 h-8 animate-spin text-primary" aria-label="Loading 3D model" />
        </div>
      }>
        <Canvas
          className="h-full w-full bg-gray-100 rounded-sm"
          camera={{ position: [3, 5, 1], fov: 50 }}
        // onCreated={({ gl }) => {
        //   gl.setClearColor('#f3f4f6') 
        // }}
        >
          <Model />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <OrbitControls
            autoRotate
            enableZoom={false}
            autoRotateSpeed={2}
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 6}
          />
          <Environment preset="studio" />
          {/* {error && (
            <Html center>
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            </Html>
          )} */}
        </Canvas>
      </Suspense>
    </div>
  )
}

export default React.memo(HoverModelView)