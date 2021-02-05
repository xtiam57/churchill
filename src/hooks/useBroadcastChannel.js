import { useContext } from 'react';
import { BroadcastContext } from 'providers/broadcast';

export function useBroadcastChannel() {
  const { value, postMessage } = useContext(BroadcastContext);
  return [value, postMessage];
}
