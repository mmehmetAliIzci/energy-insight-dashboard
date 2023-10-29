import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const NUM_ITEMS = 20;
export const RoomsListSkeleton = () => {
  return (
    <>
      <div className='mb-3 flex flex-col gap-3 md:flex-row'>
        <Skeleton className={cn('flex h-32 w-full rounded-md p-2')} />
      </div>
      <div className={'grid grid-cols-3 gap-2 md:grid-cols-5 xl:grid-cols-7'}>
        {Array.from({ length: NUM_ITEMS }).map((_, index) => (
          <div key={index} className={'flex flex-col gap-2'}>
            <Skeleton
              key={index}
              className={cn(
                'flex h-32 flex-col items-center justify-between rounded-md p-2'
              )}
            />

            <Skeleton className='h-4 w-full bg-primary-400' />
            <Skeleton className='h-4 w-full bg-primary-400' />
          </div>
        ))}
      </div>
    </>
  );
};
