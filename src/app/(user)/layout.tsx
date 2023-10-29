import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/molecules/Footer';
import { Sidebar } from '@/components/molecules/Sidebar';
import { Header } from '@/components/molecules/Header';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* here should be sidebar */}
      <div className='flex'>
        <Sidebar />
        <div className='flex min-h-screen w-full flex-col'>
          <Header />
          <main className='flex h-full flex-col items-center justify-between bg-background p-4'>
            {children}
          </main>
          <Footer />
        </div>
      </div>
      <Toaster />
    </>
  );
}
