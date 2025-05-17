import {
  CameraControls,
  Environment,
  MapControls,
  OrbitControls,
  PresentationControls,
} from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useRef, type ReactElement } from 'react';
import { Vector3 } from 'three';

export function CardCanvas({
  cards,
  target,
}: {
  cards: ReactElement;
  target?: [x: number, y: number, z: number];
}) {
  console.log(target);
  const cameraControlsRef = useRef<CameraControls>(null);
  const targetRef = useRef();
  useEffect(() => {
    if (target && cameraControlsRef.current) {
      if (target) {
        cameraControlsRef.current.setLookAt(
          target[0],
          target[1],
          1,
          target[0],
          target[1],
          0,
          true
        );
        console.log(
          'Setting target:',
          cameraControlsRef.current?.getTarget(new Vector3())
        );
        console.log(
          'position:',
          cameraControlsRef.current?.getPosition(new Vector3())
        );
      }
    }
  }, [target]);

  return (
    <Canvas>
      <CameraControls
        ref={cameraControlsRef}
        dollySpeed={0}
        azimuthRotateSpeed={0}
        polarRotateSpeed={0}
      />
      {cards}
    </Canvas>
  );
}
