import lzString from 'lz-string';

export const encrypt = (spread: { cards: string[]; name: string }): string => {
  return lzString.compressToEncodedURIComponent(JSON.stringify(spread));
};

export const decrypt = (encryptedText: string): string => {
  return JSON.parse(
    lzString.decompressFromEncodedURIComponent(encryptedText) || '{}'
  );
};
