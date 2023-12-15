import { today } from '@/lib/constants';
import { TypographyH4 } from '@/components/ui/typography/h4';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnergySavingsOverview } from '@/app/api/rooms/overview/route';
import { EnergyIntensity } from '@/app/api/rooms/energy-intensity/route';

async function fetchIntensity(): Promise<EnergyIntensity | undefined> {
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/rooms/energy-intensity`
    );
    if (!res.ok) {
      throw new Error('Rooms api returned 200');
    }
    const intensity = await res.json();
    return intensity;
  } catch (e: any) {
    console.error(e.message);
    return undefined;
  }
}

async function EnergyIntensity() {
  const energyIntensityValue = await fetchIntensity();

  if (!energyIntensityValue) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between gap-2'>
            <span className='text-xl font-semibold'>Energy Use Intensity</span>
          </CardTitle>
        </CardHeader>
        <CardContent className=''>
          Something went wrong fetching intensity
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <div className={'flex flex-col gap-3 p-5 xl:flex-row'}>
        <div className='flex flex-col'>
          <span className='text-xl font-semibold'>Energy Use Intensity</span>
          <span className='font-light '>
            {today.toLocaleString('default', {
              day: 'numeric',
              year: 'numeric',
              month: 'long',
            })}
          </span>
        </div>
        <div className='flex flex-col items-center justify-center rounded-lg border-2 border-solid border-primary px-5 py-1 shadow'>
          <TypographyH4 classname={'text-primary font-semibold'}>
            {energyIntensityValue.value}
          </TypographyH4>
          <span className='text-sm font-light'>kWh/m2/year</span>
        </div>
      </div>
    </Card>
  );
}

export default EnergyIntensity;
