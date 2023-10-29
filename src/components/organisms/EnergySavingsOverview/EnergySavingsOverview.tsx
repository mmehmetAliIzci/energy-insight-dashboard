import { EnergySavingsOverview } from '@/app/api/rooms/overview/route';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { TypographyH5 } from '@/components/ui/typography/h5';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

async function fetchOverview(): Promise<EnergySavingsOverview | undefined> {
  try {
    const res = await fetch('http://localhost:3000/api/rooms/overview');
    if (!res.ok) {
      throw new Error('Rooms api returned 200');
    }
    const overview = await res.json();
    return overview;
  } catch (e: any) {
    console.error(e.message);
    return undefined;
  }
}

async function EnergySavingsOverview() {
  const overview = await fetchOverview();

  if (!overview) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between gap-2'>
            <span className='text-xl font-semibold'>Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className=''>
          Something went wrong fetching overviews
        </CardContent>
      </Card>
    );
  }

  const getTextForPercentageChange = (percentageChange: number) => {
    if (percentageChange > 0) {
      return <span className='text-secondary'>+ {percentageChange}%</span>;
    } else if (percentageChange < 0) {
      return <span className='text-destructive'>{percentageChange}%</span>;
    } else {
      return <span className='font-light'>{percentageChange}%</span>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between gap-2'>
          <span className='text-xl font-semibold'>Overview</span>
          <Button>Download Report</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className='grid w-full grid-cols-1  grid-rows-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
        <div className='flex flex-col gap-3'>
          <div className={'flex flex-col gap-2'}>
            <span className='flex gap-1 font-light'>
              Total Energy
              <Image
                alt={'energy icon'}
                src={'/energy-icon.svg'}
                height={20}
                width={20}
              />
            </span>
            <div className={'flex flex-row items-end'}>
              <TypographyH5>
                {overview.energy.total.toLocaleString()}
              </TypographyH5>
              <span className='pl-2 text-sm font-light'>
                {overview.energy.unit}
              </span>
            </div>
          </div>
          {getTextForPercentageChange(overview.energy.change)}
        </div>
        <div className='flex flex-col gap-4'>
          <div className={'flex flex-col gap-2'}>
            <span className='flex gap-1 font-light'>
              Total Savings
              <Image
                alt={'bill icon'}
                src={'/bill-icon.svg'}
                height={20}
                width={20}
              />
            </span>
            <div className={'flex flex-row items-end'}>
              <TypographyH5>
                {overview.savings.total.toLocaleString()}
              </TypographyH5>
              <span className='pl-2   text-sm font-light'>
                {overview.savings.unit}
              </span>
            </div>
          </div>
          {getTextForPercentageChange(overview.savings.change)}
        </div>
      </CardContent>
    </Card>
  );
}

export default EnergySavingsOverview;
