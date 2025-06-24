import React from 'react';

import { getCardDetails, getCardImage } from '~/lib/data';

type CardListProps = {
  cardIds: string[];
};

export const CardList: React.FC<CardListProps> = ({ cardIds }) => (
  <div>
    {cardIds.map((cardId) => {
      const cardDetails = getCardDetails(cardId);

      return (
        <div
          key={cardId}
          className='flex items-center py-3 border-b border-gray-200'
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
        </div>
      );
    })}
  </div>
);

export default CardList;
