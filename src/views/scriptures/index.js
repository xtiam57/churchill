import React, { useState, useEffect, useRef } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup, Alert, Form } from 'react-bootstrap';

import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';

import { Wrapper } from 'components/wrapper';
import { Presenter } from 'components/presenter';
import { Controls } from 'components/controls';
import { Sidebar } from 'components/sidebar';
import { Bookmark, createStorageKey } from 'components/bookmark';
import { List } from 'components/list';

import {
  useScriptures,
  useVerse,
  useMoveVerse,
  usePresenter,
  useChannel,
} from 'hooks';
import { Storage } from 'utils';
import { ITEMS_PER_LIST } from 'values';

const getBookmarkedItems = () => {
  return Storage.getAll('desc')
    .filter(({ key }) => key.includes('verse') && key.includes('bookmarked'))
    .map((item) => item.value);
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

  const removeBookmarks = () => {
    bookmarkedItems.forEach((item) => {
      Storage.remove(createStorageKey(item));
    });
    setBookmarkedItems(getBookmarkedItems());
  };

  return (
    <Wrapper>
      <Sidebar>
        <h1 className="text-light display-4">Escrituras</h1>
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
        <div className="small text-muted d-block mt-1">
          Presiona <strong>F1</strong> para buscar.
        </div>

        <List>
          <List.Item>
            {bookmarkedItems.length ? (
              <>
                <List.Title>Marcadores</List.Title>
                <List.Action className="text-right" onClick={removeBookmarks}>
                  (Borrar)
                </List.Action>
              </>
            ) : null}
          </List.Item>

          {bookmarkedItems.map((item, index) => {
            return index < ITEMS_PER_LIST ? (
              <List.Item key={item.index}>
                <List.Action onClick={() => onTypeaheadChange([item])}>
                  {item.cite}
                </List.Action>
                <Bookmark
                  icon
                  element={item}
                  onRefresh={() => setBookmarkedItems(getBookmarkedItems())}
                />
              </List.Item>
            ) : null;
          })}

          {bookmarkedItems.length > ITEMS_PER_LIST ? (
            <List.Item>
              <List.Text>
                +{bookmarkedItems.length - ITEMS_PER_LIST} marcadores
              </List.Text>
            </List.Item>
          ) : null}
        </List>
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

        <Presenter live={!showLogo} subtext={verse.cite}>
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
