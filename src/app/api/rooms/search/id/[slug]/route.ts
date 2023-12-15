import { NextResponse } from 'next/server';
import { RoomStatus } from '@/app/api/rooms/route';

type IoTStatus = 'on' | 'off' | 'disconnected';

interface Maintenance {
  // ISO string
  date: string;
  description: string;
}

export interface IoTConfig {
  id: string;
  title: string;
  status: IoTStatus;
  lastPingTime: string;
  icon: string;
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

export interface RoomDetailsType {
  id: string;
  name: string;
  status: RoomStatus;
  iot_data: {
    humidity: number;
    comfort: number;
    average_occupation_time: number;
    total_occupation_time: number;
    energy_saving: number;
    maintenance: Maintenance[];
  };
  iot_config: IoTConfig[];
}

function generateRoomDetails(): RoomDetailsType {
  const randomStatus = Math.random() > 0.5 ? 'occupied' : 'empty';
  const randomComfort = Math.random();
  const randomHumidity = Math.random();
  const randomEnergySaving = +(Math.random() * 100).toFixed(2);
  const randomOccupationTime = Math.floor(Math.random() * 10000);

  const iotConfigItems = [
    'occupancy_detection',
    'air_conditioner',
    'exhaust_fan',
    'light_switch_1',
    'life-being',
    'air_con_1',
    'smart_meter',
  ];
  const iotConfigStatuses: IoTStatus[] = ['on', 'off', 'disconnected'];

  const randomIoTConfig = iotConfigItems.map((item) => ({
    id: item,
    title: item
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    status:
      iotConfigStatuses[Math.floor(Math.random() * iotConfigStatuses.length)],
    lastPingTime: addMinutes(
      new Date(),
      -Math.floor(Math.random() * 60)
    ).toISOString(),
    icon: 'https://placedog.net/50',
  }));

  return {
    id: `id_${Math.floor(Math.random() * 1000)}`,
    name: `Room ${Math.floor(Math.random() * 100)}`,
    status: randomStatus,
    iot_data: {
      humidity: randomHumidity,
      comfort: randomComfort,
      average_occupation_time: randomOccupationTime,
      total_occupation_time: randomOccupationTime,
      energy_saving: randomEnergySaving,
      maintenance: [
        {
          date: new Date(
            1620000000 + Math.floor(Math.random() * 1000000)
          ).toISOString(),
          description: 'Air-conditioner',
        },
      ],
    },
    iot_config: randomIoTConfig,
  };
}

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';
export const revalidate = 1;

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const id = params.slug ?? '';

  try {
    const roomDetails: RoomDetailsType = generateRoomDetails();
    roomDetails.id = id;

    // Simulate a 1 second delay before returning the response
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json(roomDetails);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
