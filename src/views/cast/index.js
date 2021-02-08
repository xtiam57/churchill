import React, { useState, useEffect } from 'react';
import createPersistedState from 'use-persisted-state';

import { useChannel } from 'hooks';
import { Presenter } from 'components/presenter';
import { Wrapper } from 'components/wrapper';
import { Logo } from 'components/logo';

import { CHANNEL_NAME } from 'values';

const useBroadcast = createPersistedState(CHANNEL_NAME);

export default function CastView() {
  const [message, setMessage] = useBroadcast(null);

  console.log(message);

  return (
    <Wrapper bare centered type={message?.type}>
      {message ? (
        <Presenter subtext={message.subtext || message.cite}>
          {message.text}
        </Presenter>
      ) : (
        <Logo width="65%" height="65%" />
      )}
    </Wrapper>
  );
}
