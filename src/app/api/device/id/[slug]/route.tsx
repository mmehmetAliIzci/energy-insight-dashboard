import { NextResponse } from 'next/server';
import { RoomDetailsType } from '@/app/api/rooms/search/id/[slug]/route';

export interface RealTimeData {
  type: string; // e.g., 'temperature', 'humidity', 'co2Level'
  current: number;
  min: number;
  max: number;
}

interface RealTimeDataResponse {
  deviceId: string;
  deviceName?: string;
  data: RealTimeData[];
}

// Historical Data Interfaces

export interface HistoricalData {
  type: string; // e.g., 'temperatureHistory', 'humidityHistory'
  timestamps: string[]; // ISO date strings representing the time of each data point
  values: number[]; // Corresponding values for each timestamp
}

interface HistoricalDataResponse {
  deviceId: string;
  deviceName?: string;
  data: HistoricalData[];
}
function getRandomValue(min: number, max: number): number {
  return +(Math.random() * (max - min) + min).toFixed(2);
}

function getRandomHistory(type: string): HistoricalData {
  const timestamps = Array(7)
    .fill(null)
    .map((_, i) =>
      new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
    ); // Last 7 days
  const values = timestamps.map(() => getRandomValue(0, 100)); // Sample random values
  return {
    type,
    timestamps,
    values,
  };
}

function getRandomRealTimeData(type: string): RealTimeData {
  const current = getRandomValue(0, 100);
  return {
    type,
    current,
    min: current - 10, // Sample calculation
    max: current + 10, // Sample calculation
  };
}

// Function to generate random device historical data
function generateDeviceHistoricalData(): HistoricalDataResponse {
  const dataTypes = [
    'temperatureHistory',
    'humidityHistory',
    'co2LevelHistory',
  ];
  return {
    deviceId: 'sampleDeviceId',
    data: dataTypes.map(getRandomHistory),
  };
}

// Function to generate random device real-time data
function generateDeviceRealTimeData(): RealTimeDataResponse {
  const dataTypes = ['temperature', 'humidity', 'co2Level'];
  return {
    deviceId: 'sampleDeviceId',
    data: dataTypes.map(getRandomRealTimeData),
  };
}

// API Endpoint
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';
export const revalidate = 1;

export type DeviceDetailsResponse = {
  deviceId: string;
  deviceName?: string;
  historicalData: HistoricalData[];
  realTimeData: RealTimeData[];
};
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const id = params.slug ?? '';

  let response: DeviceDetailsResponse;

  try {
    let responseHistorical = generateDeviceHistoricalData();

    let responseRealTime = generateDeviceRealTimeData();

    response = {
      deviceId: id,
      deviceName: id,
      historicalData: responseHistorical.data,
      realTimeData: responseRealTime.data,
    };

    // Simulate a 1 second delay before returning the response
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
