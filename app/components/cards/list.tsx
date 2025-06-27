import clsx from 'clsx';
import { ExternalLinkIcon } from 'lucide-react';
import React from 'react';

import { getCardDetails, getCardImage } from '~/lib/data';

type CardListProps = {
  cardIds: string[];
};

export const CardList: React.FC<CardListProps> = ({ cardIds }) => (
  <div>
    {cardIds.map((cardId, index) => {
      const cardDetails = getCardDetails(cardId);

      return (
        <div
          key={cardId}
          className={clsx('flex items-center py-3 ', {
            'border-b ': index < cardIds.length - 1,
          })}
        >
          <img
            src={getCardImage(cardId)}
            alt={cardId}
            className='w-14 h-20 object-cover rounded mr-4 bg-gray-100'
          />
          <div>
            <div className='font-semibold text-lg'>{cardDetails?.name}</div>
            <div className=' text-sm'>{cardDetails?.keywords?.join(' - ')}</div>
          </div>
          {cardDetails?.sources && (
            <a
              href={cardDetails?.sources?.['vivre-intuitif']}
              target='_blank'
              rel='noopener noreferrer'
            >
              <ExternalLinkIcon
                className='ml-auto text-gray-500 hover:text-gray-700 cursor-pointer'
                onClick={() => {
                  window.open(
                    cardDetails?.sources?.['vivre-intuitif'],
                    '_blank'
                  );
                }}
              />
            </a>
          )}
        </div>
      );
    })}
  </div>
);

export default CardList;
