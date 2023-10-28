import { cn } from '@/lib/utils';

export function TypographyH3({
  children,
  classname,
}: {
  children: any;
  classname?: string;
}) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl tracking-tight lg:text-3xl',
        classname
      )}
    >
      {children}
    </h3>
  );
}
