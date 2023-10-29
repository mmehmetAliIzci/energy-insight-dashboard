import { Card } from '@/components/ui/card';
import { RoomDetailsType } from '@/app/api/rooms/search/id/[slug]/route';
import { TypographyH2 } from '@/components/ui/typography/h2';
import { cn, differenceInMinutes, getConditionImage } from '@/lib/utils';
import Image from 'next/image';
import { today } from '@/lib/constants';
import { TypographyH4 } from '@/components/ui/typography/h4';
import IotControlCard from '@/components/organisms/IotControlCard/IotControlCard';

export function RoomDetailPageContent({
  roomDetails,
}: {
  roomDetails: RoomDetailsType;
}) {
  const occupancyDetection = roomDetails.iot_config.find(
    (config) => config.id === 'occupancy_detection'
  );

  return (
    <div className={'w-full'}>
      <TypographyH2 classname={'text-gray-400 font-bold'}>
        {roomDetails.name}
      </TypographyH2>
      <div className={'mb-8 flex justify-around gap-2'}>
        {/*Status */}
        <Card className={'p-4'}>
          <span className={'text-2xl text-gray-500'}>Status</span>
          <div
            className={cn(
              'rounded-md px-20 py-5 text-2xl ',
              roomDetails.status !== 'empty'
                ? 'bg-secondary-500 text-white'
                : 'bg-primary-500 text-gray-300'
            )}
          >
            {roomDetails.status}
          </div>
        </Card>

        <Card className={'p-4'}>
          <div className={'flex'}>
            <Image
              alt={'IOT_disconnected icon'}
              src={getConditionImage('IOT_disconnected')}
              height={20}
              width={20}
            />
            <span className={'pl-2 text-2xl text-gray-500'}>
              Disconnected IoT
            </span>
          </div>

          <div className={'flex flex-col gap-2'}>
            {roomDetails.iot_config.map((iotConfig) => {
              if (iotConfig.status === 'disconnected') {
                return (
                  <div key={iotConfig.title} className={'flex justify-between'}>
                    <span className={'text-md font-bold text-destructive'}>
                      {iotConfig.title}
                    </span>
                    <span className={'text-gray-400'}>
                      {differenceInMinutes(
                        today.toISOString(),
                        iotConfig.lastPingTime
                      )}
                      m ago
                    </span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </Card>

        <Card className={'p-4'}>
          <div className={'flex'}>
            <Image
              alt={'IOT_disconnected icon'}
              src={getConditionImage('maintenance')}
              height={20}
              width={20}
            />
            <span className={'pl-2 text-2xl text-gray-500'}>Maintenance</span>
          </div>

          <div className={'flex flex-col gap-2'}>
            {roomDetails.iot_data.maintenance.map((m) => {
              return (
                <div
                  key={m.description}
                  className={'flex flex-col justify-between'}
                >
                  <span className={'text-md font-bold text-primary'}>
                    {m.description}
                  </span>
                  <span className={'text-gray-400'}>
                    on{' '}
                    {new Date(m.date).toLocaleString('default', {
                      day: 'numeric',
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div>
        <TypographyH4 classname={'text-secondary mb-2'}>Devices</TypographyH4>
        <div className={'grid grid-cols-2 gap-2 md:grid-cols-3'}>
          {roomDetails.iot_config.map((iotConfig) => (
            <IotControlCard iotConfig={iotConfig} key={iotConfig.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
