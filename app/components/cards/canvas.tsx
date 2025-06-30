import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { getRows, Grid, Row } from './canvas-list';
import { Card } from './card';

export function CardCanvas({
  target,
  ids,
}: {
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


  return (
    <Canvas
      ref={canvasRef}
      style={{
        height: Math.max(200 * rows.length, document.body.clientHeight * 0.5),
      }}
    >
      <Grid
        rows={rows}
        render={(rows, dimensions) =>
          rows.map(({ ids, y }) => (
            <Row
              y={y}
              items={ids}
              dimensions={dimensions}
              renderItem={({ x, id }) => (
                <Card position={[x, y, 0]} id={id} dimensions={dimensions} />
              )}
            />
          ))
        }
      />
    </Canvas>
  );
}
