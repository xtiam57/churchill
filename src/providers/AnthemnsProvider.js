import json from 'assets/data/anthemns';
import React, { useMemo, useState } from 'react';
import { Slide } from 'utils';

const AnthemnsContext = React.createContext({});

function getSizes(text) {
  const len = text
    .replace('1)', '')
    .replace('2)', '')
    .replace('3)', '')
    .replace('4)', '')
    .replace('5)', '')
    .replace('6)', '')
    .replace('7)', '')
    .replace('8)', '')
    .replace('9)', '')
    .replace('10)', '')
    .trim().length;
  const specialCharts = (text.match(/\.|,|;|!|¡|¿|\?/gi) || []).length;

  return len - specialCharts;
}

function getWords(text) {
  const str = text
    .replace('1)', '')
    .replace('2)', '')
    .replace('3)', '')
    .replace('4)', '')
    .replace('5)', '')
    .replace('6)', '')
    .replace('7)', '')
    .replace('8)', '')
    .replace('9)', '')
    .replace('10)', '')
    .replace('/', '')
    .trim();

  return str.split(' ').length;
}

function split(lines, array, id, index, title, divider = 2) {
  let iteration = 0;
  let c = 0;

  while (c < lines.length) {
    const from = iteration * divider;
    const to = Math.min(from + divider, lines.length);
    array.push(
      Slide.create({
        id: `${id}_${index}`,
        index: index++,
        title: iteration === 0 ? title : null,
        text: lines.slice(from, to).join('/n'),
      })
    );
    iteration++;
    c += to - from;
  }
  return index;
}

function splitLines(id, title, text, array, index) {
  // (6-8 lines per slide, no more than 30 words per slide).

  const MAX_LINES_PER_SLIDE = 5;
  const FIT_WORDS = 8;
  const MAX_WORDS_PER_SLIDE = 30;
  const FIT_CHARS = 30;
  const lines = text.split('/n');
  const count = lines.length;
  const chars = lines.map(getSizes);
  const words = lines.map(getWords);
  const totalWords = words.reduce((acc, act) => acc + act, 0);
  // const totalChars = chars.reduce((acc, act) => acc + act, 0);
  const itFitsChars = chars.every((value) => value <= FIT_CHARS);
  const itFitsWords = words.every((value) => value <= FIT_WORDS);

  if (count <= MAX_LINES_PER_SLIDE) {
    if (itFitsChars) {
      array.push(
        Slide.create({
          id: `${id}_${index}`,
          title,
          text: text,
          index: index++,
        })
      );
    } else {
      index = split(lines, array, id, index, title, 2);
    }
  } else {
    if (totalWords <= MAX_WORDS_PER_SLIDE) {
      index = split(lines, array, id, index, title, 4);
    } else {
      if (itFitsWords) {
        index = split(lines, array, id, index, title, 4);
      } else {
        index = split(lines, array, id, index, title, 2);
      }
    }
  }

  return index;
}

function AnthemnsProvider({ children }) {
  const tagsSet = useMemo(() => new Set(), []);

  const anthemns = useMemo(() => {
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
        },
        index
      ) => {
        const slides = [];
        const id = `A${number}`;
        let text = '';
        let slideIndex = 0;
        const isNotAnthemn = tags?.toLowerCase().includes('coro');
        // const isExtra = tags?.toLowerCase().includes('apéndice');

        if (tags) {
          tags
            ?.toLowerCase()
            .split(',')
            .forEach((tag) => tagsSet.add(tag));
        }

        slides.push(
          Slide.create({
            id: `${id}_${slideIndex}`,
            title: `${isNotAnthemn ? `Coro #${number}` : `Himno #${number}`}`,
            text: title,
            subtext: authors,
            index: slideIndex++,
          })
        );

        if (startsWithChorus) {
          slideIndex = splitLines(id, '(Coro)', chorus, slides, slideIndex);
        }

        stanzas.forEach((stanza, i) => {
          slideIndex = splitLines(id, null, stanza, slides, slideIndex);
          text += `${stanza} /n/n`;

          if (chorus) {
            slideIndex = splitLines(id, '(Coro)', chorus, slides, slideIndex);

            if (i === 0) {
              text += `(CORO) /n${chorus} /n/n`;
            }
          }
        });

        if (repeatChorusAtEnd) {
          slideIndex = splitLines(id, '(Coro)', chorus, slides, slideIndex);
        }

        slides.push(
          Slide.create({
            id: `${id}_${slideIndex}`,
            text: '&#119070;',
            subtext: '¡Amén!',
            index: slideIndex,
          })
        );

        return {
          id,
          index,
          number,
          title: `#${number} ${title}`,
          name: title,
          type: 'anthemn',
          slides,
          text,
          tags: tags?.toLowerCase(),
          authors,
          length: slides.length,
          firstSlide: slides[0],
          lastSlide: slides[slides.length - 1],
        };
      }
    );
  }, [tagsSet]);

  const [first] = anthemns;
  const [current, setCurrent] = useState(first);
  const [tags] = useState(Array.from(tagsSet).sort());

  return (
    <AnthemnsContext.Provider
      value={{
        anthemns,
        current,
        setCurrent,
        tags,
      }}
    >
      {children}
    </AnthemnsContext.Provider>
  );
}

export { AnthemnsProvider, AnthemnsContext };
