import React, { useState } from 'react';
import json from 'assets/data/bible/_index';

const ScripturesContext = React.createContext({});

function ScripturesProvider({ children }) {
  const [scriptures] = useState(() => {
    let index = 0;

    const data = json.map((entry) => {
      return {
        ...entry,
        content: require(`assets/data/bible/${entry.key}.json`),
      };
    });

    return data.reduce((result, book) => {
      const chapters = book.content.map((chapter, chapterIndex) => {
        const verses = chapter.map((verse, verseIndex) => {
          return {
            index: index++,
            cite: `${book.shortTitle} ${chapterIndex + 1}:${verseIndex + 1}`,
            text: verse.replaceAll('/n', '<br/>'),

            bookNumber: book.number,
            chapterNumber: chapterIndex + 1,
            verseNumber: verseIndex + 1,
            chaptersCount: book.chapters,
            versesCount: book.verses,

            nextBookNumber: Math.min(book.number + 1, 66),
            prevBookNumber: Math.max(book.number - 1, 1),
            nextChapterNumber: chapterIndex + 2,
            prevChapterNumber: chapterIndex,
          };
        });

        return verses;
      });

      chapters.forEach((chapter) => {
        result.push(...chapter);
      });

      return result;
    }, []);
  });

  const totalVerses = scriptures.length;
  const [first] = scriptures;
  const [verse, setVerse] = useState(first);

  return (
    <ScripturesContext.Provider
      value={{ scriptures, verse, setVerse, totalVerses }}
    >
      {children}
    </ScripturesContext.Provider>
  );
}

export { ScripturesProvider, ScripturesContext };
