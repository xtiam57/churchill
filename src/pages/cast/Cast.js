import React from 'react';
import createPersistedState from 'use-persisted-state';

import { Presenter, Wrapper, Logo } from 'components';
import { BROADCAST } from 'values';

const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useSettings = createPersistedState(BROADCAST.SETTINGS);

export default function CastPage() {
  const [message] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);

  return (
    <Wrapper bare centered {...settings}>
      {message ? (
        <Presenter
          id={message.id}
          text={message.text}
          subtext={message.subtext}
          {...settings}
        />
      ) : (
        <>
          <Logo width="60%" height="60%" {...settings} />

          {/* <div className="time">
            {new Date().toLocaleTimeString('en-us', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div> */}
        </>
      )}
    </Wrapper>
  );
}
