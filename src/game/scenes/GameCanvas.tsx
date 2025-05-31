import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

type GameCanvasProps = {
  title?: string;
};

export function GameCanvas({ title }: GameCanvasProps) {
  const { t } = useTranslation();
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
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
