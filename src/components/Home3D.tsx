// import { Canvas } from '@react-three/fiber';
// import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
// import { Suspense } from 'react';

// function Model() {
//   const { scene } = useGLTF('/fish.glb'); // 确认你的文件名
//   return <primitive object={scene} scale={1.2} />; 
// }

// export default function Home3D() {
//   return (
//     <div className="h-full w-full bg-transparent">
//       <Suspense fallback={null}>
//         <Canvas camera={{ position: [0, 0, 5], fov: 45 }} alpha={true}>
//           <PresentationControls global config={{ mass: 1, tension: 500 }} speed={2} rotation={[0, -0.4, 0]} polar={[-Math.PI / 4, Math.PI / 4]}>
//             <Stage environment="city" intensity={0.5} contactShadow={false}>
//               <Model />
//             </Stage>
//           </PresentationControls>
//         </Canvas>
//       </Suspense>
//     </div>
//   );
// }

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage } from '@react-three/drei';
import * as THREE from 'three';

function Model() {
  // 1. 加载你同学给的新模型 SHOU.glb
  const { scene } = useGLTF('/SHOU.glb');
  
  // 2. 创建一个“钩子”，用来抓住这个模型
  const modelRef = useRef<THREE.Group>(null);

  // 3. 核心动画：让模型每帧绕 Y 轴旋转一点点
  useFrame((state, delta) => {
    if (modelRef.current) {
      // 0.5 是旋转速度，你可以改成 0.2 慢一点，或者 1.0 快一点
      modelRef.current.rotation.y += delta * 0.5; 
    }
  });

  // 返回模型，并把钩子挂上去
  return <primitive ref={modelRef} object={scene} scale={1.5} />;
}

export default function Home3D() {
  return (
    <div className="h-full w-full bg-transparent">
      <Suspense fallback={null}>
        {/* 注意：这里我们删掉了 OrbitControls 和 PresentationControls，所以鼠标点不动它了 */}
        <Canvas camera={{ position: [0, 0, 5], fov: 40 }} alpha={true}>
          {/* 加强光照，让新模型看起来质感更好 */}
          <ambientLight intensity={1.0} /> 
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          
          <Stage environment="city" intensity={1.0} contactShadow={false}>
            <Model />
          </Stage>
        </Canvas>
      </Suspense>
    </div>
  );
}