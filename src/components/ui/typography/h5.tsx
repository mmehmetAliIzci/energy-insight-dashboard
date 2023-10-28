import { cn } from '@/lib/utils';

export function TypographyH5({
  children,
  classname,
}: {
  children: any;
  classname?: string;
}) {
  return (
    <h5 className={cn('scroll-m-20 text-[1.4rem] tracking-tight', classname)}>
      {children}
    </h5>
  );
}
