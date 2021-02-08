import { useContext } from 'react';
import { ScripturesContext } from 'providers/scriptures';

export function useVerse() {
  const { scriptures, verse, setVerse } = useContext(ScripturesContext);
  return { scriptures, verse, setVerse };
}
