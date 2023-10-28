'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    { label: 'Dashboard', path: '/', iconPath: '/dashboard-icon.svg' },
    { label: 'Energy', path: '/energy', iconPath: '/energy-icon.svg' },
    { label: 'Automation', path: '/energy', iconPath: '/automation-icon.svg' },
    { label: 'Store', path: '/energy', iconPath: '/store-icon.svg' },
    { label: 'Report', path: '/energy', iconPath: '/report-icon.svg' },
    { label: 'Bills', path: '/energy', iconPath: '/bill-icon.svg' },
    { label: 'Setting', path: '/energy', iconPath: '/settings-icon.svg' },
  ];

  return (
    <aside
      className={`flex flex-col ${
        isExpanded ? 'w-72' : 'w-20'
      } shadow transition-all duration-100 ease-in-out`}
    >
      <div
        className={`mb-20 mt-10 flex h-16 items-center ${
          isExpanded ? 'px-2 md:pl-5' : 'px-2'
        }`}
      >
        {isExpanded ? (
          <Image src='/logo.png' alt='Logo' height={30} width={116} />
        ) : (
          <Image src='/logo-small.jpg' alt='Logo' height={30} width={116} />
        )}
      </div>
      <nav className='flex-1'>
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              className={cn(
                'flex cursor-pointer items-center gap-2 p-4 hover:bg-primary-200',
                {
                  'bg-primary-200': pathname === item.path,
                }
              )}
              onClick={() => router.push(item.path)}
            >
              <Image
                alt={`${item.label}-icon`}
                src={item.iconPath}
                height={20}
                width={20}
              />
              {isExpanded ? <span>{item.label}</span> : null}
            </li>
          ))}
        </ul>
      </nav>
      <div className='flex h-16 items-center justify-center'>
        <Button variant='ghost' onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <Image
              alt={'collapse-left-icon'}
              src={'/collapse-left.svg'}
              height={20}
              width={20}
            />
          ) : (
            <Image
              alt={'collapse-right-icon'}
              src={'/collapse-right.svg'}
              height={20}
              width={20}
            />
          )}
        </Button>
      </div>
    </aside>
  );
};
