import { cn } from '@/lib/utils';

export function TypographyH4({
  children,
  classname,
}: {
  children: any;
  classname?: string;
}) {
  return (
    <h4 className={cn('scroll-m-20 text-[1.6rem] tracking-tight', classname)}>
      {children}
    </h4>
  );
}
