import type { Route } from './+types/edit';

import { useParams } from 'react-router';

import { Grid, Row } from '~/components/cards/canvas-list';
import { CardCanvas } from '~/components/cards/canvas';
import { CardDetails } from '~/components/cards/details';

import { useEffect, useRef, useState } from 'react';
import { Card } from '~/components/cards/card';
import { Drawer, DrawerContent } from '~/components/ui/drawer';
import { getEntry } from '~/database/db';
import CardList from '~/components/cards/list';

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
  const onCardDoubleClick = (id: string) => setSelectedCard(id);

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
    <div className='h-full  p-4 gap-8'>
      <h1 className='text-white text-2xl mb-4 text-center'>
        {spread.name || 'Untitled Spread'}
      </h1>
      <CardCanvas
        cards={
          <Grid
            ids={cardIds}
            renderRow={(rows, dimensions) =>
              rows.map(({ ids, y }) => (
                <Row
                  key={ids.join('-')}
                  y={y}
                  items={ids}
                  dimensions={dimensions}
                  renderItem={({ x, id }) => (
                    <Card
                      key={id}
                      position={[x, y, 0]}
                      id={id}
                      dimensions={dimensions}
                      onDoubleClick={() => onCardDoubleClick(id)}
                    />
                  )}
                />
              ))
            }
          />
        }
      />
      <h2 className='text-white text-lg mb-2'>Liste des cartes</h2>
      <CardList cardIds={cardIds} />
      {selectedCard && (
        <Drawer
          open={!!selectedCard}
          onOpenChange={() => setSelectedCard(null)}
        >
          <DrawerContent className='overflow-y-auto'>
            <CardDetails id={selectedCard} />
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
