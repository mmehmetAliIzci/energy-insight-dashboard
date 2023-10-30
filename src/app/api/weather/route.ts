import { NextResponse } from 'next/server';

export interface DayWeather {
  degrees: number;
  status: WeatherStatus;
  name: string;
}

export interface Weather {
  districtName: string;
  days: DayWeather[];
}

export type WeatherStatus =
  | 'sunny'
  | 'cloudy'
  | 'rainy'
  | 'cloudy-rainy'
  | 'small-rainy';

function generateWeather(): Weather {
  const districtNames = ['Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya', 'Krabi'];
  const weatherStatuses: WeatherStatus[] = [
    'sunny',
    'cloudy',
    'rainy',
    'cloudy-rainy',
    'small-rainy',
  ];
  const days = [
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
  ];

  const districtName =
    districtNames[Math.floor(Math.random() * districtNames.length)];
  const weather = days.map((day) => ({
    degrees: Math.floor(Math.random() * (40 - 20 + 1)) + 20, // Random degrees between 20 and 40
    status: weatherStatuses[Math.floor(Math.random() * weatherStatuses.length)],
    name: day,
  }));

  return {
    districtName,
    days: weather,
  };
}

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';
export const revalidate = 1;

export async function GET() {
  try {
    const weatherData: Weather = generateWeather();

    // Simulate a 1 second delay before returning the response
    await new Promise((resolve) => setTimeout(resolve, 6000));
    return NextResponse.json(weatherData);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
