import React, { useState, useEffect, useRef } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { ImArrowLeft2, ImArrowRight2, ImSearch } from 'react-icons/im';

import { Wrapper } from 'components/wrapper';
import { Presenter } from 'components/presenter';
import { Controls } from 'components/controls';
import { Sidebar } from 'components/sidebar';
import { Bookmark } from 'components/bookmark';
import { BookmarkList } from 'components/bookmarkList';
import { Finder } from 'components/finder';
import { Info } from 'components/info';

import { useScriptures, useKeyUp, usePresenter } from 'hooks';
import { getBookmarkedItems } from 'utils';
import { BROADCAST, MOVEMENT } from 'values';
import { finderRender, typeaheadRender } from './renders';

const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useSettings = createPersistedState(BROADCAST.SETTINGS);

function ScripturesView() {
  const typeaheadRef = useRef();
  const { scriptures, current, setCurrent, moveChapter, moveVerse } =
    useScriptures();
  const [, setMessage] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [showLogo, setShowLogo] = useState(true);
  const [search, setSearch] = useState([current]);
  const [bookmarks, setBookmarks] = useState(getBookmarkedItems('verse'));
  const [showFinder, setShowFinder] = useState(false);
  const { presenting } = usePresenter();

  useEffect(() => {
    setMessage(showLogo ? null : current);
  }, [current, showLogo, setMessage]);

  useEffect(() => {
    return () => setMessage(null);
  }, []);

  useEffect(() => {
    if (!presenting) {
      setShowLogo(true);
    }
  }, [presenting]);

  function onSearch(event) {
    setSearch(event);

    if (event.length) {
      setCurrent(...event);
      typeaheadRef.current.blur();
    }
  }

  const onPrevVerse = () => {
    const verse = moveVerse(MOVEMENT.PREV);
    setSearch([verse]);
  };

  const onNextVerse = () => {
    const verse = moveVerse(MOVEMENT.NEXT);
    setSearch([verse]);
  };

  const onPrevChapter = () => {
    const verse = moveChapter(MOVEMENT.PREV);
    setSearch([verse]);
  };

  const onNextChapter = () => {
    const verse = moveChapter(MOVEMENT.NEXT);
    setSearch([verse]);
  };

  useKeyUp('ArrowLeft', onPrevVerse);
  useKeyUp('ArrowRight', onNextVerse);
  useKeyUp('ArrowUp', onNextChapter);
  useKeyUp('ArrowDown', onPrevChapter);
  useKeyUp('F1', () => typeaheadRef.current.focus());
  useKeyUp('KeyB', () => setShowFinder(true), { ctrl: true });

  return (
    <Wrapper>
      <Sidebar>
        <h1 className="text-light display-4">Escrituras</h1>

        <Typeahead
          emptyLabel="No existe esa opcion."
          highlightOnlyResult={true}
          id="combo"
          labelKey="subtext"
          minLength={0}
          onChange={onSearch}
          onKeyDown={(e) => {
            if (e.key === '.') {
              e.preventDefault();
              e.currentTarget.value += ':';
            }
          }}
          onFocus={(e) => e.target.select()}
          options={scriptures}
          paginate={false}
          paginationText="Ver más opciones..."
          placeholder="Selecciona un versículo..."
          ref={typeaheadRef}
          selected={search}
          size="large"
          renderMenuItemChildren={typeaheadRender}
        />

        <div className="small d-flex justify-content-between mt-1 mb-3">
          <div className="text-muted">
            Presiona <strong>F1</strong> para buscar.
          </div>

          <Button
            variant="link"
            className="text-light p-0 text-small"
            onClick={(e) => setShowFinder(true)}
            title="Búsqueda avanzada (Ctrl+B)"
          >
            <ImSearch />
          </Button>
        </div>

        <Button
          className={showLogo && presenting ? 'mb-4 pulse' : 'mb-4'}
          block
          size="lg"
          variant={showLogo ? 'secondary' : 'warning'}
          onClick={() => setShowLogo((value) => !value)}
          disabled={!presenting}
        >
          {showLogo ? 'Proyectar' : 'Mostrar Logo'}
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
        <Bookmark element={current} onChange={setBookmarks} />

        <Presenter
          id={current.id}
          live={!showLogo}
          text={current.text}
          subtext={current.subtext}
          grayscale={presenting && showLogo}
          {...settings}
        />

        <div className="text-light bg-dark py-2 px-3 d-flex justify-content-between">
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
        show={showFinder}
        onHide={() => setShowFinder(false)}
        options={scriptures}
        onChange={(event) => {
          if (event.length) {
            onSearch(event);
            setShowFinder(false);
          }
        }}
        render={finderRender}
      />
    </Wrapper>
  );
}

export default ScripturesView;
