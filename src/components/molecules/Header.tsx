import React from 'react';
import dynamic from 'next/dynamic';

const DynamicDateTimeComponent = dynamic(() => import('./DateTimeComponent'), {
  ssr: false,
});

export const Header = (): React.ReactNode => {
  return (
    <div className='flex h-[80px] items-center justify-between px-6'>
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
      <DynamicDateTimeComponent />
    </div>
  );
};
