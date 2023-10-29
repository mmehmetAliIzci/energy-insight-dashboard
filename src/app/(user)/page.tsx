import Image from 'next/image';
import { DashboardPage } from '@/pages/DashboardPage';
import { Room } from '@/app/api/rooms/route';

export default async function Dashboard() {
  return <DashboardPage />;
}
