'use client';
import {
  ReactNode,
  createContext,
  useState,
  useCallback,
  SetStateAction,
  Dispatch,
} from 'react';

import { Room } from '@/app/api/rooms/route';
import { FilterState } from '@/components/molecules/Rooms/RoomFilters/RoomFilters';

export type RoomsContextType = {
  rooms: Room[];
  filteredRooms: Room[];
  setRooms: Dispatch<SetStateAction<Room[]>>;
  filterRooms: (filters: FilterState) => Promise<void>;
};
export const RoomsContext = createContext<RoomsContextType>(
  null as unknown as RoomsContextType
);

export const RoomsProvider = ({
  children,
  initialRooms,
}: {
  children: ReactNode;
  initialRooms: Room[];
}) => {
  const [rooms, setRooms] = useState(initialRooms);
  const [filteredRooms, setFilteredRooms] = useState(initialRooms);

  const filterRooms = useCallback(
    async (filters: FilterState) => {
      const hasActiveStatusFilter = Object.values(filters.status).some(Boolean);
      const hasActiveConditionFilter = Object.values(filters.conditions).some(
        Boolean
      );

      setFilteredRooms(
        rooms.filter((room) => {
          // Filter based on status
          if (hasActiveStatusFilter && !filters.status[room.status]) {
            return false;
          }

          // Filter based on conditions
          if (hasActiveConditionFilter) {
            const hasMatchingCondition = Array.from(room.conditions).some(
              (condition) => filters.conditions[condition]
            );
            if (!hasMatchingCondition) {
              return false;
            }
          }

          return true; // The room passed all filter checks
        })
      );
    },
    [rooms]
  );

  return (
    <RoomsContext.Provider
      value={{
        rooms,
        filteredRooms,
        setRooms,
        filterRooms,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};
