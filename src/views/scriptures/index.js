import React, { useState, useEffect, useRef } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup, Alert } from 'react-bootstrap';

import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';
import { MdCast, MdCastConnected } from 'react-icons/md';

import { Wrapper } from 'components/wrapper';
import { Presenter } from 'components/presenter';
import { Controls } from 'components/controls';
import { Sidebar } from 'components/sidebar';
import {
  useScriptures,
  useVerse,
  useMoveVerse,
  usePresenter,
  useChannel,
} from 'hooks';

function ScripturesView() {
  const ref = useRef();
  const [showingLogo, setShowingLogo] = useState(true);
  const verses = useScriptures();
  const { verse, setVerse } = useVerse();
  const [verseSelection, setVerseSelection] = useState([verse]);
  const { nextChapter, prevChapter, nextVerse, prevVerse } = useMoveVerse();
  const { setLastBroadcast } = usePresenter();
  const channel = useChannel();

  useEffect(() => {
    return () => {
      setLastBroadcast(null);
      channel.postMessage(null);
      channel.close();
    };
  }, [channel, setLastBroadcast]);

  useEffect(() => {
    channel.postMessage(showingLogo ? null : verse);
    setLastBroadcast(showingLogo ? null : verse);
  }, [verse, channel, setLastBroadcast, showingLogo]);

  function onTypeaheadChange(event) {
    setVerseSelection(event);

    if (event.length) {
      setVerse(...event);
      ref.current.blur();
    }
  }

  const onPrevVerse = () => {
    const verse = prevVerse();
    setVerseSelection([verse]);
  };

  const onNextVerse = () => {
    const verse = nextVerse();
    setVerseSelection([verse]);
  };

  const onNextChapter = () => {
    const verse = nextChapter();
    setVerseSelection([verse]);
  };

  const onPrevChapter = () => {
    const verse = prevChapter();
    setVerseSelection([verse]);
  };

  const onFocusTypeahead = () => {
    ref.current.focus();
  };

  const toggleLogo = () => {
    setShowingLogo((value) => !value);
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
          ref={ref}
        />
      </Sidebar>

      <Wrapper direction="column">
        <Alert className="m-0" variant={showingLogo ? 'secondary ' : 'warning'}>
          <div className="d-flex align-items-center justify-content-between">
            {showingLogo ? (
              <span>
                Actualmente <strong>NO</strong> se está mostrando el versículo
                al público.
              </span>
            ) : (
              <span>
                Actualmente se está mostrando el versículo{' '}
                <strong>{verse.cite}</strong> al público.
              </span>
            )}
            <Button
              size="sm"
              variant={showingLogo ? 'secondary' : 'warning'}
              onClick={toggleLogo}
            >
              {showingLogo ? 'Mostrar' : 'Mostrar Logo'}
            </Button>
          </div>
        </Alert>

        <Presenter live={!showingLogo} cite={verse.cite}>
          {verse.text}
        </Presenter>

        <Controls
          onKeyLeft={onPrevVerse}
          onKeyRight={onNextVerse}
          onKeyUp={onNextChapter}
          onKeyDown={onPrevChapter}
          onKeyF1={onFocusTypeahead}
        >
          <ButtonGroup className="mr-2">
            <Button onClick={onPrevVerse} variant="secondary" className="">
              <ImArrowLeft2 />
            </Button>

            <Button onClick={onNextVerse} variant="secondary" className="">
              <ImArrowRight2 />
            </Button>
          </ButtonGroup>
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}

export default ScripturesView;
