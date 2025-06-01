import { useThree, type Viewport } from '@react-three/fiber';
import { Card } from './card';
import type { ReactElement } from 'react';
import { ratios } from '~/config';

const margin = 0.1;
const numberOfCardsperRow = 3;
const maxWidth = 1.5;

type Dimensions = {
  width: number;
  height: number;
};

function getDimensions(
  numberPerRow: number,
  numberPerColumn: number,
  viewport: Viewport
): Dimensions {
  const rowScale = viewport.width / (numberPerRow * (ratios.x + margin));
  const columnScale =
    (viewport.height * 0.9) / (numberPerColumn * (ratios.y + margin));

  const minScale = Math.min(rowScale, columnScale);
  const width = Math.min(minScale * ratios.x, maxWidth);
  const height = (width * ratios.y) / ratios.x;

  return {
    width,
    height,
  };
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

function getPosition(index: number, distance: number, count: number) {
  return index * (distance + margin) - ((count - 1) * (distance + margin)) / 2;
}

export function Grid({
  ids,
  renderRow,
}: {
  ids: string[];
  renderRow: (
    rows: { ids: string[]; y: number }[],
    dimensions: Dimensions
  ) => ReactElement[];
}) {
  const { viewport } = useThree();

  if (ids.length <= numberOfCardsperRow) {
    const dimensions = getDimensions(3, 1, viewport);
    return renderRow([{ ids, y: 0 }], dimensions);
  }

  if (ids.length == 5) {
    const dimensions = getDimensions(3, 3, viewport);
    const rows = [[ids[0], ids[1]], [ids[2]], [ids[3], ids[4]]];
    return renderRow(
      rows.map((r, index) => ({
        ids: r,
        y: getPosition(index, dimensions.height, rows.length),
      })),
      dimensions
    );
  }

  const rows = getRows(ids, numberOfCardsperRow);
  const dimensions = getDimensions(3, rows.length, viewport);

  return renderRow(
    rows.map((r, index) => ({
      ids: r,
      y: getPosition(index, dimensions.height, rows.length),
    })),
    dimensions
  );
}

export function Row({
  items,
  renderItem,
  y = 0,
  dimensions,
}: {
  items: string[];
  y: number;
  dimensions: { width: number; height: number };
  renderItem: (item: { id: string; x: number; y: number }) => ReactElement;
}) {
  const cards = Array.from({ length: items.length }, (_, i) => ({
    x: getPosition(i, dimensions.width, items.length),
  }));

  return items.map((id, i) => renderItem({ id, ...cards[i], y }));
}
