import React, { useState, useEffect } from 'react';
import { useChannel } from 'hooks';
import { Presenter } from 'components/presenter';
import { Wrapper } from 'components/wrapper';
import { Logo } from 'components/logo';

export default function Cast() {
  const channel = useChannel();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    channel.onmessage = (message) => setMessage(message.data);
    return () => channel.close();
  }, [channel]);

  console.log(message);

  return (
    <Wrapper bare centered>
      {message ? (
        <Presenter cite={message.cite}>{message.text}</Presenter>
      ) : (
        <Logo width="65%" height="65%" />
      )}
    </Wrapper>
  );
}
