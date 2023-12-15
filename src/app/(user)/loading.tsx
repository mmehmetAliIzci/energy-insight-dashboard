import React from 'react';

export default function Loading() {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-gray-100'>
      <div className='flex flex-col items-center justify-center'>
        <div className='h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900'></div>
        <p className='text-lg mt-4 font-medium text-gray-800'>Loading...</p>
      </div>
    </div>
  );
}
