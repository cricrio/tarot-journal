import { Image } from '@react-three/drei';
import { ratios } from '~/config';

export const Card = ({
  position,
  rotation,
  dimensions,
  scale = 1,
  id,
  onHover,
  onDoubleClick,
}: {
  dimensions: { width: number; height: number };
  position: [x: number, y: number, z: number];
  rotation?: number;
  scale?: number;
  id: string;
  onHover?: (id: string) => void;
  onDoubleClick?: (id: string) => void;
}) => (
  <Image
    position={position}
    url={`/cards/${id}.jpg`}
    scale={[dimensions.width, dimensions.height]}
    {...(rotation ? { rotation: [0, 0, rotation] } : {})}
    onPointerOver={() => onHover?.(id)}
    onDoubleClick={() => onDoubleClick?.(id)}
  ></Image>
);
