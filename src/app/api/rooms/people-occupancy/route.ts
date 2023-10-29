import { NextResponse } from 'next/server';

export interface PeopleOccupancy {
  totalRooms: number;
  occupiedRooms: number;
  emptyRooms: number;
}

function generatePeopleOccupancy(): PeopleOccupancy {
  const totalRooms = Math.floor(Math.random() * 200); // Random total rooms up to 200
  const occupiedRooms = Math.floor(Math.random() * totalRooms); // Random occupied rooms up to totalRooms
  const emptyRooms = totalRooms - occupiedRooms; // Calculate empty rooms

  return {
    totalRooms,
    occupiedRooms,
    emptyRooms,
  };
}

export async function GET() {
  try {
    const peopleOccupancyData: PeopleOccupancy = generatePeopleOccupancy();

    // Simulate a 1 second delay before returning the response
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return NextResponse.json(peopleOccupancyData);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
