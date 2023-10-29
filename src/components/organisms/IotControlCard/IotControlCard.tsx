'use client';

import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { today } from '@/lib/constants';
import { Card } from '@/components/ui/card';
import { differenceInMinutes } from '@/lib/utils';
import { IoTConfig } from '@/app/api/rooms/search/id/[slug]/route';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const IotControlCard = ({ iotConfig }: { iotConfig: IoTConfig }) => {
  const router = useRouter();
  return (
    <Card
      key={iotConfig.id}
      className={'grid grid-cols-2 grid-rows-2 items-center gap-5 p-4'}
    >
      <div className={'flex flex-col gap-3'}>
        <span className={'text-md font-bold'}>{iotConfig.title}</span>
        <Image
          alt={'device image'}
          src={iotConfig.icon}
          width='30'
          height={'30'}
          className={'rounded-md'}
        />
      </div>
      <div className={''}>
        <Button
          variant={'secondary'}
          className={'text-white'}
          onClick={() => router.push(`/device/${iotConfig.id}`)}
        >
          Details
        </Button>
      </div>
      <div className={'col-span-2 flex items-center gap-2'}>
        <Switch
          checked={iotConfig.status === 'on'}
          disabled={iotConfig.status === 'disconnected'}
          onCheckedChange={() =>
            toast({
              title: `Device  ${iotConfig.title}`,
              description: `is now ${iotConfig.status === 'on' ? 'off' : 'on'}`,
            })
          }
        />
        {iotConfig.status}
        <span className={'text-gray-400'}>
          {differenceInMinutes(today.toISOString(), iotConfig.lastPingTime)}m
          ago
        </span>
      </div>
    </Card>
  );
};

export default IotControlCard;
