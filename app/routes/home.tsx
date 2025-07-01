import type { Route } from './+types/home';

import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { LucidePlus } from 'lucide-react';
import { titleEnv } from '~/lib/utils';
import { getAllSpreads, type Spread } from '~/database/spread';

export function meta({}: Route.MetaArgs) {
  return [
    { title: titleEnv('Mon journal de tarot') },
    { name: 'description', content: 'Garde trace de trace de tes tirages' },
  ];
}

export async function clientLoader() {
  const spreads = await getAllSpreads();
  return { spreads };
}

export default function Spreads({ loaderData }: Route.ComponentProps) {
  const { spreads } = loaderData;
  return (
    <div className='relative'>
      <div className=' p-4'>
        {spreads.map((spread) => (
          <div
            key={spread.id}
            className='text-yellow-50 rounded mb-4 p-4 border max-w-xl border-yellow-50 mx-auto'
          >
            <Link to={`/spread/${spread.id}`}>
              <h1 className='scroll-m-20 text-2xl  font-semibold tracking-tight '>
                {spread.name}
              </h1>
            </Link>

            <p>{spread.createdAt.toUTCString()}</p>
          </div>
        ))}
      </div>
      <Button
        className='fixed bottom-8 right-8 w-16 h-16 rounded-full bg-red-400'
        asChild
      >
        <Link to='/edit'>
          <LucidePlus
            color='white'
            className='w-24 h-24'
            size={48}
            strokeWidth={3}
          />
        </Link>
      </Button>
    </div>
  );
}
