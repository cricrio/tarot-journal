import type { Route } from './+types/edit';

import { Link, useParams } from 'react-router';

import { CardCanvas } from '~/components/cards/canvas';
import { CardDetails } from '~/components/cards/details';

import { useEffect, useRef, useState } from 'react';
import { Drawer, DrawerContent } from '~/components/ui/drawer';
import { getEntry } from '~/database/db';
import CardList from '~/components/cards/list';
import { Button } from '~/components/ui/button';
import { encrypt } from '~/lib/share';

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
      <Link to={`/share/?enc=${encrypt(spread)}`} target='_blank'>
        Partager
      </Link>
      <CardCanvas ids={cardIds} />
      <section className='max-w-3xl mx-auto'>
        <h2 className='text-white text-lg mb-2'>Liste des cartes</h2>
        <CardList cardIds={cardIds} />
      </section>
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
