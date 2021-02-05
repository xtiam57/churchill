import { useMemo } from 'react';
import { CHANNEL_NAME } from 'values';

export function useChannel() {
  const channel = useMemo(() => new BroadcastChannel(CHANNEL_NAME), []);
  return channel;
}
