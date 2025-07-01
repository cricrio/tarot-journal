import {
  addEntry,
  getEntries,
  getEntry,
  type Node,
  type StoreName,
} from './db';

const STORE_NAME: StoreName = 'speads';

type SpreadInput = {
  name: string;
  description?: string;
  cards: string[];
  notes: string[];
};

export type Spread = Node & SpreadInput;

export function addSpread(spread: SpreadInput) {
  return addEntry<SpreadInput>(STORE_NAME, { ...spread, notes: [] });
}

export function getSpread(spreadId: Spread['id']): Promise<Spread> {
  return getEntry<Spread>(STORE_NAME, spreadId);
}

export async function getAllSpreads(): Promise<Spread[]> {
  return getEntries<Spread>(STORE_NAME);
}
