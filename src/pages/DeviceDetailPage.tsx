'use client';
import { FC } from 'react';
import { DeviceDetailsResponse } from '@/app/api/device/id/[slug]/route';
import HistoricalDataChart from '@/components/molecules/HistoricalDataChart/HistoricalDataChart';
import RealtimeDataChart from '@/components/molecules/RealtimeDataChart/HistoricalDataChart';

interface DeviceDetailsProps {
  deviceDetails: DeviceDetailsResponse;
}

const DeviceDetails: FC<DeviceDetailsProps> = ({ deviceDetails }) => {
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
};

export default DeviceDetails;
