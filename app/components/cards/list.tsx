import { useThree } from '@react-three/fiber';
import { Card } from './card';

const width = 1.75;
const margin = 0.1;

function center(count: number, viewportWidth: number) {
  const scale = Math.min(viewportWidth / (count * (width + margin)), 1);
  const cardWidth = width * scale;
  const totalWidth = count * cardWidth + (count - 1) * margin * scale;
  const start = -totalWidth / 2 + cardWidth / 2;
  return Array.from({ length: count }, (_, i) => {
    return { x: start + i * (cardWidth + margin * scale), scale };
  });
}

export function CardList({
  cards,
  onCardHover,
  onCardClick,
}: {
  cards: string[];
  onCardHover?: (id: string) => void;
  onCardClick?: (id: string) => void;
}) {
  const { viewport } = useThree();

  const items = center(cards.length, viewport.width);

  return cards.map((id, index) => (
    <Card
      id={id}
      position={[items[index].x, 0, 0]}
      // rotation={Math.PI / 4}
      scale={items[index].scale}
      onClick={onCardClick}
      onHover={onCardHover}
    ></Card>
  ));
}
