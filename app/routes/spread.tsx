import type { Route } from './+types/edit';

import { useNavigate, useParams, useSearchParams } from 'react-router';

import { CardList, Grid, Row } from '~/components/cards/list';
import { CardCanvas } from '~/components/cards/canvas';
import { CardDetails } from '~/components/cards/details';
import { AddCard } from '~/components/cards/add-cards';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { addEntry, getEntry } from '~/database/db';
import { useEffect, useState } from 'react';
import { Card } from '~/components/cards/card';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Spread() {
  const { id } = useParams();
  const [spread, setSpread] = useState();
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const onCardClick = (id: string) => setSelectedCard(id);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const spread = await getEntry(Number(id));
        console.log('Fetched spread:', spread);
        setSpread(spread);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  if (error) {
    return (
      <div className='w-full h-screen bg-indigo-900 flex p-4 gap-8'>
        <h1 className='text-red-500'>Error: {error}</h1>
      </div>
    );
  }

  if (!spread) {
    return (
      <div className='w-full h-screen bg-indigo-900 flex p-4 gap-8'>
        Loading...
      </div>
    );
  }

  const cardIds = spread.cards;

  return (
    <div className='h-full flex p-4 gap-8'>
      <CardCanvas
        cards={
          <Grid
            ids={cardIds}
            renderRow={(rows, y, scale) =>
              rows.map((ids) => (
                <Row
                  y={y}
                  items={ids}
                  renderItem={({ x, scale, id }) => (
                    <Card scale={scale} position={[x, 0, 0]} id={id} />
                  )}
                />
              ))
            }
          />
        }
      />

      {selectedCard && <CardDetails id={selectedCard} />}
    </div>
  );
}
