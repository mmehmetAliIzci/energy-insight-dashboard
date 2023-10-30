import { NextResponse } from 'next/server';

export interface EnergyIntensity {
  value: number;
}

function generateEnergyIntensity(): EnergyIntensity {
  return {
    value: +(Math.random() * 100).toFixed(2), // Random value between 0 and 100
  };
}
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';
export const revalidate = 1;
export async function GET() {
  try {
    const energyIntensityData: EnergyIntensity = generateEnergyIntensity();

    // Simulate a 1 second delay before returning the response
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return NextResponse.json(energyIntensityData);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
