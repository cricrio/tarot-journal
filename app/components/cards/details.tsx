import data from '~/data/tarot-images.en.json';

export function CardDetails({ id }: { id: string }) {
  const card = data.find((card) => card.img.includes(id));
  if (!card) return null;
  return (
    <div className='bg-yellow-50 rounded w-2xs text-black px-4 py-2 overflow-auto'>
      <div>
        <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight '>
          {card.name}
        </h1>
        <p className='mb-2'>{card.arcana}</p>
        <h2 className='scroll-m-20 text-xl font-semibold tracking-tight mb-1'>
          Significations
        </h2>
        <ul className='list-disc list-inside mb-2'>
          {card.meanings.light.map((item) => (
            <li key={item} className='text-sm text-gray-700'>
              {item}
            </li>
          ))}
        </ul>
        <h2 className='scroll-m-20 text-xl font-semibold tracking-tight mb-1'>
          Mots clés
        </h2>
        <ul className='list-disc list-inside mb-2'>
          {card.keywords.map((item) => (
            <li key={item} className='text-sm text-gray-700'>
              {item}
            </li>
          ))}
        </ul>
        <h2 className='scroll-m-20 text-xl font-semibold tracking-tight mb-2'>
          Voyance
        </h2>
        <ul className='list-disc list-inside mb-4'>
          {card.fortune_telling.map((fortune) => (
            <li key={fortune} className='text-sm text-gray-700'>
              {fortune}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
