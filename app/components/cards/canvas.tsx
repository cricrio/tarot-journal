import { CameraControls } from '@react-three/drei';
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

  return <Canvas>{cards}</Canvas>;
}
