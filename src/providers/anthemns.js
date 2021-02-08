import React, { useState, useMemo } from 'react';
import json from 'assets/data/anthemns';

const AnthemnsContext = React.createContext({});

function makeSlide(title = null, text, index = 0) {
  title = title ? `<strong>${title}</strong>/n` : '';
  text = `${title}${text}`.replaceAll('/n', '<br/>');
  return {
    index,
    text,
  };
}

function AnthemnsProvider({ children }) {
  const anthemns = useMemo(() => {
    return json.map(
      ({ number, title, startsWithChorus, chorus, stanzas, tags }, index) => {
        const slides = [];
        let slideIndex = 0;
        const isNotAnthemn = tags?.includes('coro');
        const isExtra = tags?.includes('extra');

        slides.push(
          makeSlide(
            `${isNotAnthemn ? 'Coro' : `Himno${isExtra ? '' : ` #${number}`}`}`,
            title,
            slideIndex++
          )
        );

        if (startsWithChorus) {
          slides.push(makeSlide('Coro', chorus, slideIndex++));
        }

        stanzas.forEach((stanza) => {
          slides.push(makeSlide(null, stanza, slideIndex++));

          if (chorus) {
            slides.push(makeSlide('Coro', chorus, slideIndex++));
          }
        });

        slides.push(makeSlide(null, 'AMÉN.', slideIndex++));

        return {
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
      }}
    >
      {children}
    </AnthemnsContext.Provider>
  );
}

export { AnthemnsProvider, AnthemnsContext };
