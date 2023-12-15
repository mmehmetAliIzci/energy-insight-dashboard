'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';

const DynamicDateTimeComponent = dynamic(() => import('./DateTimeComponent'), {
  ssr: false,
});

export const Header = (): React.ReactNode => {
  const handleRefreshClick = async () => {
    // Display the toast message
    toast({
      title: 'Refreshing Data',
      description: 'The data is being refreshed.',
    });

    // Refresh the page
    await router.refresh();
  };
  const router = useRouter();
  return (
    <>
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
        <Button
          onClick={() => {
            handleRefreshClick();
          }}
        >
          Refresh Data
        </Button>

        <DynamicDateTimeComponent />
      </div>
    </>
  );
};
