import React, { useState, useMemo } from 'react';
import json from 'assets/data/bible';

const ScripturesContext = React.createContext({});

function ScripturesProvider({ children }) {
  const scriptures = useMemo(() => {
    let index = 0;

    const data = json.map((entry) => {
      return {
        ...entry,
        content: require(`assets/data/bible/${entry.key}.json`),
      };
    });

    return data.reduce((verses, book) => {
      const chaptersExpanded = book.content.map((chapter, chapterIndex) => {
        return chapter.map((verse, verseIndex) => {
          return {
            id: `V${book.number}_${chapterIndex + 1}_${verseIndex + 1}`,
            // Verse data
            index: index++,
            title: `${book.shortTitle} ${chapterIndex + 1}:${verseIndex + 1}`,
            text: verse.replaceAll('/n', '<br/>'),
            subtext: `${book.shortTitle} ${chapterIndex + 1}:${verseIndex + 1}`,
            type: 'verse',
            // Metadata
            bookNumber: book.number,
            chapterNumber: chapterIndex + 1,
            verseNumber: verseIndex + 1,
            chaptersCount: book.chapters,
            versesCount: book.verses,
            // Next and prev data
            nextBookNumber: Math.min(book.number + 1, 66),
            prevBookNumber: Math.max(book.number - 1, 1),
            nextChapterNumber: chapterIndex + 2,
            prevChapterNumber: chapterIndex,
            length: verse.replaceAll('/n', '').length,
          };
        });
      });

      chaptersExpanded.forEach((chapterExpanded) => {
        verses.push(...chapterExpanded);
      });

      return verses;
    }, []);
  }, []);

  const [first] = scriptures;
  const [current, setCurrent] = useState(first);
  const [largerVerse] = useState(scriptures[12825]); // Ester 8:9

  return (
    <ScripturesContext.Provider
      value={{
        scriptures,
        current,
        setCurrent,
        largerVerse,
      }}
    >
      {children}
    </ScripturesContext.Provider>
  );
}

export { ScripturesProvider, ScripturesContext };
