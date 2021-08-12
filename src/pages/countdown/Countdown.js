import React from 'react';

import { useCountdown } from 'hooks';

export default function StopwatchPage() {
  const time = useCountdown(1);

  return <h1>{time}</h1>;
}
