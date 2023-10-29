'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useContext } from 'react';
import { RoomsContext } from '@/components/molecules/Rooms/RoomsContext';
import { RoomCondition } from '@/app/api/rooms/route';

const getConditionImage = (condition: RoomCondition) => {
  switch (condition) {
    case 'clean':
      return '/room-conditions/clean.svg';
    case 'dirty':
      return '/room-conditions/dirty.svg';
    case 'maintenance':
      return '/room-conditions/wrench.svg';
    case 'IOT_disconnected':
      return '/room-conditions/wifi-off.svg';
    default:
      return '/room-conditions/clean-icon.svg';
  }
};
export const RoomsList = () => {
  const { filteredRooms } = useContext(RoomsContext);

  return (
    <div className={'grid grid-cols-3 gap-2 md:grid-cols-5 xl:grid-cols-7 '}>
      {filteredRooms.map((room) => (
        <div
          key={room.id}
          className={cn(
            'relative flex h-32 flex-col items-center justify-between rounded-md p-2',
            {
              'bg-green-300': room.status === 'empty',
              'bg-gray-400': room.status === 'occupied',
            }
          )}
        >
          <div className='flex py-2'>
            {Array.from(room.conditions).map((condition) => (
              <Image
                key={condition}
                alt={`${condition} icon`}
                src={getConditionImage(condition)}
                className={''}
                height={20}
                width={20}
              />
            ))}
          </div>
          <span>{room.status}</span>
          <span>Room: {room.name}</span>
        </div>
      ))}
    </div>
  );
};
