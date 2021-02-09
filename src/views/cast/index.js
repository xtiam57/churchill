import React from 'react';
import createPersistedState from 'use-persisted-state';

import { Presenter } from 'components/presenter';
import { Wrapper } from 'components/wrapper';
import { Logo } from 'components/logo';

import { CHANNEL_NAME, SETTINGS_NAME, SETTINGS_INITIAL_STATE } from 'values';

const useBroadcast = createPersistedState(CHANNEL_NAME);
const useSettings = createPersistedState(SETTINGS_NAME);

export default function CastView() {
  const [message] = useBroadcast(null);
  const [settings] = useSettings(SETTINGS_INITIAL_STATE);

  return (
    <Wrapper bare centered type={message?.type} {...settings}>
      {message ? (
        <Presenter subtext={message.subtext || message.cite} {...settings}>
          {message.text}
        </Presenter>
      ) : (
        <Logo width="65%" height="65%" {...settings} />
      )}
    </Wrapper>
  );
}
