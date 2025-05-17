import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import data from '~/data/tarot-images.en.json';
import { Button } from '../ui/button';

const suits = ['Trump', 'Cups', 'Pentacles', 'Swords', 'Wands'];

export function AddCard({
  cardIds,
  onAddCard,
}: {
  cardIds: string[];
  onAddCard: (id: string) => void;
}) {
  const [suit, setSuit] = useState<string | null>(null);
  const [card, setCard] = useState<string | null>(null);
  return (
    <div className='bg-yellow-50 rounded w-2xs text-black p-4 '>
      <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight '>
        Ajouter une carte
      </h1>
      <form
        className='flex flex-col gap-2'
        action={() => {
          if (!suit || !card) return;
          setCard(null);
          setSuit(null);
          onAddCard(card);
        }}
      >
        <Select onValueChange={setSuit}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Sélectionner une suite' />
          </SelectTrigger>
          <SelectContent>
            {suits.map((suit) => (
              <SelectItem key={suit} value={suit}>
                {suit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {suit && (
          <Select onValueChange={setCard}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Sélectionner une carte' />
            </SelectTrigger>
            <SelectContent>
              {data
                .filter(
                  (card) =>
                    !cardIds.some((id) => card.img.includes(id)) &&
                    card.suit === suit
                )
                .map((card) => (
                  <SelectItem key={card.img} value={card.img.split('.')[0]}>
                    {card.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )}
        <Button type='submit' className='w-full mt-4'>
          Ajouter
        </Button>
      </form>
    </div>
  );
}
