'use client';
import { useState } from 'react';
import HouseList from './HouseList';

const HouseInformation = () => {
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);

  console.log(selectedHouse);

  const handleSelectHouse = (id: string) => {
    setSelectedHouse(id);
  };

  return (
    <>
      <div>
        <HouseList
          selectedHouse={selectedHouse}
          handleSelectHouse={handleSelectHouse}
        />
      </div>
    </>
  );
};

export default HouseInformation;
