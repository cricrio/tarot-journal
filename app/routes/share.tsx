import type { Route } from './+types/share';

import { getEntries } from '~/database/db';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Button } from '~/components/ui/button';
import { LucideCross, LucidePlus } from 'lucide-react';
import { decrypt } from '~/lib/share';
import { CardCanvas } from '~/components/cards/canvas';
import { CardList } from '~/components/cards/list';
import { titleEnv } from '~/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import type { Spread } from '~/database/spread';
import { NotesEditor } from '~/components/notes/editor';

export function meta({}: Route.MetaArgs) {
  return [
    { title: titleEnv('Mon journal de tarot') },
    { name: 'description', content: 'Garde trace de trace de tes tirages' },
  ];
}

export function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const enc = url.searchParams.get('enc');
  if (!enc) {
    throw 'No share code provided.';
  }

  const spread = decrypt(enc) as Spread;
  return { spread };
}

export default function Share({ loaderData }: Route.ComponentProps) {
  const { spread } = loaderData;
  return (
    <div className='h-full p-4 gap-8'>
      <h1 className='text-white text-2xl text-center'>
        {spread.name || 'Untitled Spread'}
      </h1>
      <CardCanvas ids={spread.cards} />
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
