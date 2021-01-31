import React, { useEffect, useCallback } from 'react';
import { useMoveVerse, useVerseSelection } from 'hooks';
import { Button, ButtonGroup } from 'react-bootstrap';

const Actions = {
  NEXT_BOOK: 1,
  PREV_BOOK: 2,
  NEXT_CHAPTER: 3,
  PREV_CHAPTER: 4,
  NEXT_VERSE: 5,
  PREV_VERSE: 6,
};

export default function Controls() {
  const { setVerseSelection } = useVerseSelection();

  const {
    nextBook,
    prevBook,
    nextChapter,
    prevChapter,
    nextVerse,
    prevVerse,
  } = useMoveVerse();

  const onClick = useCallback(
    (action) => {
      let verse = {};

      switch (action) {
        case Actions.NEXT_VERSE:
          verse = nextVerse();
          break;
        case Actions.PREV_VERSE:
          verse = prevVerse();
          break;
        case Actions.NEXT_CHAPTER:
          verse = nextChapter();
          break;
        case Actions.PREV_CHAPTER:
          verse = prevChapter();
          break;
        case Actions.NEXT_BOOK:
          verse = nextBook();
          break;
        case Actions.PREV_BOOK:
          verse = prevBook();
          break;
        default:
      }

      setVerseSelection([verse]);
    },
    [
      nextVerse,
      prevVerse,
      nextChapter,
      prevChapter,
      nextBook,
      prevBook,
      setVerseSelection,
    ]
  );

  const handleKeyDown = useCallback(
    (event) => {
      const key = event.keyCode || event.charCode || 0;
      const RIGHT_ARROW = 39;
      const LEFT_ARROW = 37;

      const inputs = document.querySelectorAll('input');
      const isFocused = [...inputs].some((el) => el === document.activeElement);

      if (key === RIGHT_ARROW && !isFocused) {
        onClick(Actions.NEXT_VERSE);
      }

      if (key === LEFT_ARROW && !isFocused) {
        onClick(Actions.PREV_VERSE);
      }
    },
    [onClick]
  );

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <ButtonGroup>
        <Button variant="primary" onClick={() => onClick(Actions.PREV_VERSE)}>
          Versículo Anterior
        </Button>
        <Button variant="primary" onClick={() => onClick(Actions.NEXT_VERSE)}>
          Siguiente Versículo
        </Button>

        <Button variant="warning" onClick={() => onClick(Actions.PREV_CHAPTER)}>
          Capítulo Anterior
        </Button>
        <Button variant="warning" onClick={() => onClick(Actions.NEXT_CHAPTER)}>
          Siguiente Capítulo
        </Button>

        <Button variant="info" onClick={() => onClick(Actions.PREV_BOOK)}>
          Libro Anterior
        </Button>
        <Button variant="info" onClick={() => onClick(Actions.NEXT_BOOK)}>
          Siguiente Libro
        </Button>
      </ButtonGroup>
    </>
  );
}
