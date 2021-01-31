import { useContext } from 'react';
import { ScripturesContext } from 'providers/scriptures';

export function useVerse() {
  const { verse, setVerse } = useContext(ScripturesContext);
  return { verse, setVerse };
}
