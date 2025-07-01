import { useThree, type Viewport } from '@react-three/fiber';
import type { ReactElement } from 'react';
import { ratios } from '~/config';

const margin = 0.1;
const numberOfCardsperRow = 3;

type Dimensions = {
  width: number;
  height: number;
};

export function getDimensions(
  numberPerRow: number,
  numberPerColumn: number,
  viewport: Viewport
): Dimensions {
  const columnScale = viewport.height / (numberPerColumn * (1 + margin));
  const width = columnScale / ratios.y;

  if ((width + margin) * numberPerRow < viewport.width) {
    // If the width of the cards fits in the viewport, use that
    return {
      width: width,
      height: columnScale,
    };
  }

  const rowScale = viewport.width / (numberPerRow * (1 + margin));
  if (rowScale < columnScale) {
    return {
      width: rowScale,
      height: rowScale * ratios.y,
    };
  }

  return {
    width: columnScale / ratios.y,
    height: columnScale,
  };
}

export function getRows(ids: string[]): string[][] {
  if (ids.length <= numberOfCardsperRow) {
    return [ids];
  }

  if (ids.length == 5) {
    return [[ids[3], ids[4]], [ids[2]], [ids[0], ids[1]]];
  }

  return ids.reduce((acc: string[][], id, i) => {
    if (i % numberOfCardsperRow === 0) {
      acc = [[id], ...acc];
    } else {
      acc[0].push(id);
    }
    return acc;
  }, []);
}

export function getPosition(index: number, distance: number, count: number) {
  return index * (distance + margin) - ((count - 1) * (distance + margin)) / 2;
}

export function Grid({
  rows,
  render,
}: {
  rows: string[][];
  render: (
    rows: { ids: string[]; y: number }[],
    dimensions: Dimensions
  ) => ReactElement[];
}) {
  const { viewport } = useThree();

  const dimensions = getDimensions(3, rows.length, viewport);

  return render(
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
