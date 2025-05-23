import { BakcgroundAudioContext } from 'providers/BackgroundAudioProvider';
import { useContext } from 'react';

const UseBackgroundaudio = () => {
  const { localUrl, isReady, setIndex } = useContext(BakcgroundAudioContext);
  return <div></div>;
};

export default UseBackgroundaudio;
