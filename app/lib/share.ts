import lzString from 'lz-string';
import type { Note } from '~/database/note';
import type { Spread } from '~/database/spread';

export const encrypt = ({
  spread,
  notes,
}: {
  spread: Spread;
  notes: Note[];
}): string => {
  return lzString.compressToEncodedURIComponent(
    JSON.stringify({ spread, notes })
  );
};

export const decrypt = (
  encryptedText: string
): { spread: Spread; notes: Note[] } => {
  return JSON.parse(
    lzString.decompressFromEncodedURIComponent(encryptedText) || '{}'
  );
};
