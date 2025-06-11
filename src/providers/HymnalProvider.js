import json from 'assets/data/hymnals';
import React, { useMemo, useState } from 'react';
import { Slide } from 'utils';

const HymnalContext = React.createContext({});

function getSizes(text) {
  const cleanText = text.replace(/\b(10|[1-9])\)/g, '').trim();
  const specialCharts = (cleanText.match(/[.,;!¡¿\?]/gi) || []).length;
  return cleanText.length - specialCharts;
}

function getWords(text) {
  const str = text
    .replace(/\b(10|[1-9])\)/g, '') // elimina 1) a 10)
    .replace(/\//g, '') // elimina todas las barras
    .trim();
  return str.split(' ').length;
}

function split(
  lines,
  array,
  id,
  book,
  index,
  title,
  divider = 2,
  isChorus = false
) {
  for (let i = 0; i < lines.length; i += divider) {
    array.push(
      Slide.create({
        id: `${id}_${index}`,
        index: index++,
        title: i === 0 ? title : null,
        text: lines.slice(i, i + divider).join('/n'),
        book,
        isChorus,
      })
    );
  }
  return index;
}

function splitLines(id, title, text, book, array, index, isChorus = false) {
  const MAX_LINES = 5,
    FIT_WORDS = 8,
    MAX_WORDS = 30,
    FIT_CHARS = 30;
  const lines = text.split('/n');
  const chars = lines.map(getSizes);
  const words = lines.map(getWords);
  const totalWords = words.reduce((a, b) => a + b, 0);
  const itFitsChars = chars.every((v) => v <= FIT_CHARS);
  const itFitsWords = words.every((v) => v <= FIT_WORDS);

  if (lines.length <= MAX_LINES && itFitsChars) {
    array.push(
      Slide.create({
        id: `${id}_${index}`,
        title,
        text,
        index: index++,
        book,
        isChorus,
      })
    );
  } else if (lines.length <= MAX_LINES) {
    index = split(lines, array, id, book, index, title, 2, isChorus);
  } else if (totalWords <= MAX_WORDS || itFitsWords) {
    index = split(lines, array, id, book, index, title, 4, isChorus);
  } else {
    index = split(lines, array, id, book, index, title, 2, isChorus);
  }

  return index;
}

function HymnalProvider({ children }) {
  const tagsSet = useMemo(() => new Set(), []);
  const booksSet = useMemo(() => new Set(), []);

  const hymnal = useMemo(() => {
    return json.map(
      (
        {
          number,
          title,
          startsWithChorus,
          repeatChorusAtEnd,
          chorus,
          stanzas,
          tags,
          authors,
          book,
        },
        index
      ) => {
        const slides = [];
        const id = `A${index}`;
        let text = '';
        let slideIndex = 0;
        const isNotHymn = book.toLowerCase().startsWith('corario');

        if (tags) {
          tags.split(',').forEach((tag) => tagsSet.add(tag));
        }

        if (book) {
          booksSet.add(book);
        }

        slides.push(
          Slide.create({
            id: `${id}_${slideIndex}`,
            title: `${isNotHymn ? `Coro #${number}` : `Himno #${number}`}`,
            text: title,
            book,
            index: slideIndex++,
          })
        );

        if (startsWithChorus) {
          text += `${chorus} /n/n`;
          slideIndex = splitLines(
            id,
            '(Coro)',
            chorus,
            null,
            slides,
            slideIndex,
            true
          );
        }

        stanzas.forEach((stanza, i) => {
          slideIndex = splitLines(id, null, stanza, null, slides, slideIndex);
          text += `${stanza} /n/n`;

          if (chorus) {
            slideIndex = splitLines(
              id,
              '(Coro)',
              chorus,
              null,
              slides,
              slideIndex,
              true
            );

            if (i === 0) {
              text += `(CORO) /n${chorus} /n/n`;
            }
          }
        });

        if (repeatChorusAtEnd) {
          text += chorus;
          slideIndex = splitLines(
            id,
            '(Coro)',
            chorus,
            null,
            slides,
            slideIndex,
            true
          );
        }

        slides.push(
          Slide.create({
            id: 'AEOHAmen',
            text: '&#119070;',
            subtext: '¡Amén!',
            index: slideIndex,
          })
        );

        return {
          id,
          index,
          reference: index + 1,
          number,
          title: `#${number} ${title}`,
          name: title,
          type: 'hymn',
          slides,
          text: text.endsWith('/n/n') ? text.slice(0, -4) : text,
          tags,
          authors,
          length: slides.length,
          book,
        };
      }
    );
  }, [booksSet, tagsSet]);

  const [first] = hymnal;
  const [current, setCurrent] = useState(first);
  const [tags] = useState(Array.from(tagsSet).sort());
  const [books] = useState(Array.from(booksSet).sort());

  return (
    <HymnalContext.Provider
      value={{
        hymnal,
        current,
        setCurrent,
        tags,
        books,
      }}
    >
      {children}
    </HymnalContext.Provider>
  );
}

export { HymnalContext, HymnalProvider };
