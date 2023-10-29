import { today } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Weather, WeatherStatus } from '@/app/api/weather/route';

async function fetchWeather(): Promise<Weather | undefined> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/weather`);
    if (!res.ok) {
      throw new Error('Rooms api returned 200');
    }
    const weather = await res.json();
    return weather;
  } catch (e: any) {
    console.error(e.message);
    return undefined;
  }
}

async function Weather() {
  const weather = await fetchWeather();

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
      case 'small-rainy':
        return '/weather/water-droplet.svg';
      default:
        return '/weather/sunny.svg';
    }
  };

  if (!weather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between gap-2'>
            <span className='text-xl font-semibold'>Weather</span>
          </CardTitle>
        </CardHeader>
        <CardContent className=''>
          Something went wrong fetching weather data
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className='text-xl font-semibold'>
            District, {weather.districtName}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={
            'grid w-full grid-cols-1  grid-rows-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'
          }
        >
          <div className={'mr-2.5 flex w-fit rounded-lg p-3 shadow-md'}>
            <div className={'flex flex-col'}>
              <div className={'text-sm text-primary'}>
                {today.toLocaleString('default', {
                  day: 'numeric',
                  month: 'long',
                })}
              </div>
              <div className={'text-xl text-primary'}>
                {weather.days[0]?.degrees}°
              </div>
            </div>
            <Image
              alt={weather.days[0]?.status}
              src={getWeatherIcon(weather.days[0]?.status as WeatherStatus)}
              width={56}
              height={56}
            />
          </div>
          <div className={'flex w-full justify-around gap-1'}>
            {weather.days.map((weather, index) => {
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
  );
}

export default Weather;
