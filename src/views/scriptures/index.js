import React, { useState, useEffect, useRef } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup, Alert, Form } from 'react-bootstrap';

import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';

import { Wrapper } from 'components/wrapper';
import { Presenter } from 'components/presenter';
import { Controls } from 'components/controls';
import { Sidebar } from 'components/sidebar';
import { Bookmark } from 'components/bookmark';
import {
  useScriptures,
  useVerse,
  useMoveVerse,
  usePresenter,
  useChannel,
} from 'hooks';
import { getAllItems } from 'utils';

const getBookmarkedItems = () => {
  return getAllItems().filter(
    ({ key }) => key.includes('verse') && key.includes('bookmarked')
  );
};

function ScripturesView() {
  const verses = useScriptures();
  const { verse, setVerse } = useVerse();
  const { moveChapter, moveVerse } = useMoveVerse();
  const { setLastBroadcast } = usePresenter();

  const [showLogo, setShowLogo] = useState(true);
  const [verseSelection, setVerseSelection] = useState([verse]);
  const [bookmarkedItems, setBookmarkedItems] = useState(getBookmarkedItems());

  const channel = useChannel();
  const ref = useRef();

  useEffect(() => {
    return () => {
      setLastBroadcast(null);
    };
  }, [setLastBroadcast]);

  useEffect(() => {
    return () => {
      channel.postMessage(null);
      channel.close();
    };
  }, [channel]);

  useEffect(() => {
    const value = showLogo ? null : verse;
    setLastBroadcast(value);
    channel.postMessage(value);
  }, [verse, channel, setLastBroadcast, showLogo]);

  useEffect(() => {}, [bookmarkedItems]);

  function onTypeaheadChange(event) {
    setVerseSelection(event);

    if (event.length) {
      setVerse(...event);
      ref.current.blur();
    }
  }

  const onPrevVerse = () => {
    const verse = moveVerse(-1);
    setVerseSelection([verse]);
  };

  const onNextVerse = () => {
    const verse = moveVerse(1);
    setVerseSelection([verse]);
  };

  const onPrevChapter = () => {
    const verse = moveChapter(-1);
    setVerseSelection([verse]);
  };

  const onNextChapter = () => {
    const verse = moveChapter(1);
    setVerseSelection([verse]);
  };

  const onFocusTypeahead = () => ref.current.focus();

  const toggleLogo = () => setShowLogo((value) => !value);

  return (
    <Wrapper>
      <Sidebar>
        <Typeahead
          emptyLabel="No existe esa opcion."
          highlightOnlyResult={true}
          id="combo"
          labelKey="cite"
          minLength={0}
          onChange={onTypeaheadChange}
          onFocus={(e) => e.target.select()}
          options={verses}
          paginate={false}
          paginationText="Ver más opciones..."
          placeholder="Selecciona un versículo..."
          ref={ref}
          selected={verseSelection}
          size="large"
        />

        {bookmarkedItems.map(({ value }) => (
          <div key={value.index} className="text-light">
            {value.cite}{' '}
            <Bookmark
              icon
              element={value}
              onRefresh={() => setBookmarkedItems(getBookmarkedItems())}
            />
          </div>
        ))}
      </Sidebar>

      <Wrapper direction="column">
        <Bookmark
          element={verse}
          onRefresh={() => setBookmarkedItems(getBookmarkedItems())}
        />

        <Alert className="m-0" variant={showLogo ? 'secondary ' : 'warning'}>
          <div className="d-flex align-items-center justify-content-between">
            {showLogo ? (
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
              variant={showLogo ? 'secondary' : 'warning'}
              onClick={toggleLogo}
            >
              {showLogo ? 'Mostrar' : 'No Mostrar'}
            </Button>
          </div>
        </Alert>
        <Presenter live={!showLogo} cite={verse.cite}>
          {verse.text}
        </Presenter>
        <Controls
          onKeyLeft={onPrevVerse}
          onKeyRight={onNextVerse}
          onKeyUp={onNextChapter}
          onKeyDown={onPrevChapter}
          onKeyF1={onFocusTypeahead}
          centered
        >
          <ButtonGroup>
            <Button onClick={onPrevVerse} variant="secondary">
              <ImArrowLeft2 />
            </Button>

            <Button onClick={onNextVerse} variant="secondary">
              <ImArrowRight2 />
            </Button>
          </ButtonGroup>
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}

export default ScripturesView;
