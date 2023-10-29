import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RoomCondition } from '@/app/api/rooms/route';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getConditionImage = (condition: RoomCondition) => {
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

export function differenceInMinutes(
  isoTime1: string,
  isoTime2: string
): string {
  const date1 = new Date(isoTime1);
  const date2 = new Date(isoTime2);

  const diffMilliseconds = Math.abs(date1.getTime() - date2.getTime());
  return (diffMilliseconds / (1000 * 60)).toFixed(0);
}
