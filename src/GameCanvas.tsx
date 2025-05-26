import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

type GameCanvasProps = {
  title?: string;
};

export function GameCanvas({ title }: GameCanvasProps) {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {title && (
        <h1
          style={{
            position: 'absolute',
            top: '5vh',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '3vw',
            textShadow: '0 2px 8px #000',
            margin: 0,
            textAlign: 'center',
            fontWeight: 'bold',
            letterSpacing: '0.1em',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          {title}
        </h1>
      )}
      <Canvas style={{ width: '100vw', height: '100vh', display: 'block' }}>
        <color attach="background" args={['#0a2233']} />
        <RotatingBox />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </div>
  );
}

// Composant Box animé
function RotatingBox() {
  const ref = useRef<any>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });
  return (
    <Box ref={ref} position={[0, 0, 0]}>
      <meshStandardMaterial color="#0077ff" />
    </Box>
  );
}
