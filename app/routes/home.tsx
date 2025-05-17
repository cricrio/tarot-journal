import type { Route } from './+types/home';

import { getEntries } from '~/database/db';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { LucideCross, LucidePlus } from 'lucide-react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Spread() {
  const [spreads, setSpreads] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const spreads = await getEntries();
        console.log('Fetched spread:', spreads);
        setSpreads(spreads);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <div className='w-full h-screen bg-indigo-900 flex p-4 gap-8'>
        <h1 className='text-red-500'>Error: {error}</h1>
      </div>
    );
  }

  if (!spreads) {
    return (
      <div className='w-full h-screen bg-indigo-900 flex p-4 gap-8'>
        Loading...
      </div>
    );
  }

  return (
    <div className='relative'>
      <div className='flex flex-col justify-center items-center gap-4 p-4'>
        {spreads.map((spread) => (
          <div
            key={spread.id}
            className='text-yellow-50 rounded min-w-xs max-w-xl p-4 border border-yellow-200 flex-1'
          >
            <Link to={`/spread/${spread.id}`}>
              <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight '>
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
