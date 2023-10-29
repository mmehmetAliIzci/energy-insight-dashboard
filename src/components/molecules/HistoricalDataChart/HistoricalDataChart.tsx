'use client';

import { HistoricalData } from '@/app/api/device/id/[slug]/route';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useCallback } from 'react';

const HistoricalDataChart = ({ data }: { data: HistoricalData }) => {
  const formatHistoricalDataForChart = useCallback(
    (historicalData: HistoricalData) => {
      return historicalData.timestamps.map((timestamp, idx) => ({
        date: new Date(timestamp).toLocaleDateString(),
        value: historicalData.values[idx],
      }));
    },
    []
  );

  return (
    <div key={data.type} className='mb-4'>
      <h3 className='mb-2 font-medium'>{data.type}</h3>
      <LineChart
        width={500}
        height={300}
        data={formatHistoricalDataForChart(data)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='value'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default HistoricalDataChart;
