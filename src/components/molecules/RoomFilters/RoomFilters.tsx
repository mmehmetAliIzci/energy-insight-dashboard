'use client';
import { RoomCondition, RoomStatus } from '@/app/api/rooms/route';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { CheckIcon } from 'lucide-react';
import { cn, getConditionImage } from '@/lib/utils';
import { Toggle } from '@/components/ui/toggle';
import { useContext, useEffect, useReducer, useState } from 'react';
import { filterReducer } from '@/lib/reducer/filterReducer';
import { RoomsContext } from '@/lib/context/RoomsContext';
import Image from 'next/image';

export interface FilterState {
  status: Partial<Record<RoomStatus, boolean>>;
  conditions: Partial<Record<RoomCondition, boolean>>;
}

export const initialFilterState: FilterState = {
  status: {
    occupied: false,
    empty: false,
  },
  conditions: {
    clean: false,
    dirty: false,
    maintenance: false,
    IOT_disconnected: false,
  },
};

const RoomFilters = () => {
  const { filterRooms } = useContext(RoomsContext);
  const [filters, dispatch] = useReducer(filterReducer, initialFilterState);
  const [open, setOpen] = useState(false);

  const statuses = [
    {
      value: 'occupied',
      label: 'Occupied',
    },
    {
      value: 'empty',
      label: 'Empty',
    },
  ];
  const toggleFilter = async (
    type: 'status' | 'conditions',
    value: RoomStatus | RoomCondition
  ) => {
    if (type === 'status') {
      dispatch({ type: 'TOGGLE_STATUS', payload: value });
      console.warn(filters);
    } else if (type === 'conditions') {
      dispatch({ type: 'TOGGLE_CONDITION', payload: value });
    }
  };

  useEffect(() => {
    async function filter() {
      await filterRooms(filters);
    }
    filter();
  }, [filters, filterRooms]);

  return (
    <div className='mb-3 flex flex-col gap-3 md:flex-row'>
      {/* Status Filter */}
      <div className={'flex flex-col'}>
        <h5 className='text-primary'>Status:</h5>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='w-[200px] justify-between'
            >
              {statuses
                .filter((status) => filters.status[status.value] === true)
                ?.map((status) => status.label + ' ') ?? 'Select status...'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
            <Command>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={async (currentValue) => {
                      await toggleFilter('status', status.value as RoomStatus);
                      setOpen(false);
                    }}
                  >
                    {status.label}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        filters.status[status.value]
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Conditions Filter */}
      <div className={'flex flex-col'}>
        <h5 className='text-primary'>Conditions:</h5>
        <div className={'grid grid-cols-2 gap-3 lg:grid-cols-2'}>
          <Toggle
            variant={'outline'}
            pressed={filters.conditions.clean}
            onClick={() => toggleFilter('conditions', 'clean')}
          >
            <div className={'flex gap-1'}>
              <Image
                alt={'clean icon'}
                src={getConditionImage('clean')}
                height={20}
                width={20}
              />
              Clean
            </div>
          </Toggle>
          <Toggle
            variant={'outline'}
            pressed={filters.conditions.dirty}
            onClick={() => toggleFilter('conditions', 'dirty')}
          >
            <div className={'flex gap-1'}>
              <Image
                alt={'dirty icon'}
                src={getConditionImage('dirty')}
                height={20}
                width={20}
              />
              Dirty
            </div>
          </Toggle>
          <Toggle
            variant={'outline'}
            pressed={filters.conditions.maintenance}
            onClick={() => toggleFilter('conditions', 'maintenance')}
          >
            <div className={'flex gap-1'}>
              <Image
                alt={'maintenance icon'}
                src={getConditionImage('maintenance')}
                height={20}
                width={20}
              />
              Maintenance
            </div>
          </Toggle>
          <Toggle
            variant={'outline'}
            pressed={filters.conditions.IOT_disconnected}
            onClick={() => toggleFilter('conditions', 'IOT_disconnected')}
          >
            <div className={'flex gap-1'}>
              <Image
                alt={'IOT_disconnected icon'}
                src={getConditionImage('IOT_disconnected')}
                height={20}
                width={20}
              />
              IoT Disconnected
            </div>
          </Toggle>
        </div>
      </div>
    </div>
  );
};

export default RoomFilters;
