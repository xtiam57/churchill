import { useEffect, useState } from 'react';

export const useBroadcastChannel = (channelName, defaultValue) => {
  // Initialize state
  const [value, setValue] = useState(defaultValue);
  const [channel, setChannel] = useState(new BroadcastChannel(channelName));

  // Channel setup
  useEffect(() => {
    let curChannel = channel;

    // A different channel was requested at runtime
    if (curChannel.name !== channelName) {
      curChannel = new BroadcastChannel(channelName);
      setChannel(curChannel);
    }

    // Request current state from peers
    curChannel.postMessage({ type: 'NEW_CONNECTION' });

    // Cleanup function for unmount
    // return () => curChannel.close();
  }, [channel, channelName]);

  // Handle new messages
  useEffect(() => {
    channel.onmessage = (e) => {
      switch (e.data.type) {
        case 'NEW_CONNECTION':
          channel.postMessage({ type: 'UPDATE', payload: value });
          break;
        default:
          setValue(e.data.payload);
          break;
      }
    };
  }, [channel, value]);

  const postMessage = (payload) => {
    // Update local state
    setValue(payload);

    // Send new state to peers
    channel.postMessage({ type: 'UPDATE', payload });
  };

  return [value, postMessage];
};
