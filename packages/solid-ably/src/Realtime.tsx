import { createEffect, onCleanup } from 'solid-js';
import * as ably from 'ably';
import { useAblyRealtime } from './Providers';

export function useAblyRealtimeConnectionEvent(
  event: ably.Types.ConnectionEvent | ably.Types.ConnectionEvent[],
  cb: () => void,
): void {
  const client = useAblyRealtime();

  createEffect(() => {
    client.connection.on(event, cb);
    onCleanup(() => {
      if (Array.isArray(event)) {
        for (let i = 0, len = event.length; i < len; i += 1) {
          client.connection.off(event[i], cb);
        }
      } else {
        client.connection.off(event, cb);
      }
    });
  });
}

export function useAblyRealtimeChannel(
  channelName: string,
  channelOptions?: ably.Types.ChannelOptions,
) {
  return useAblyRealtime().channels.get(channelName, channelOptions);
}

export function useAblyRealtimeChannelSubscribe(
  channelName: string,
  channelOptions?: ably.Types.ChannelOptions,
) {
  const channel = useAblyRealtimeChannel(channelName, channelOptions);

  createEffect(() => {
    channel.subscribe.
  });
}

export type AblyRealtimePublishCallback<T> =
  (name: string, messages: T, options?: ably.Types.PublishOptions) => Promise<void>;

export function useAblyRealtimePublish<T>(
  channelName: string,
  channelOptions?: ably.Types.ChannelOptions,
): AblyRealtimePublishCallback<T> {
  const channel = useAblyRealtimeChannel(channelName, channelOptions);

  return (name, messages, options) => channel.publish(name, messages, options);
}
