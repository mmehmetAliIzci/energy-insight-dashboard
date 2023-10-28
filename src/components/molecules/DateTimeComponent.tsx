'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const DateTimeComponent = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const updateTime = useCallback(() => {
    setCurrentDateTime(new Date());
  }, []);

  useEffect(() => {
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [updateTime]);

  const month = currentDateTime.toLocaleString('default', { month: 'long' });
  const day = currentDateTime.getDate();
  const year = currentDateTime.getFullYear();
  const hours = String(currentDateTime.getHours()).padStart(2, '0');
  const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
  const seconds = String(currentDateTime.getSeconds()).padStart(2, '0');

  return (
    <div className='flex items-center gap-3 text-primary'>
      <Image alt='time icon' src='/time-icon.svg' height='20' width='20' />
      {`${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`}
    </div>
  );
};

export default DateTimeComponent;
