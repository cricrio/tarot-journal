import data from '~/data/tarot-images.fr.json';

export function getCardImage(id: string) {
  return `/cards/${id}.jpg`;
}

export function getCardDetails(id: string) {
  return data.find((card) => card.img.includes(id));
}
