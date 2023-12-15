import { today } from '@/lib/constants';
import { TypographyH4 } from '@/components/ui/typography/h4';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnergySavingsOverview } from '@/app/api/rooms/overview/route';
import { EnergyIntensity } from '@/app/api/rooms/energy-intensity/route';
import { TypographyH5 } from '@/components/ui/typography/h5';
import { CarbonFootprint } from '@/app/api/rooms/carbon-footprint/route';
import { Progress } from '@/components/ui/progress';
import { PeopleOccupancy } from '@/app/api/rooms/people-occupancy/route';

async function fetchPeopleOccupancy(): Promise<PeopleOccupancy | undefined> {
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/rooms/people-occupancy`
    );
    if (!res.ok) {
      throw new Error('Rooms api returned 200');
    }
    const peopleOccupancy = await res.json();
    return peopleOccupancy;
  } catch (e: any) {
    console.error(e.message);
    return undefined;
  }
}

async function PeopleOccupancy() {
  const peopleOccupancy = await fetchPeopleOccupancy();

  if (!peopleOccupancy) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between gap-2'>
            <span className='text-xl font-semibold'>People Occupancy</span>
          </CardTitle>
        </CardHeader>
        <CardContent className=''>
          Something went wrong fetching people occupancy
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className='text-xl font-semibold'>People Occupancy</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className={'font-light'}>Current Status</span>
        <Progress
          value={
            (peopleOccupancy.occupiedRooms / peopleOccupancy.totalRooms) * 100
          }
          className={'mb-2'}
        />
        <div className='flex w-full flex-col gap-3'>
          <div className='flex flex-row items-center justify-between '>
            <div className='flex font-light'>
              <div className='mr-2 h-5 w-5 rounded bg-primary' />
              <span>Occupied Rooms</span>
            </div>
            <div>
              <span className='font-bold'>{peopleOccupancy.occupiedRooms}</span>
              rooms
              <span className={'ml-2 text-primary'}>
                {(
                  (peopleOccupancy.occupiedRooms / peopleOccupancy.totalRooms) *
                  100
                ).toFixed(0)}
                %
              </span>
            </div>
          </div>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex font-light'>
              <div className='mr-2 h-5 w-5 rounded bg-secondary' />
              <span>Empty Rooms</span>
            </div>
            <div>
              <span className='font-bold'>{peopleOccupancy.emptyRooms}</span>
              rooms
              <span className={'ml-2 text-secondary'}>
                {(
                  (peopleOccupancy.emptyRooms / peopleOccupancy.totalRooms) *
                  100
                ).toFixed(0)}
                %
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PeopleOccupancy;
