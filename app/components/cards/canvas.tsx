import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type { ReactElement } from 'react';

export function CardCanvas({ cards }: { cards: ReactElement }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <fog attach='fog' args={['lightpink', 60, 100]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, -5, 0]} color='red' intensity={2} />
      <Environment preset='warehouse' />
      {cards}
    </Canvas>
  );
}
