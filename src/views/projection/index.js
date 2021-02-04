import React from 'react';
import { useBroadcastChannel } from 'hooks';
import { Preview } from 'components/preview';

export default function Projection() {
  const [cast] = useBroadcastChannel('cast', {});
  return <Preview text={cast.text} cite={cast.cite} neat></Preview>;
}
