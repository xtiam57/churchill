import React, { useState, useEffect } from 'react';
import { useChannel } from 'hooks';
import { Presenter } from 'components/presenter';
import { Wrapper } from 'components/wrapper';
import { Logo } from 'components/logo';

export default function Cast() {
  const channel = useChannel();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    channel.onmessage = (message) => setCast(message.data);
    return () => channel.close();
  }, [channel]);

  console.log(cast);

  return (
    <Wrapper bare centered>
      {cast ? <Presenter cite={cast.cite}>{cast.text}</Presenter> : <Logo />}
    </Wrapper>
  );
}
