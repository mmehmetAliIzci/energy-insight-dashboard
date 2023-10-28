import { cn } from '@/lib/utils';

export function TypographyH1({
  children,
  classname,
}: {
  children: any;
  classname?: string;
}) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl tracking-tight lg:text-5xl',
        classname
      )}
    >
      {children}
    </h1>
  );
}
