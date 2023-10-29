'use client';

import { RealTimeData } from '@/app/api/device/id/[slug]/route';
import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const RealtimeDataChart = ({ data }: { data: RealTimeData }) => {
  return (
    <div key={data.type} className='mb-4'>
      <ResponsiveContainer width='100%' height={200}>
        <RadialBarChart
          innerRadius='10%'
          outerRadius='80%'
          data={[
            {
              name: data.type,
              value: data.current,
              fill: '#8884d8',
              max: data.max, // Using max value here
              min: data.min, // Using min value here
            },
          ]}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar background label dataKey='value' />
          <Legend
            iconSize={10}
            layout='vertical'
            verticalAlign='middle'
            align='right'
          />
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealtimeDataChart;
