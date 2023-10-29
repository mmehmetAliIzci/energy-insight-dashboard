import RoomFilters from '@/components/molecules/Rooms/RoomFilters/RoomFilters';
import { Room } from '@/app/api/rooms/route';
import { RoomsProvider } from '@/components/molecules/Rooms/RoomsContext';
import { RoomsList } from '@/components/molecules/Rooms/RoomList/RoomsList';

async function fetchRooms(): Promise<Room[]> {
  try {
    const res = await fetch('http://localhost:3000/api/rooms');
    if (!res.ok) {
      throw new Error('Rooms api returned 200');
    }
    const rooms = await res.json();
    return rooms;
  } catch (e: any) {
    console.error(e.message);
    return [];
  }
}

async function Rooms() {
  const rooms = await fetchRooms();

  return (
    <RoomsProvider initialRooms={rooms}>
      <div className={'max-h-screen overflow-y-scroll'}>
        <RoomFilters />
        <RoomsList />
      </div>
    </RoomsProvider>
  );
}

export default Rooms;
