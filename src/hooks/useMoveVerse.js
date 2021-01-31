import { useContext } from 'react';
import { ScripturesContext } from 'providers/scriptures';

export function useMoveVerse() {
  const { scriptures, verse, setVerse, totalVerses } = useContext(
    ScripturesContext
  );

  const {
    index,
    bookNumber,
    chaptersCount,
    nextBookNumber,
    prevBookNumber,
    nextChapterNumber,
    prevChapterNumber,
  } = verse;

  const nextBook = () => {
    const verseToGo = scriptures.find((v) => v.bookNumber === nextBookNumber);

    setVerse(verseToGo);

    return verseToGo;
  };

  const prevBook = () => {
    const verseToGo = scriptures.find((v) => v.bookNumber === prevBookNumber);

    setVerse(verseToGo);

    return verseToGo;
  };

  const nextChapter = () => {
    let verseToGo;

    // Paso a otro libro
    if (nextChapterNumber > chaptersCount) {
      if (nextBookNumber !== bookNumber) {
        verseToGo = scriptures.find((v) => v.bookNumber === nextBookNumber);
      } else {
        // Apocalipsis 22:X
        verseToGo = verse;
      }
    } else {
      // Mismo libro
      verseToGo = scriptures.find(
        (v) =>
          v.bookNumber === bookNumber && v.chapterNumber === nextChapterNumber
      );
    }

    setVerse(verseToGo);

    return verseToGo;
  };

  const prevChapter = () => {
    let verseToGo;

    // Paso a otro libro
    if (prevChapterNumber < 1) {
      if (prevBookNumber !== bookNumber) {
        verseToGo = scriptures
          .filter((v) => v.bookNumber === prevBookNumber && v.verseNumber === 1)
          .pop();
      } else {
        // Genesis 1:X
        verseToGo = verse;
      }
    } else {
      // Mismo libro
      verseToGo = scriptures.find(
        (v) =>
          v.bookNumber === bookNumber && v.chapterNumber === prevChapterNumber
      );
    }

    setVerse(verseToGo);

    return verseToGo;
  };

  const nextVerse = () => {
    const i = Math.min(index + 1, totalVerses - 1);
    const verseToGo = scriptures[i];

    setVerse(verseToGo);

    return verseToGo;
  };

  const prevVerse = () => {
    const i = Math.max(index - 1, 0);
    const verseToGo = scriptures[i];

    setVerse(verseToGo);

    return verseToGo;
  };

  return { nextBook, nextChapter, nextVerse, prevBook, prevChapter, prevVerse };
}
