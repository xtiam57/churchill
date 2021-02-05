import React, { useEffect, useState, useCallback } from 'react';

const BroadcastContext = React.createContext({});

const BroadcastProvider = ({ children }) => {
  // Initialize state
  const [value, setValue] = useState({});
  const [channel, setChannel] = useState(new BroadcastChannel('cast'));

  // Channel setup
  useEffect(() => {
    // let curChannel = channel;

    // // A different channel was requested at runtime
    // if (curChannel.name !== channelName) {
    //   curChannel = new BroadcastChannel(channelName);
    //   setChannel(curChannel);
    // }

    // Request current state from peers
    channel.postMessage({ type: 'NEW_CONNECTION' });

    console.log('channel');

    // Cleanup function for unmount
    return () => channel.close();
  }, [channel]);

  // Handle new messages
  useEffect(() => {
    channel.onmessage = (e) => {
      // setValue(e.data);
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
    // // Update local state
    setValue(payload);

    // Send new state to peers
    channel.postMessage({ type: 'UPDATE', payload });
  };

  return (
    <BroadcastContext.Provider
      value={{
        value,
        postMessage,
      }}
    >
      {children}
    </BroadcastContext.Provider>
  );
};

export { BroadcastContext, BroadcastProvider };
