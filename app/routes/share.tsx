import type { Route } from './+types/share';

import { getEntries } from '~/database/db';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Button } from '~/components/ui/button';
import { LucideCross, LucidePlus } from 'lucide-react';
import { decrypt } from '~/lib/share';
import { CardCanvas } from '~/components/cards/canvas';
import CardList from '~/components/cards/list';

export default function Share() {
  const [searchParams] = useSearchParams();
  const enc = searchParams.get('enc');

  if (!enc) {
    return (
      <div className='w-full h-screen bg-indigo-900 flex p-4 gap-8'>
        <h1 className='text-white'>Aucun code de partage fourni.</h1>
      </div>
    );
  }
  const spread = decrypt(enc);
  console.log('Decrypted spread:', spread);
  return (
    <div className='h-full  p-4 gap-8'>
      <h1 className='text-white text-2xl mb-4 text-center'>
        {spread.name || 'Untitled Spread'}
      </h1>
      <CardCanvas ids={spread.cards} />
      <section className='max-w-3xl mx-auto'>
        <h2 className='text-white text-lg mb-2'>Liste des cartes</h2>
        <CardList cardIds={spread.cards} />
      </section>
    </div>
  );
}
