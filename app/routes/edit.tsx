import type { Route } from './+types/edit';

import { useNavigate, useSearchParams } from 'react-router';

import { Grid, Row } from '~/components/cards/canvas-list';
import { CardCanvas } from '~/components/cards/canvas';
import { AddCard } from '~/components/cards/add-cards';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { addEntry } from '~/database/db';
import { useState } from 'react';
import { Card } from '~/components/cards/card';
import { addSpread } from '~/database/spread';

export default function Edit() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const cardIds = searchParams.get('cards')?.split('-') || [];
  const name = searchParams.get('name') || '';
  const [target, setTarget] = useState<string | null>(null);
  const setName = (name: string) =>
    setSearchParams((prev) => {
      prev.set('name', name);
      return prev;
    });

  const onTargetClick = (id: unknown) => {
    setTarget(id);
  };
  const onAddCard = (id: string) =>
    setSearchParams((prev) => {
      const prevCards = prev.get('cards');
      const newCards = prevCards ? `${prev.get('cards')}-${id}` : id;
      prev.set('cards', newCards);
      return prev;
    });

  const onSave = async () => {
    try {
      const spreadId = await addSpread({ cards: cardIds, name });

      console.log('Entry saved:', spreadId, `/spread/${spreadId}`);
      navigate(`/spread/${spreadId}`);
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };
  return (
    <div className='w-full h-screen bg-indigo-900 flex p-4 gap-8'>
      <div className='flex justify-center'>
        <Input
          className='text-white'
          defaultValue={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <CardCanvas ids={cardIds} />
      <div className='flex flex-col justify-center gap-4'>
        <AddCard cardIds={cardIds} onAddCard={onAddCard} />
        <Button className='w-full mt-4' onClick={onSave}>
          Enregistrer
        </Button>
      </div>
    </div>
  );
}
