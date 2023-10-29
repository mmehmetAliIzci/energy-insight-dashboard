import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TypographyH5 } from '@/components/ui/typography/h5';
import Image from 'next/image';
import { today } from '@/lib/constants';
import { TypographyH4 } from '@/components/ui/typography/h4';
import { Progress } from '@/components/ui/progress';
import Rooms from '@/components/molecules/Rooms/Rooms';
import { Suspense } from 'react';
import { RoomsListSkeleton } from '@/components/molecules/Rooms/RoomList/RoomsListSkeleton';

const OverviewData = {
  data: {
    energy: {
      total: 15685699,
      unit: 'kWh',
      change: 24.45,
    },
    savings: {
      total: 15685699,
      unit: 'THB',
      change: -24.45,
    },
  },
};

const EnergyIntensityData = {
  data: {
    value: 36.43,
  },
};

const CarbonFootprintData = {
  data: {
    carbonReduced: 2000000,
    treesSaved: 5592,
  },
};

const PeopleOccupancyData = {
  data: {
    totalRooms: 134,
    occupiedRooms: 84,
    emptyRooms: 40,
  },
};

const WeatherData = {
  // Assume its ordered by today
  data: {
    districtName: 'Bangkok',
    weather: [
      {
        degrees: 30,
        status: 'sunny',
        name: 'Wednesday',
      },
      {
        degrees: 30,
        status: 'cloudy',
        name: 'Thursday',
      },
      {
        degrees: 30,
        status: 'rainy',
        name: 'Friday',
      },
      {
        degrees: 30,
        status: 'cloudy-rainy',
        name: 'Saturday',
      },
      {
        degrees: 30,
        status: 'cloudy-rainy',
        name: 'Sunday',
      },
      {
        degrees: 30,
        status: 'sunny',
        name: 'Monday',
      },
      {
        degrees: 30,
        status: 'cloudy',
        name: 'Tuesday',
      },
    ],
  },
};

type WeatherStatus =
  | 'sunny'
  | 'cloudy'
  | 'rainy'
  | 'cloudy-rainy'
  | 'small-rainy';
const getWeatherIcon = (status: WeatherStatus) => {
  switch (status) {
    case 'sunny':
      return '/weather/sun.svg';
    case 'cloudy':
      return '/weather/cloudy.svg';
    case 'rainy':
      return '/weather/lightning.svg';
    case 'cloudy-rainy':
      return '/weather/cloudy-rainy.svg';
    default:
      return '/weather/sunny.svg';
  }
};

const getTextForPercentageChange = (percentageChange: number) => {
  if (percentageChange > 0) {
    return <span className='text-secondary'>+ {percentageChange}%</span>;
  } else if (percentageChange < 0) {
    return <span className='text-destructive'>{percentageChange}%</span>;
  } else {
    return <span className='font-light'>{percentageChange}%</span>;
  }
};
export function DashboardPage() {
  const {
    data: { energy, savings },
  } = OverviewData;

  const {
    data: { value: energyIntensityValue },
  } = EnergyIntensityData;

  const {
    data: { carbonReduced, treesSaved },
  } = CarbonFootprintData;

  const {
    data: { totalRooms, occupiedRooms, emptyRooms },
  } = PeopleOccupancyData;

  const {
    data: { districtName, weather },
  } = WeatherData;

  return (
    <div className='grid w-full grid-cols-1 grid-rows-1 gap-2 lg:grid-cols-3'>
      <div className='col-span-2 rounded-lg p-3.5 shadow'>
        <Suspense fallback={<RoomsListSkeleton />}>
          <Rooms />
        </Suspense>
      </div>

      <div className='col-span-1 grid gap-2'>
        {/* Overview component needs suspense and call api with some delay */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between gap-2'>
              <span className='text-xl font-semibold'>Overview</span>
              <Button>Download Report</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className='grid w-full grid-cols-1 grid-rows-1 justify-center gap-4 xl:grid-cols-2'>
            <div className='flex flex-col gap-3'>
              <div className={'flex flex-col gap-2'}>
                <span className='flex gap-1 font-light'>
                  Total Energy
                  <Image
                    alt={'energy icon'}
                    src={'/energy-icon.svg'}
                    height={20}
                    width={20}
                  />
                </span>
                <div className={'flex flex-row items-end'}>
                  <TypographyH5>{energy.total.toLocaleString()}</TypographyH5>
                  <span className='pl-2 text-sm font-light'>
                    {' '}
                    {energy.unit}
                  </span>
                </div>
              </div>
              {getTextForPercentageChange(energy.change)}
            </div>
            <div className='flex flex-col gap-4'>
              <div className={'flex flex-col gap-2'}>
                <span className='flex gap-1 font-light'>
                  Total Savings
                  <Image
                    alt={'bill icon'}
                    src={'/bill-icon.svg'}
                    height={20}
                    width={20}
                  />
                </span>
                <div className={'flex flex-row items-end'}>
                  <TypographyH5>{savings.total.toLocaleString()}</TypographyH5>
                  <span className='pl-2   text-sm font-light'>
                    {' '}
                    {savings.unit}
                  </span>
                </div>
              </div>
              {getTextForPercentageChange(savings.change)}
            </div>
          </CardContent>
        </Card>

        {/* Energy Use */}
        <Card>
          <div className={'flex flex-col gap-3 p-5 xl:flex-row'}>
            <div className='flex flex-col'>
              <span className='text-xl font-semibold'>
                Energy Use Intensity
              </span>
              <span className='font-light '>
                {today.toLocaleString('default', {
                  day: 'numeric',
                  year: 'numeric',
                  month: 'long',
                })}
              </span>
            </div>
            <div className='flex flex-col items-center justify-center rounded-lg border-2 border-solid border-primary px-5 py-1 shadow'>
              <TypographyH4 classname={'text-primary font-semibold'}>
                {energyIntensityValue}
              </TypographyH4>
              <span className='text-sm font-light'>kWh/m2/year</span>
            </div>
          </div>
        </Card>

        {/*Carbon Footprint*/}
        <Card>
          <CardHeader>
            <CardTitle>
              <span className='text-xl font-semibold'>Carbon Footprint</span>
            </CardTitle>
          </CardHeader>
          <CardContent className='grid w-full grid-cols-1 grid-rows-1 justify-center xl:grid-cols-2'>
            <div className='flex flex-col gap-3'>
              <div>
                <span className='flex gap-1 font-light'>
                  Total Carbon Reduced
                </span>
                <TypographyH5>{carbonReduced}</TypographyH5>
                <span className='font-light'> t-CO2</span>
              </div>
              <span className={'text-secondary'}>+24,45%</span>
            </div>
            <div className='flex flex-col gap-3'>
              <div>
                <span className='flex gap-1 font-light'>Tree Saved</span>
                <TypographyH5>{treesSaved}</TypographyH5>
                <span className='font-light'> trees</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/*People Occupancy*/}
        <Card>
          <CardHeader>
            <CardTitle>
              <span className='text-xl font-semibold'>People Occupancy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className={'font-light'}>Current Status</span>
            <Progress
              value={(occupiedRooms / totalRooms) * 100}
              className={'mb-2'}
            />
            <div className='flex w-full flex-col gap-3'>
              <div className='flex flex-row items-center justify-between '>
                <div className='flex font-light'>
                  <div className='mr-2 h-5 w-5 rounded bg-primary' />
                  <span>Occupied Rooms</span>
                </div>
                <div>
                  <span className='font-bold'>{occupiedRooms}</span> rooms
                  <span className={'ml-2 text-primary'}>
                    {((occupiedRooms / totalRooms) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex font-light'>
                  <div className='mr-2 h-5 w-5 rounded bg-secondary' />
                  <span>Empty Rooms</span>
                </div>
                <div>
                  <span className='font-bold'>{emptyRooms}</span> rooms
                  <span className={'ml-2 text-secondary'}>
                    {((emptyRooms / totalRooms) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/*  Weather*/}
        <Card>
          <CardHeader>
            <CardTitle>
              <span className='text-xl font-semibold'>
                District, {districtName}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={'grid grid-cols-1 gap-4 xl:grid-cols-2'}>
              <div className={'mr-2.5 flex w-fit rounded-lg p-3 shadow-md'}>
                <div className={'flex flex-col'}>
                  <div className={'text-sm text-primary'}>
                    {today.toLocaleString('default', {
                      day: 'numeric',
                      month: 'long',
                    })}
                  </div>
                  <div className={'text-xl text-primary'}>
                    {weather[0]?.degrees}°
                  </div>
                </div>
                <Image
                  alt={weather[0]?.status}
                  src={getWeatherIcon(weather[0]?.status as WeatherStatus)}
                  width={56}
                  height={56}
                />
              </div>
              <div className={'flex w-full justify-around gap-1'}>
                {weather.map((weather, index) => {
                  if (index === 0) {
                    return null;
                  } else {
                    return (
                      <div key={index} className={'flex flex-col'}>
                        <span className={'font-light'}>
                          {weather.name.slice(0, 2)}
                        </span>
                        <Image
                          alt={weather.status}
                          src={getWeatherIcon(weather.status as WeatherStatus)}
                          width={29}
                          height={29}
                        />
                        <span>{weather.degrees}°</span>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
