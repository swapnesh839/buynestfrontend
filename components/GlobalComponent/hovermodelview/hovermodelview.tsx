"use client"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import React, { Suspense, useEffect, useRef } from "react"

const Hovermodelview = ({ id }: { id: string | number }) => {
    const productref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (productref.current) {
            const width = productref.current.clientWidth
            console.log(id, width);
        }
    }, [productref, id])
    return (
        <div className="h-full w-full justify-center align-middle cursor-grab z-50 " ref={productref}>
            <Suspense fallback={<div className="h-full w-full flex justify-center align-middle">loading</div>}>
                <Canvas
                    className="h-full w-full bg-gray-600/5 rounded-sm"
                    camera={{ position: [2, 2, 3] }}
                >
                    <mesh>
                        <meshStandardMaterial color={"red"} />
                        <boxGeometry args={[1, 1, 1]} />
                    </mesh>
                    <ambientLight intensity={1} />
                    <OrbitControls autoRotate={true} autoRotateSpeed={0.2} minDistance={2} maxDistance={10} maxPolarAngle={Math.PI / 2.4} minPolarAngle={Math.PI / 9} />
                </Canvas>
            </Suspense>
        </div>
    )
}

export default React.memo(Hovermodelview)