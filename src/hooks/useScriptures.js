import { useContext } from 'react';
import { ScripturesContext } from 'providers/scriptures';

export function useScriptures() {
  const { scriptures, verse, setVerse } = useContext(ScripturesContext);
  return { scriptures, verse, setVerse };
}
