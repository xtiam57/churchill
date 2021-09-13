import React, { useState, useMemo } from 'react';
import json from 'assets/data/anthemns';
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
  const MAX_LINES_PER_SLIDE = 5;
  const XXX = 8;
  const MAX_WORDS_PER_SLIDE = 30;
  const MAX_CHARS_PER_LINE = 30;
  const lines = text.split('/n');
  const count = lines.length;
  const chars = lines.map(getSizes);
  const words = lines.map(getWords);
  const totalWords = words.reduce((acc, act) => acc + act, 0);
  // const totalChars = chars.reduce((acc, act) => acc + act, 0);
  const itFitsChars = chars.every((value) => value <= MAX_CHARS_PER_LINE);
  const itFitsWords = words.every((value) => value <= XXX);

  // (6-8 lines per slide, no more than 30 words per slide).

  // if (
  //   id === 'A364' ||
  //   id === 'A510' ||
  //   id === 'A638' ||
  //   id === 'A622' ||
  //   id === 'A474' ||
  //   id === 'A638' ||
  //   id === 'A600' ||
  //   id === 'A641'
  // ) {
  //   console.log(
  //     id,
  //     lines,
  //     chars,
  //     words,
  //     count,
  //     totalWords,
  //     totalChars,
  //     itFitsChars
  //   );
  // }

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

  // if (count <= 5) {
  //   if (accum <= 140) {
  //     array.push(
  //       Slide.create({
  //         id: `${id}_${index}`,
  //         title,
  //         text: text,
  //         index: index++,
  //       })
  //     );
  //   } else {
  //     index = split(lines, array, id, index, title, 2);
  //   }
  // } else {
  //   if (accum <= 140) {
  //     index = split(lines, array, id, index, title, 4);
  //   } else {
  //     index = split(lines, array, id, index, title, 2);
  //   }
  // }

  // array.push(
  //   Slide.create({
  //     id: `${id}_${index}`,
  //     title,
  //     text: text,
  //     index: index++,
  //   })
  // );

  // if (itFit) {
  //   array.push(
  //     Slide.create({
  //       id: `${id}_${index}`,
  //       title,
  //       text: text,
  //       index: index++,
  //     })
  //   );
  // } else {
  // const DIVIDER = 2;
  // let iteration = 0;
  // let c = 0;
  // while (c < count) {
  //   const from = iteration * DIVIDER;
  //   const to = Math.min(from + DIVIDER, lines.length);
  //   array.push(
  //     Slide.create({
  //       id: `${id}_${index}`,
  //       index: index++,
  //       title: iteration === 0 ? title : null,
  //       text: lines.slice(from, to).join('/n'),
  //     })
  //   );
  //   iteration++;
  //   c += to - from;
  // }
  // }

  // if (count > 4) {
  //   if (accum <= 140) {
  //     array.push(
  //       Slide.create({
  //         id: `${id}_${index}`,
  //         title,
  //         text: text,
  //         index: index++,
  //       })
  //     );
  //   }
  // }

  // if (accum <= 140) {
  //   array.push(
  //     Slide.create({
  //       id: `${id}_${index}`,
  //       title,
  //       text: text,
  //       index: index++,
  //     })
  //   );
  // } else {
  // if (lines.length > 5) {
  //   const divider = lines.length > 10 ? 3 : 2;
  //   const size = Math.ceil(lines.length / divider);
  //   [...Array(divider).keys()].forEach((i) => {
  //     array.push(
  //       Slide.create({
  //         id: `${id}_${index}`,
  //         title: i === 0 ? title : null,
  //         text: lines.slice(i * size, (1 + i) * size).join('/n'),
  //         index: index++,
  //       })
  //     );
  //   });
  // } else {
  //   array.push(
  //     Slide.create({
  //       id: `${id}_${index}`,
  //       title,
  //       text: text,
  //       index: index++,
  //     })
  //   );
  // }
  // }

  // const length = text.length - lines.length - 1 - 3;

  // const DIVIDER = 2;
  // const THRESHOLD = 150;
  // let iteration = 0;
  // let count = 0;

  // if (length <= THRESHOLD) {
  //   const slide = Slide.create({
  //     id: `${id}_${index}`,
  //     index: index++,
  //     title,
  //     text,
  //   });

  //   array.push(slide);

  //   return index;
  // }

  // while (count < lines.length) {
  //   const from = iteration * DIVIDER;
  //   const to = Math.min(from + DIVIDER, lines.length);

  //   const slide = Slide.create({
  //     id: `${id}_${index}`,
  //     index: index++,
  //     title: iteration === 0 ? title : null,
  //     text: lines.slice(from, to).join('/n'),
  //   });

  //   array.push(slide);
  //   iteration++;
  //   count += to - from;
  // }

  return index;
}

function AnthemnsProvider({ children }) {
  const tagsSet = useMemo(() => new Set(), []);

  const anthemns = useMemo(() => {
    return json.map(
      (
        { number, title, startsWithChorus, chorus, stanzas, tags, authors },
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
