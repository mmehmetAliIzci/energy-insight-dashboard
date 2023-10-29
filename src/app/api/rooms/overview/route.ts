import { NextResponse } from 'next/server';

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

export interface EnergyOverview {
  total: number;
  unit: 'kWh';
  change: number;
}

export interface SavingsOverview {
  total: number;
  unit: 'THB';
  change: number;
}

export interface EnergySavingsOverview {
  energy: EnergyOverview;
  savings: SavingsOverview;
}

function generateRandomEnergy(): EnergyOverview {
  return {
    total: Math.floor(Math.random() * 20000000), // Random value between 0 and 20,000,000
    unit: 'kWh',
    change: +(Math.random() * 50 - 25).toFixed(2), // Random value between -25% and 25%
  };
}

function generateRandomSavings(): SavingsOverview {
  return {
    total: Math.floor(Math.random() * 10000000), // Random value between 0 and 10,000,000
    unit: 'THB',
    change: +(Math.random() * 50 - 25).toFixed(2), // Random value between -25% and 25%
  };
}

function generateOverviewData(): EnergySavingsOverview {
  return {
    energy: generateRandomEnergy(),
    savings: generateRandomSavings(),
  };
}

export async function GET() {
  try {
    const overviewData: EnergySavingsOverview = generateOverviewData();

    // Simulate a 1 second delay before returning the response
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json(overviewData); // Pass the resolved JSON data here
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
