import { RoomDetailPageContent } from '@/pages/RoomDetailPageContent';
import { RoomDetailsType } from '@/app/api/rooms/search/id/[slug]/route';

async function getRoomFromId(id: string): Promise<RoomDetailsType | undefined> {
  if (id !== '') {
    try {
      const res = await fetch(
        `http://localhost:3000/api/rooms/search/id/${id}`
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

export default async function RoomDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const roomDetails = await getRoomFromId(slug);

  if (!roomDetails) {
    return <div>Room not found</div>;
  }
  return <RoomDetailPageContent roomDetails={roomDetails} />;
}
