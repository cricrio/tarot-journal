import type { Route } from './+types/share';
import { decrypt } from '~/lib/share';
import { CardCanvas } from '~/components/cards/canvas';
import { CardList } from '~/components/cards/list';
import { titleEnv } from '~/lib/utils';
import { Tabs, TabsContent, TabsList } from '@radix-ui/react-tabs';
import type { Spread } from '~/database/spread';
import { TabsTrigger } from '~/components/layout/tab-trigger';
import type { Note } from '~/database/note';
import clsx from 'clsx';

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

  const { spread, notes } = decrypt(enc);
  return { spread, notes: notes || [] };
}

export default function Share({ loaderData }: Route.ComponentProps) {
  const { spread, notes } = loaderData;
  return (
    <div className='h-full p-4 gap-8'>
      <h1 className='text-white text-2xl text-center'>
        {spread.name || 'Untitled Spread'}
      </h1>
      <CardCanvas ids={spread.cards} />
      <section className='max-w-3xl mx-auto'>
        <Tabs defaultValue={notes?.length ? 'notes' : 'cards'}>
          <TabsList className='flex justify-center gap-3 mb-4'>
            <TabsTrigger value='cards'>Cartes</TabsTrigger>
            <TabsTrigger value='notes'>Notes</TabsTrigger>
          </TabsList>
          <TabsContent value='cards'>
            <CardList cardIds={spread.cards} />
          </TabsContent>
          <TabsContent value='notes'>
            {notes?.length > 0 ? (
              notes?.map((note, index) => (
                <div
                  className={clsx('border-b border-gray-200 py-2', {
                    'border-b border-gray-200': index < notes?.length - 1,
                  })}
                  key={note.id}
                >
                  <time className='font-bold mr-1'>
                    {note.createdAt.toLocaleString('fr-FR', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </time>
                  {note.content}
                </div>
              ))
            ) : (
              <div className='text-gray-500'>Aucune note pour ce tirage.</div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
