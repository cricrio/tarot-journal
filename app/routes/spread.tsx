import type { Route } from './+types/spread';

import { Form, Link, useParams } from 'react-router';

import { CardCanvas } from '~/components/cards/canvas';

import { CardList } from '~/components/cards/list';
import { Button } from '~/components/ui/button';
import { encrypt } from '~/lib/share';
import { titleEnv } from '~/lib/utils';
import { Tabs, TabsContent, TabsList } from '@radix-ui/react-tabs';
import { TabsTrigger } from '~/components/layout/tab-trigger';
import { getSpread, type Spread } from '~/database/spread';
import { addNote, getNotes } from '~/database/note';
import { Textarea } from '~/components/ui/textarea';
import clsx from 'clsx';

export function meta({}: Route.MetaArgs) {
  return [
    { title: titleEnv('Mon journal de tarot') },
    { name: 'description', content: 'Garde trace de trace de tes tirages' },
  ];
}

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const { id } = params;
  const formData = await request.formData();
  const content = formData.get('content') as string;
  console.log('Adding note:', content, 'to spread ID:', id);
  await addNote({
    content: content.trim(),
    spreadId: Number(id),
  });

  return { success: true, timestamp: new Date().toISOString() };
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { id } = params;
  if (!id) {
    throw new Error('No spread ID provided.');
  }

  const [spread, notes] = await Promise.all([
    getSpread(Number(id)),
    getNotes(Number(id)),
  ]);

  return { spread, notes };
}

export default function Spread({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { spread, notes } = loaderData;

  const cardIds = spread.cards;
  console.log(actionData);
  return (
    <div className='h-full  p-4 gap-8'>
      <div className='flex justify-center gap-4 items-center'>
        <h1 className='text-white text-2xl'>
          {spread.name || 'Untitled Spread'}
        </h1>
        <Button asChild>
          <Link
            to={`/share/?enc=${encrypt({ spread, notes })}`}
            target='_blank'
          >
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
            <Form method='post' className='flex flex-col gap-4'>
              <Textarea
                key={actionData?.timestamp || 'textarea-notes'}
                rows={6}
                placeholder='Écrivez vos notes ici...'
                name='content'
              />
              <Button className='self-end px-4 py-2  transition' type='submit'>
                Enregistrer
              </Button>
            </Form>
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <div
                  className={clsx('border-b border-gray-200 py-2', {
                    'border-b border-gray-200': index < notes.length - 1,
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
