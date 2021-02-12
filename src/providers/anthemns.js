import React, { useState, useMemo } from 'react';
import json from 'assets/data/anthemns';
import { Slide } from 'utils';

const AnthemnsContext = React.createContext({});

function splitLines(title, text, array, index) {
  const lines = text.split('/n');

  if (lines.length > 5) {
    const divider = lines.length > 10 ? 3 : 2;
    const size = Math.ceil(lines.length / divider);

    [...Array(divider).keys()].forEach((i) => {
      array.push(
        Slide.create({
          title: i === 0 ? title : null,
          text: lines.slice(i * size, (1 + i) * size).join('/n'),
          index: index++,
        })
      );
    });
  } else {
    array.push(
      Slide.create({
        title,
        text: text,
        index: index++,
      })
    );
  }
  return index;
}

function AnthemnsProvider({ children }) {
  const anthemns = useMemo(() => {
    return json.map(
      ({ number, title, startsWithChorus, chorus, stanzas, tags }, index) => {
        const slides = [];
        let slideIndex = 0;
        const isNotAnthemn = tags?.toLowerCase().includes('coro');
        const isExtra = tags?.toLowerCase().includes('extra');

        slides.push(
          Slide.create({
            title: `${
              isNotAnthemn ? 'Coro' : `Himno${isExtra ? '' : ` #${number}`}`
            }`,
            text: title,
            index: slideIndex++,
          })
        );

        if (startsWithChorus) {
          slideIndex = splitLines('Coro', chorus, slides, slideIndex);
        }

        stanzas.forEach((stanza) => {
          slideIndex = splitLines(null, stanza, slides, slideIndex);

          if (chorus) {
            slideIndex = splitLines('Coro', chorus, slides, slideIndex);
          }
        });

        slides.push(Slide.create({ text: '&#119070;', index: slideIndex }));

        return {
          id: `Himno_${number}`,
          index,
          number,
          title: `${isNotAnthemn || isExtra ? '' : `#${number} `}${title}`,
          type: 'anthemn',
          slides,
          tags,
          length: slides.length,
        };
      }
    );
  }, []);

  const folder = useMemo(() => {
    const { app, shell } = window.require('electron').remote;
    const { protocol } = window.location;
    const path = `${
      protocol === 'file:' ? app.getPath('userData') : ''
    }\\himnos`;
    return {
      open: () => shell.openPath(path),
      getPath: (file) => `${path}\\${file}.mp3`,
    };
  }, []);

  const total = anthemns.length;
  const [first] = anthemns;
  const [song, setSong] = useState(first);
  const [slide, setSlide] = useState(song.slides[0]);

  return (
    <AnthemnsContext.Provider
      value={{
        anthemns,
        song,
        setSong,
        total,
        slide,
        setSlide,
        folder,
      }}
    >
      {children}
    </AnthemnsContext.Provider>
  );
}

export { AnthemnsProvider, AnthemnsContext };
