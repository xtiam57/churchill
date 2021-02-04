import React, { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

import { Wrapper } from 'components/wrapper';
import { Preview } from 'components/preview';
import { Controls } from 'components/controls';
import { Sidebar } from 'components/sidebar';
import {
  useScriptures,
  useVerse,
  useVerseSelection,
  useMoveVerse,
  useBroadcastChannel,
} from 'hooks';

function ScripturesView() {
  const verses = useScriptures();
  const { verse, setVerse } = useVerse();
  const { verseSelection, setVerseSelection } = useVerseSelection();
  const { nextChapter, prevChapter, nextVerse, prevVerse } = useMoveVerse();
  const [cast, setCast] = useBroadcastChannel('cast', verse);

  const [win, setWin] = useState(null);

  const onTypeaheadChange = (event) => {
    setVerseSelection(event);
    if (event.length) {
      setVerse(...event);
      setCast(...event);
    }
  };

  const onLeft = () => {
    const verse = prevVerse();
    setVerseSelection([verse]);
    setCast(verse);
  };

  const onRight = () => {
    const verse = nextVerse();
    setVerseSelection([verse]);
    setCast(verse);
  };

  const onUp = () => {
    const verse = nextChapter();
    setVerseSelection([verse]);
    setCast(verse);
  };

  const onDown = () => {
    const verse = prevChapter();
    setVerseSelection([verse]);
    setCast(verse);
  };

  const open = () => {
    if (win) {
      return;
    }

    const electron = window.require('electron');
    const remote = electron.remote;
    const { BrowserWindow, screen, app } = remote;
    const [parent] = BrowserWindow.getAllWindows();
    let url = parent.webContents.getURL();

    app.whenReady().then(() => {
      const displays = screen.getAllDisplays();
      const externalDisplay = displays.find(
        ({ bounds }) => bounds.x !== 0 || bounds.y !== 0
      );

      if (externalDisplay) {
        let win = new BrowserWindow({
          x: externalDisplay.bounds.x + 50,
          y: externalDisplay.bounds.y + 50,
          frame: false,
          fullscreen: true,
          show: false,
          parent,
        });

        win.loadURL(url.replace(/#.*$/, '#/proyeccion'));
        win.once('ready-to-show', () => win.show());

        setWin(win);
      }
    });
  };

  const close = () => {
    if (win) {
      win.close();
      setWin(null);
    }
  };

  return (
    <Wrapper>
      <Sidebar>
        <Typeahead
          id="combo"
          options={verses}
          paginate={false}
          labelKey="cite"
          onFocus={(e) => e.target.select()}
          placeholder="Selecciona un versículo..."
          size="large"
          minLength={0}
          highlightOnlyResult={true}
          onChange={onTypeaheadChange}
          paginationText="Ver más opciones..."
          emptyLabel="No existe esa opcion."
          selected={verseSelection}
        />

        <button onClick={open}>Abrir</button>
        <button onClick={close}>Cerrar</button>
      </Sidebar>

      <Preview text={verse.text} cite={verse.cite}>
        <Controls
          onLeft={onLeft}
          onRight={onRight}
          onUp={onUp}
          onDown={onDown}
        />
      </Preview>
    </Wrapper>
  );
}

export default ScripturesView;
