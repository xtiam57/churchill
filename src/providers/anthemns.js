import React, { useState, useMemo } from 'react';
import json from 'assets/data/anthemns';
import { Slide } from 'utils';

const AnthemnsContext = React.createContext({});

function splitLines(id, title, text, array, index) {
  const lines = text.split('/n');
  const length = text.length - lines.length - 1 - 3;

  const DIVIDER = 2;
  const THRESHOLD = 125;
  let iteration = 0;
  let count = 0;

  if (length <= THRESHOLD) {
    const slide = Slide.create({
      id: `${id}_${index}`,
      index: index++,
      title,
      text,
    });

    array.push(slide);

    return index;
  }

  while (count < lines.length) {
    const from = iteration * DIVIDER;
    const to = Math.min(from + DIVIDER, lines.length);

    const slide = Slide.create({
      id: `${id}_${index}`,
      index: index++,
      title: iteration === 0 ? title : null,
      text: lines.slice(from, to).join('/n'),
    });

    array.push(slide);
    iteration++;
    count += to - from;
  }

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
        const isExtra = tags?.toLowerCase().includes('apéndice');

        if (tags) {
          tags
            ?.toLowerCase()
            .split(',')
            .forEach((tag) => tagsSet.add(tag));
        }

        slides.push(
          Slide.create({
            id: `${id}_${slideIndex}`,
            title: `${
              isNotAnthemn ? `Coro #${number}` : `Himno #${number}`
              // : `${isExtra ? `Apéndice #${number}` : `Himno #${number}`}`
            }`,
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
