import { NextResponse } from 'next/server';

export type RoomStatus = 'occupied' | 'empty';
export type RoomCondition =
  | 'clean'
  | 'dirty'
  | 'maintenance'
  | 'IOT_disconnected';

export interface Room {
  id: string; // Unique identifier for the room
  name: string; // Name of the room
  status: RoomStatus;
  conditions: Set<RoomCondition>; // Set to easily check and manipulate room conditions
}

function generateRandomStatus(): RoomStatus {
  const statuses: RoomStatus[] = ['occupied', 'empty'];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}

function generateRandomConditions(): Set<RoomCondition> {
  const conditions: RoomCondition[] = [
    'clean',
    'dirty',
    'maintenance',
    'IOT_disconnected',
  ];
  const randomConditions = new Set<RoomCondition>();
  const numRandomConditions = Math.floor(
    Math.random() * (conditions.length + 1)
  );

  while (randomConditions.size < numRandomConditions) {
    const randomIndex = Math.floor(Math.random() * conditions.length);
    randomConditions.add(conditions[randomIndex]);
  }

  if (randomConditions.has('clean') && randomConditions.has('dirty')) {
    // Remove one of the conditions randomly
    Math.random() > 0.5
      ? randomConditions.delete('clean')
      : randomConditions.delete('dirty');
  }

  return randomConditions;
}

// Function to generate rooms with random statuses and conditions
function generateRooms(numRooms: number): Room[] {
  const rooms: Room[] = [];

  for (let i = 1; i <= numRooms; i++) {
    const room: Room = {
      id: i.toString(),
      name: `${i}`,
      status: generateRandomStatus(),
      conditions: Array.from(generateRandomConditions()) as unknown as any,
    };
    rooms.push(room);
  }

  return rooms;
}

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';
export const revalidate = 1;

export async function GET() {
  try {
    const generatedRooms: Room[] = generateRooms(100);

    // Simulate a 1 second delay before returning the response
    await new Promise((resolve) => setTimeout(resolve, 3500));
    return NextResponse.json(generatedRooms); // Pass the resolved JSON data here
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
