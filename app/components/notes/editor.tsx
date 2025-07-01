import React, { useRef } from 'react';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

export const NotesEditor: React.FC<{ spreadId: number }> = ({ spreadId }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleButtonClick = () => {
    if (textareaRef.current) {
      alert(textareaRef.current.value);
    }
  };

  return (
    <div className='flex flex-col gap-4 p-4 '>
      <Textarea
        ref={textareaRef}
        rows={6}
        placeholder='Écrivez vos notes ici...'
      />
      <Button
        onClick={handleButtonClick}
        className='self-end px-4 py-2  transition'
        type='button'
      >
        Enregistrer
      </Button>
    </div>
  );
};
