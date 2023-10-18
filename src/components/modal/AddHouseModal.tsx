'use client';
import { useState } from 'react';
import { AddIcon } from '../icons';
import ModalWrapper from './ModalWrapper';

const AddHouseModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <AddIcon className='h-8 w-8 hover:scale-110 hover:brightness-95' />
      </button>

      {open && (
        <ModalWrapper setOpen={setOpen}>
          <div>
            <h2>hello</h2>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default AddHouseModal;
