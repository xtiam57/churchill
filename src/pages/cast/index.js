import React from 'react';
import createPersistedState from 'use-persisted-state';

import { Presenter } from 'components/presenter';
import { Wrapper } from 'components/wrapper';
import { Logo } from 'components/logo';

import { BROADCAST } from 'values';

const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useSettings = createPersistedState(BROADCAST.SETTINGS);

export default function CastView() {
  const [message] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);

  // Override zoom value
  settings.zoom = 1;

  return (
    <Wrapper bare centered {...settings}>
      {message ? (
        <Presenter
          id={message.id}
          subtext={message.subtext || message.cite}
          {...settings}
        >
          {message.text}
        </Presenter>
      ) : (
        <Logo width="65%" height="65%" {...settings} />
      )}
    </Wrapper>
  );
}
