import { Image } from '@react-three/drei';

export const Card = ({
  position,
  rotation,
  scale = 1,
  id,
  onHover,
  onClick,
}: {
  position: [x: number, y: number, z: number];
  rotation?: number;
  scale?: number;
  id: string;
  onHover?: (id: string) => void;
  onClick?: (id: string) => void;
}) => (
  <Image
    position={position}
    url={`/cards/${id}.jpg`}
    scale={[1.75 * scale, 3 * scale]}
    {...(rotation ? { rotation: [0, 0, rotation] } : {})}
    onPointerOver={() => onHover?.(id)}
    onClick={() => onClick?.(id)}
  ></Image>
);
