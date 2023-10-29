import Rooms from '@/components/organisms/Rooms';
import { Suspense } from 'react';
import { RoomsListSkeleton } from '@/components/molecules/RoomList/RoomsListSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import EnergySavingsOverview from '@/components/organisms/EnergySavingsOverview/EnergySavingsOverview';
import EnergyIntensity from '@/components/organisms/EnergyIntensity/EnergyIntensity';
import Weather from '@/components/organisms/Weather/Weather';
import CarbonFootprint from '@/components/organisms/CarbonFootprint/CarbonFootprint';
import PeopleOccupancy from '@/components/organisms/PeopleOccupancy/PeopleOccupancy';

export function DashboardPage() {
  return (
    <div className='grid w-full grid-cols-1 grid-rows-1 gap-2 lg:grid-cols-3'>
      <div className='col-span-2 rounded-lg p-3.5 shadow'>
        <Suspense fallback={<RoomsListSkeleton />}>
          <Rooms />
        </Suspense>
      </div>

      <div className='col-span-1 grid gap-2'>
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
