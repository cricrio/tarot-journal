import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
  use,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactElement,
} from 'react';
import { Vector3 } from 'three';
import { getRows } from './canvas-list';

export function CardCanvas({
  cards,
  target,
  ids,
}: {
  cards: ReactElement;
  target?: [x: number, y: number, z: number];
  ids: string[];
}) {
  console.log(target);
  const cameraControlsRef = useRef<CameraControls>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rows = getRows(ids);
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

  useEffect(() => {
    console.log({ width: canvasRef.current?.width });
  }, [canvasRef.current]);

  console.log('Canvas width:', document.body.clientWidth);

  return (
    <Canvas
      ref={canvasRef}
      style={{
        height: Math.max(200 * rows.length, document.body.clientHeight * 0.5),
      }}
    >
      {cards}
    </Canvas>
  );
}
