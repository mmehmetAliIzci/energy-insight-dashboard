import { DeviceDetailsResponse } from '@/app/api/device/id/[slug]/route';
import DeviceDetailPage from '@/pages/DeviceDetailPage';

async function getDeviceInfoFromId(
  id: string
): Promise<DeviceDetailsResponse | undefined> {
  if (id !== '') {
    try {
      const res = await fetch(
        `http://localhost:3000/api/device/id/${id}?historical=true`
      );
      if (res.status !== 200) {
        throw new Error('BE API returned not 200');
      }
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
  return undefined;
}

export default async function DeviceDetail({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const deviceDetails = await getDeviceInfoFromId(slug);

  if (!deviceDetails) {
    return <div>Device not found</div>;
  }
  return <DeviceDetailPage deviceDetails={deviceDetails} />;
}
