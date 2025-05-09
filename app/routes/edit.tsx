import React from 'react';
import type { Route } from './+types/edit';

import { useSearchParams } from 'react-router';

import { CardList } from '~/components/cards/list';
import { CardCanvas } from '~/components/cards/canvas';
import { CardDetails } from '~/components/cards/details';
import { AddCard } from '~/components/cards/add-cards';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Edit() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cardIds = searchParams.get('cards')?.split('-') || [];
  const name = searchParams.get('name') || '';

  const setName = (name: string) =>
    setSearchParams((prev) => {
      prev.set('name', name);
      return prev;
    });

  const onAddCard = (id: string) =>
    setSearchParams((prev) => {
      const newCards = `${prev.get('cards')}-${id}`;
      prev.set('cards', newCards);
      return prev;
    });

  return (
    <div className='w-full h-screen bg-indigo-900 flex p-4 gap-8'>
      <div className='flex justify-center'>
        <Input
          className='text-white'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <CardCanvas cards={<CardList cards={cardIds} />} />
      <div className='flex flex-col justify-center gap-4'>
        <AddCard cardIds={cardIds} onAddCard={onAddCard} />
      </div>
    </div>
  );
}
