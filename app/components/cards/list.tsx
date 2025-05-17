import { useThree } from '@react-three/fiber';
import { Card } from './card';
import type { ReactElement } from 'react';
import { ratios } from '~/config';

const width = 1.75;
const margin = 0.1;
const numberOfCardsperRow = 3;

function center(count: number, viewportWidth: number) {
  const scale = viewportWidth / (count * (width + margin));
  const cardWidth = width * scale;
  const totalWidth = count * cardWidth + (count - 1) * margin * scale;
  const start = -totalWidth / 2 + cardWidth / 2;
  return Array.from({ length: count }, (_, i) => {
    return { x: start + i * (cardWidth + margin * scale), scale };
  });
}

function getScale(count: number, viewportWidth: number) {
  const scale = viewportWidth / (count * (width + margin));
  return scale;
}

function getRows(ids: string[], count: number): string[][] {
  return ids.reduce((acc: string[][], id, i) => {
    if (i % count === 0) {
      acc = [[id], ...acc];
    } else {
      acc[0].push(id);
    }
    return acc;
  }, []);
}

//TODO: Don't why it's working, need to rework scales
function getY(index: number, count: number) {
  return index * ratios.x - ((count - 1) * ratios.x) / 2;
}

export function Grid({
  ids,
  renderRow,
}: {
  ids: string[];
  renderRow: (
    rows: { ids: string[]; y: number }[],
    scale: number
  ) => ReactElement;
}) {
  const { viewport } = useThree();
  const scale = getScale(3, viewport.width);

  if (ids.length <= numberOfCardsperRow) {
    return renderRow([{ ids, y: 0 }], scale);
  }
  const rows = getRows(ids, numberOfCardsperRow);
  console.log('rows', rows);
  return renderRow(
    rows.map((r, index) => ({ ids: r, y: getY(index, rows.length) })),
    scale
  );
}

export function Row({
  items,
  renderItem,
  y = 0,
}: {
  items: string[];
  y: number;
  renderItem: (item: {
    id: string;
    x: number;
    y: number;
    scale: number;
  }) => ReactElement;
}) {
  const { viewport } = useThree();
  const cards = center(items.length, viewport.width);
  return items.map((id, i) => renderItem({ id, ...cards[i], y }));
}
