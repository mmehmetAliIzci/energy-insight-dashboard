'use client';
import { cn, getConditionImage } from '@/lib/utils';
import Image from 'next/image';
import { useContext } from 'react';
import { RoomsContext } from '@/lib/context/RoomsContext';
import { RoomCondition } from '@/app/api/rooms/route';
import Link from 'next/link';

export const RoomsList = () => {
  const { filteredRooms } = useContext(RoomsContext);

  return (
    <div className={'grid grid-cols-3 gap-2 md:grid-cols-5 xl:grid-cols-7 '}>
      {filteredRooms.map((room) => (
        <Link
          // Important optimization: prefetch={false} to prevent unnecessary pre-fetching
          prefetch={false}
          href={`/room/${room.id}`}
          key={room.id}
          className={cn(
            'relative flex h-32 cursor-pointer flex-col items-center justify-between rounded-md p-2',
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
        </Link>
      ))}
    </div>
  );
};
