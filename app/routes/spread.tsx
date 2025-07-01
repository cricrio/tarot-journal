import type { Route } from './+types/spread';

import { Link, useParams } from 'react-router';

import { CardCanvas } from '~/components/cards/canvas';

import { useEffect, useState } from 'react';
import { CardList } from '~/components/cards/list';
import { Button } from '~/components/ui/button';
import { encrypt } from '~/lib/share';
import { titleEnv } from '~/lib/utils';
import { Tabs, TabsContent, TabsList } from '@radix-ui/react-tabs';
import { TabsTrigger } from '~/components/layout/tab-trigger';
import { NotesEditor } from '~/components/notes/editor';
import { getSpread, type Spread } from '~/database/spread';

export function meta({}: Route.MetaArgs) {
  return [
    { title: titleEnv('Mon journal de tarot') },
    { name: 'description', content: 'Garde trace de trace de tes tirages' },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { id } = params;
  if (!id) {
    throw new Error('No spread ID provided.');
  }
  const spread = await getSpread(Number(id));
  return { spread };
}

export default function Spread({ loaderData }: Route.ComponentProps) {
  const { spread } = loaderData;

  const cardIds = spread.cards;

  return (
    <div className='h-full  p-4 gap-8'>
      <div className='flex justify-center gap-4 items-center'>
        <h1 className='text-white text-2xl'>
          {spread.name || 'Untitled Spread'}
        </h1>
        <Button asChild>
          <Link to={`/share/?enc=${encrypt(spread)}`} target='_blank'>
            Partager
          </Link>
        </Button>
      </div>
      <CardCanvas ids={cardIds} />
      <section className='max-w-3xl mx-auto'>
        <Tabs defaultValue='cards'>
          <TabsList className='flex justify-center gap-3 mb-4'>
            <TabsTrigger value='cards'>Cartes</TabsTrigger>
            <TabsTrigger value='notes'>Notes</TabsTrigger>
          </TabsList>
          <TabsContent value='cards'>
            <CardList cardIds={spread.cards} />
          </TabsContent>
          <TabsContent value='notes'>
            <NotesEditor spreadId={spread.id} />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
