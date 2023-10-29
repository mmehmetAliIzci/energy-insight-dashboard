import { Suspense } from 'react';
import { RoomsListSkeleton } from '@/components/molecules/RoomList/RoomsListSkeleton';
import Rooms from '@/components/organisms/Rooms';
import { Skeleton } from '@/components/ui/skeleton';
import Weather from '@/components/organisms/Weather/Weather';
import EnergySavingsOverview from '@/components/organisms/EnergySavingsOverview/EnergySavingsOverview';
import EnergyIntensity from '@/components/organisms/EnergyIntensity/EnergyIntensity';
import CarbonFootprint from '@/components/organisms/CarbonFootprint/CarbonFootprint';
import PeopleOccupancy from '@/components/organisms/PeopleOccupancy/PeopleOccupancy';

export default async function Dashboard() {
  return (
    <div className='flex w-full grid-rows-1 flex-col gap-2 lg:flex-row'>
      <div className='flex-1 rounded-lg p-3.5 shadow md:flex-[2_2_0%]'>
        <Suspense fallback={<RoomsListSkeleton />}>
          <Rooms />
        </Suspense>
      </div>

      <div className='col-span-1 flex flex-1 flex-col gap-2'>
        <Suspense fallback={<Skeleton className={'h-32 w-full'} />}>
          <EnergySavingsOverview />
        </Suspense>

        <Suspense fallback={<Skeleton className={'h-32 w-full'} />}>
          <EnergyIntensity />
        </Suspense>

        <Suspense fallback={<Skeleton className={'h-32 w-full'} />}>
          <CarbonFootprint />
        </Suspense>

        <Suspense fallback={<Skeleton className={'h-32 w-full'} />}>
          <PeopleOccupancy />
        </Suspense>

        <Suspense fallback={<Skeleton className={'h-32 w-full'} />}>
          <Weather />
        </Suspense>
      </div>
    </div>
  );
}
