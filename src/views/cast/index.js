import React from 'react';
import { useBroadcastChannel } from 'hooks';
import { Presenter } from 'components/presenter';
import { Wrapper } from 'components/wrapper';

export default function Cast() {
  const [cast] = useBroadcastChannel();
  const { text, cite, number } = cast;

  return (
    <Wrapper bare>
      <Presenter cite={cite}>{text}</Presenter>
    </Wrapper>
  );
}
