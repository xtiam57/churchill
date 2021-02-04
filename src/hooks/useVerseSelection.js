import { useContext } from 'react';
import { ScripturesContext } from 'providers/scriptures';

export function useVerseSelection() {
  const { verseSelection, setVerseSelection } = useContext(ScripturesContext);
  return { verseSelection, setVerseSelection };
}
