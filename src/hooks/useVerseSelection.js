import { useContext } from 'react';
import { VerseSelectionContext } from 'providers/verseSelection';

export function useVerseSelection() {
  const { verseSelection, setVerseSelection } = useContext(
    VerseSelectionContext
  );
  return { verseSelection, setVerseSelection };
}
