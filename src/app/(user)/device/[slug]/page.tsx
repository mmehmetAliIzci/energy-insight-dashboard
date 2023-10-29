import { DeviceDetailsResponse } from '@/app/api/device/id/[slug]/route';
import RealtimeDataChart from '@/components/molecules/RealtimeDataChart/HistoricalDataChart';
import HistoricalDataChart from '@/components/molecules/HistoricalDataChart/HistoricalDataChart';

async function getDeviceInfoFromId(
  id: string
): Promise<DeviceDetailsResponse | undefined> {
  if (id !== '') {
    try {
      const res = await fetch(`${process.env.BE_URL}/api/device/id/${id}?historical=true`);
      if (res.status !== 200) {
        throw new Error('BE API returned not 200');
      }
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
  return undefined;
}

export default async function DeviceDetail({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const deviceDetails = await getDeviceInfoFromId(slug);

  if (!deviceDetails) {
    return <div>Device not found</div>;
  }
  return (
    <div className='w-full rounded bg-white p-6'>
      <h1 className='mb-4 text-xl font-bold'>Device Details</h1>

      <div className='mb-4'>
        <span className='font-semibold'>Device ID:</span>{' '}
        {deviceDetails.deviceId}
      </div>

      {deviceDetails.deviceName && (
        <div className='mb-4'>
          <span className='font-semibold'>Device Name:</span>{' '}
          {deviceDetails.deviceName}
        </div>
      )}

      <div className='grid grid-cols-1 gap-4'>
        <div>
          <h2 className='mb-2 font-semibold'>Real-time Data</h2>
          <div className={'grid grid-cols-2'}>
            {deviceDetails.realTimeData.map((data, index) => (
              <RealtimeDataChart key={index} data={data} />
            ))}
          </div>
        </div>
        <div>
          <h2 className='mb-2 font-semibold'>Historical Data</h2>
          <div className={'grid grid-cols-1 justify-center'}>
            {deviceDetails.historicalData.map((data, index) => (
              <HistoricalDataChart key={index} data={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
