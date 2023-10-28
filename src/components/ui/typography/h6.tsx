import { cn } from '@/lib/utils';

export function TypographyH6({
  children,
  classname,
}: {
  children: any;
  classname?: string;
}) {
  return (
    <h6 className={cn('scroll-m-20 text-[1.2rem] tracking-tight', classname)}>
      {children}
    </h6>
  );
}
