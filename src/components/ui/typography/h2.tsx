import { cn } from '@/lib/utils';

export function TypographyH2({
  children,
  classname,
}: {
  children: any;
  classname?: string;
}) {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-3xl tracking-tight lg:text-4xl',
        classname
      )}
    >
      {children}
    </h2>
  );
}
