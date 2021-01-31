import { useContext } from 'react';
import { ScripturesContext } from 'providers/scriptures';

export function useScriptures() {
  const { scriptures } = useContext(ScripturesContext);
  return scriptures;
}
