import React, { useState, useEffect, useRef } from 'react';
import { Typeahead, Highlighter } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup, Alert } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { ImArrowLeft2, ImArrowRight2, ImSearch } from 'react-icons/im';

import { Wrapper } from 'components/wrapper';
import { Presenter } from 'components/presenter';
import { Controls } from 'components/controls';
import { Sidebar } from 'components/sidebar';
import { Bookmark } from 'components/bookmark';
import { BookmarkList } from 'components/bookmarkList';
import { Finder } from 'components/finder';

import { useScriptures, useMoveVerse, useKeyDown } from 'hooks';
import { getBookmarkedItems } from 'utils';
import { BROADCAST } from 'values';

const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useSettings = createPersistedState(BROADCAST.SETTINGS);

function ScripturesView() {
  const typeaheadRef = useRef();
  const { scriptures, verse, setVerse } = useScriptures();
  const { moveChapter, moveVerse } = useMoveVerse();
  const [, setMessage] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [showLogo, setShowLogo] = useState(true);
  const [search, setSearch] = useState([verse]);
  const [bookmarks, setBookmarks] = useState(getBookmarkedItems('verse'));
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setMessage(showLogo ? null : verse);
  }, [verse, showLogo, setMessage]);

  useEffect(() => {
    return () => setMessage(null);
  }, []);

  function onSearch(event) {
    setSearch(event);

    if (event.length) {
      setVerse(...event);
      typeaheadRef.current.blur();
    }
  }

  const onPrevVerse = () => {
    const verse = moveVerse(-1);
    setSearch([verse]);
  };

  const onNextVerse = () => {
    const verse = moveVerse(1);
    setSearch([verse]);
  };

  const onPrevChapter = () => {
    const verse = moveChapter(-1);
    setSearch([verse]);
  };

  const onNextChapter = () => {
    const verse = moveChapter(1);
    setSearch([verse]);
  };

  useKeyDown('ArrowLeft', onPrevVerse);
  useKeyDown('ArrowRight', onNextVerse);
  useKeyDown('ArrowUp', onNextChapter);
  useKeyDown('ArrowDown', onPrevChapter);
  useKeyDown('F1', () => typeaheadRef.current.focus());
  useKeyDown('KeyB', () => setShowModal(true), { ctrl: true });

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
          onChange={onSearch}
          onFocus={(e) => e.target.select()}
          options={scriptures}
          paginate={false}
          paginationText="Ver más opciones..."
          placeholder="Selecciona un versículo..."
          ref={typeaheadRef}
          selected={search}
          size="large"
          renderMenuItemChildren={(option, { text }) => (
            <>
              <Highlighter search={text}>{option.cite}</Highlighter>
              <small
                className="d-block overflow-hidden font-italic"
                style={{ textOverflow: 'ellipsis' }}
                title={option.text.replaceAll('<br/>', '\n')}
              >
                {option.text.replaceAll('<br/>', ' ')}
              </small>
            </>
          )}
        />

        <div className="small d-flex justify-content-between mt-1 mb-3">
          <div className="text-muted">
            Presiona <strong>F1</strong> para buscar.
          </div>

          <Button
            variant="link"
            className="text-light p-0 m-0"
            style={{ fontSize: '95%' }}
            onClick={(e) => setShowModal(true)}
          >
            <ImSearch /> Avanzado
          </Button>
        </div>

        <Button
          className="mb-4"
          block
          size="lg"
          variant={showLogo ? 'secondary' : 'warning'}
          onClick={() => setShowLogo((value) => !value)}
        >
          {showLogo ? 'Mostrar Versículo' : 'Mostrar Logo'}
        </Button>

        <BookmarkList
          className="mb-4"
          type="verse"
          items={bookmarks}
          onChange={setBookmarks}
          onClick={(item) => onSearch([item])}
        />
      </Sidebar>

      <Wrapper direction="column" {...settings}>
        <Bookmark element={verse} onChange={setBookmarks} />

        <Alert className="m-0 br-0" variant="secondary">
          {showLogo ? (
            <>
              Actualmente <strong>NO</strong> se está mostrando el versículo al
              público.
            </>
          ) : (
            <>
              Actualmente se está mostrando el versículo{' '}
              <strong>{verse.cite}</strong> al público.
            </>
          )}
        </Alert>

        <Presenter live={!showLogo} subtext={verse.cite} {...settings}>
          {verse.text}
        </Presenter>

        <div className="text-muted bg-white py-2 px-3 d-flex justify-content-between">
          <small>
            Usa las teclas <strong>&larr;</strong> y <strong>&rarr;</strong>{' '}
            para cambiar de versículo, y <strong>&uarr;</strong> y{' '}
            <strong>&darr;</strong> para cambiar de capítulo.
          </small>
        </div>

        <Controls centered>
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

      <Finder
        show={showModal}
        onHide={() => setShowModal(false)}
        options={scriptures}
        onChange={(event) => {
          if (event.length) {
            onSearch(event);
            setShowModal(false);
          }
        }}
        render={(option, { text }) => (
          <div className="my-1">
            <Highlighter search={text}>
              {option.text.replaceAll('<br/>', '\n')}
            </Highlighter>
            <small className="d-block text-primary">{option.cite}</small>
          </div>
        )}
      />
    </Wrapper>
  );
}

export default ScripturesView;
