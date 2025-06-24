import data from '~/data/tarot-images.en.json';

export function getCardImage(id: string) {
  return `/cards/${id}.jpg`;
}

export function getCardDetails(id: string) {
  return data.find((card) => card.img.includes(id));
}
