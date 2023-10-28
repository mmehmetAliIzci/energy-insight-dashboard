import React from 'react';
import DateTimeComponent from '../molecules/DateTimeComponent';

export const Header = (): JSX.Element => {
  return (
    <div className='flex items-center h-[80px] justify-between px-6'>
      <div
      className='text-2xl font-semibold'
        style={{
          background:
            'linear-gradient(180deg, rgb(14, 126, 228) 0%, rgb(20, 184, 180) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Energy Dashboard
      </div>
      <DateTimeComponent /> 
    </div>
  );
};
