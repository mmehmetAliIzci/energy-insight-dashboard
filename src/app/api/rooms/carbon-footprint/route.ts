import { NextResponse } from 'next/server';

export interface CarbonFootprint {
  carbonReduced: number;
  treesSaved: number;
}

function generateCarbonFootprint(): CarbonFootprint {
  return {
    carbonReduced: Math.floor(Math.random() * 3000000), // Random value up to 3,000,000
    treesSaved: Math.floor(Math.random() * 10000), // Random value up to 10,000
  };
}
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';
export const revalidate = 1;
export async function GET() {
  try {
    const carbonFootprintData: CarbonFootprint = generateCarbonFootprint();

    // Simulate a 1 second delay before returning the response
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return NextResponse.json(carbonFootprintData);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
