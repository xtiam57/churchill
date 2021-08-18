import { useContext } from 'react';
import { ScripturesContext } from 'providers';
import { useIterate } from 'hooks';
import { MOVEMENT } from 'values';

export function useScriptures() {
  const { scriptures, current, setCurrent, largerVerse } =
    useContext(ScripturesContext);

  const {
    bookNumber,
    chaptersCount,
    nextBookNumber,
    prevBookNumber,
    nextChapterNumber,
    prevChapterNumber,
  } = current;

  const [move] = useIterate(current, scriptures);

  const moveToNextBook = () => {
    const verseToGo = scriptures.find((v) => v.bookNumber === nextBookNumber);

    setCurrent(verseToGo);

    return verseToGo;
  };

  const moveToPrevBook = () => {
    const verseToGo = scriptures.find((v) => v.bookNumber === prevBookNumber);

    setCurrent(verseToGo);

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
        verseToGo = current;
      }
    } else {
      // Mismo libro
      verseToGo = scriptures.find(
        (v) =>
          v.bookNumber === bookNumber && v.chapterNumber === nextChapterNumber
      );
    }

    setCurrent(verseToGo);

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
        verseToGo = current;
      }
    } else {
      // Mismo libro
      verseToGo = scriptures.find(
        (v) =>
          v.bookNumber === bookNumber && v.chapterNumber === prevChapterNumber
      );
    }

    setCurrent(verseToGo);

    return verseToGo;
  };

  const moveToNextVerse = () => {
    const verseToGo = move(MOVEMENT.NEXT);

    setCurrent(verseToGo);

    return verseToGo;
  };

  const moveToPrevVerse = () => {
    const verseToGo = move(MOVEMENT.PREV);

    setCurrent(verseToGo);

    return verseToGo;
  };

  const moveBook = (action = MOVEMENT.NEXT) => {
    return action === MOVEMENT.NEXT ? moveToNextBook() : moveToPrevBook();
  };

  const moveChapter = (action = MOVEMENT.NEXT) => {
    return action === MOVEMENT.NEXT ? moveToNextChapter() : moveToPrevChapter();
  };

  const moveVerse = (action = MOVEMENT.NEXT) => {
    return action === MOVEMENT.NEXT ? moveToNextVerse() : moveToPrevVerse();
  };

  return {
    scriptures,
    current,
    setCurrent,
    moveBook,
    moveChapter,
    moveVerse,
    largerVerse,
  };
}
