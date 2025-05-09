import React from 'react';
import type { Route } from './+types/home';

import { useSearchParams } from 'react-router';

import { CardList } from '~/components/cards/list';
import { CardCanvas } from '~/components/cards/canvas';
import { CardDetails } from '~/components/cards/details';
import { AddCard } from '~/components/cards/add-cards';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cards = searchParams.get('cards')?.split('-') || [];

  const [selectedCard, setSelectedCard] = React.useState<string | null>(null);
  const onHover = (id: string) => setSelectedCard(id);

  const onAddCard = (id: string) =>
    setSearchParams((prev) => {
      const newCards = `${prev.get('cards')}-${id}`;
      return { ...prev, cards: newCards };
    });

  return (
    <div className='w-full h-screen bg-indigo-900 flex p-4 gap-8'>
      <CardCanvas cards={<CardList cards={cards} onCardClick={onHover} />} />
      <div className='flex flex-col gap-4'>
        <AddCard cardIds={cards} onAddCard={onAddCard} />
        {selectedCard && <CardDetails id={selectedCard} />}
      </div>
    </div>
  );
}
