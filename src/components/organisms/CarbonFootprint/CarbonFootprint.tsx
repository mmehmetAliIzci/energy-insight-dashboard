import { today } from '@/lib/constants';
import { TypographyH4 } from '@/components/ui/typography/h4';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnergySavingsOverview } from '@/app/api/rooms/overview/route';
import { EnergyIntensity } from '@/app/api/rooms/energy-intensity/route';
import { TypographyH5 } from '@/components/ui/typography/h5';
import { CarbonFootprint } from '@/app/api/rooms/carbon-footprint/route';

async function fetchCarbonFootprint(): Promise<CarbonFootprint | undefined> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/rooms/carbon-footprint`);
    if (!res.ok) {
      throw new Error('Rooms api returned 200');
    }
    const footPrint = await res.json();
    return footPrint;
  } catch (e: any) {
    console.error(e.message);
    return undefined;
  }
}

async function CarbonFootprint() {
  const carbonFootprint = await fetchCarbonFootprint();

  if (!carbonFootprint) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between gap-2'>
            <span className='text-xl font-semibold'>Carbon Footprint</span>
          </CardTitle>
        </CardHeader>
        <CardContent className=''>
          Something went wrong fetching carbon footprint
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className='text-xl font-semibold'>Carbon Footprint</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='grid w-full grid-cols-1  grid-rows-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
        <div className='flex flex-col gap-3'>
          <span className='flex gap-1 font-light'>Total Carbon Reduced</span>
          <div className={'flex flex-row items-center gap-2'}>
            <TypographyH5>{carbonFootprint.carbonReduced}</TypographyH5>
            <span className='font-light'> t-CO2</span>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <span className='flex gap-1 font-light'>Tree Saved</span>
          <div className={'flex flex-row items-center gap-2'}>
            <TypographyH5>{carbonFootprint.treesSaved}</TypographyH5>
            <span className='font-light'> trees</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CarbonFootprint;
