import React, { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup } from 'react-bootstrap';

import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';
import { MdCast, MdCastConnected } from 'react-icons/md';

import { Wrapper } from 'components/wrapper';
import { Presenter } from 'components/presenter';
import { Controls } from 'components/controls';
import { Sidebar } from 'components/sidebar';
import {
  useScriptures,
  useVerse,
  useVerseSelection,
  useMoveVerse,
  useBroadcastChannel,
} from 'hooks';
import { CAST_VIEW_PATH } from 'values';

function ScripturesView() {
  const verses = useScriptures();
  const { verse, setVerse } = useVerse();
  const { verseSelection, setVerseSelection } = useVerseSelection();
  const { nextChapter, prevChapter, nextVerse, prevVerse } = useMoveVerse();
  const [cast, setCast] = useBroadcastChannel(verse);

  const [win, setWin] = useState(null);

  // useEffect(() => {
  //   setCast(verse);
  // }, []);

  const onTypeaheadChange = (event) => {
    setVerseSelection(event);
    if (event.length) {
      setVerse(...event);
      setCast(...event);
    }
  };

  const onPrevVerse = () => {
    const verse = prevVerse();
    setVerseSelection([verse]);
    setCast(verse);
  };

  const onNextVerse = () => {
    const verse = nextVerse();
    setVerseSelection([verse]);
    setCast(verse);
  };

  const onNextChapter = () => {
    const verse = nextChapter();
    setVerseSelection([verse]);
    setCast(verse);
  };

  const onPrevChapter = () => {
    const verse = prevChapter();
    setVerseSelection([verse]);
    setCast(verse);
  };

  const open = () => {
    if (win) {
      win.close();
      setWin(null);
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

        win.loadURL(url.replace(/#.*$/, `#${CAST_VIEW_PATH}`));
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
      </Sidebar>

      <Wrapper direction="column">
        <Presenter cite={verse.cite} live={win}>
          {verse.text}
        </Presenter>

        <Controls
          onKeyLeft={onPrevVerse}
          onKeyRight={onNextVerse}
          onKeyUp={onNextChapter}
          onKeyDown={onPrevChapter}
          onKeyEscape={close}
        >
          <ButtonGroup className="mr-2">
            <Button onClick={onPrevVerse} variant="secondary" className="">
              <ImArrowLeft2 />
            </Button>

            <Button onClick={onNextVerse} variant="secondary" className="">
              <ImArrowRight2 />
            </Button>
          </ButtonGroup>

          <Button onClick={open} variant={win ? 'warning' : 'secondary'}>
            {win ? <MdCastConnected /> : <MdCast />}
          </Button>
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}

export default ScripturesView;
