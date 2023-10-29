import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const NUM_ITEMS = 20;
export const RoomsListSkeleton = () => {
  return (
    <div className={'grid grid-cols-3 gap-2 md:grid-cols-5 xl:grid-cols-7'}>
      {Array.from({ length: NUM_ITEMS }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            'relative flex h-32 flex-col items-center justify-between rounded-md p-2'
          )}
        >
          <Skeleton className='h-4 w-[20px]' />
          <Skeleton className='h-4 w-[20px]' />
        </Skeleton>
      ))}
    </div>
  );
};
