import { useContext } from 'react';
import { ScripturesContext } from 'providers/scriptures';
import { useIterate } from 'hooks';

export function useMoveVerse() {
  const { scriptures, verse, setVerse } = useContext(ScripturesContext);

  const {
    bookNumber,
    chaptersCount,
    nextBookNumber,
    prevBookNumber,
    nextChapterNumber,
    prevChapterNumber,
  } = verse;

  const [move] = useIterate(verse, scriptures);

  const moveToNextBook = () => {
    const verseToGo = scriptures.find((v) => v.bookNumber === nextBookNumber);

    setVerse(verseToGo);

    return verseToGo;
  };

  const moveToPrevBook = () => {
    const verseToGo = scriptures.find((v) => v.bookNumber === prevBookNumber);

    setVerse(verseToGo);

    return verseToGo;
  };

  const moveToNextChapter = () => {
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

  const moveToPrevChapter = () => {
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

  const moveToNextVerse = () => {
    const verseToGo = move(1);

    setVerse(verseToGo);

    return verseToGo;
  };

  const moveToPrevVerse = () => {
    const verseToGo = move(-1);

    setVerse(verseToGo);

    return verseToGo;
  };

  const moveBook = (inc = 1) => {
    return inc > 0 ? moveToNextBook() : moveToPrevBook();
  };

  const moveChapter = (inc = 1) => {
    return inc > 0 ? moveToNextChapter() : moveToPrevChapter();
  };

  const moveVerse = (inc = 1) => {
    return inc > 0 ? moveToNextVerse() : moveToPrevVerse();
  };

  return {
    moveToNextBook,
    moveToNextChapter,
    moveToNextVerse,
    moveToPrevBook,
    moveToPrevChapter,
    moveToPrevVerse,
    moveBook,
    moveChapter,
    moveVerse,
  };
}
