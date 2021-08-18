import React, { useState, useEffect, useRef } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';

import { Wrapper } from 'components/wrapper';
import { Presenter } from 'components/presenter';
import { Controls } from 'components/controls';
import { Sidebar } from 'components/sidebar';
import { Bookmark } from 'components/bookmark';
import { BookmarkList } from 'components/bookmarkList';
import { Finder } from 'components/finder';

import { useScriptures, useKeyUp, usePresenter } from 'hooks';
import { getBookmarkedItems } from 'utils';
import { BROADCAST, MOVEMENT } from 'values';
import { finderRender, typeaheadRender } from './renders';
import { Title } from 'components/title';
import { DisplayButton } from 'components/displayButton';
import { FinderButton } from 'components/finderButton';

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
  const [openFinder, setOpenFinder] = useState(false);
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

  function handleSearch(event) {
    setSearch(event);

    if (event.length) {
      setCurrent(...event);
      typeaheadRef.current.blur();
    }
  }

  const handlePrevVerse = () => {
    const verse = moveVerse(MOVEMENT.PREV);
    setSearch([verse]);
  };

  const handleNextVerse = () => {
    const verse = moveVerse(MOVEMENT.NEXT);
    setSearch([verse]);
  };

  const handlePrevChapter = () => {
    const verse = moveChapter(MOVEMENT.PREV);
    setSearch([verse]);
  };

  const handleNextChapter = () => {
    const verse = moveChapter(MOVEMENT.NEXT);
    setSearch([verse]);
  };

  useKeyUp('ArrowLeft', handlePrevVerse);
  useKeyUp('ArrowRight', handleNextVerse);
  useKeyUp('ArrowUp', handleNextChapter);
  useKeyUp('ArrowDown', handlePrevChapter);
  useKeyUp('F1', () => typeaheadRef.current.focus());
  useKeyUp('KeyB', () => setOpenFinder(true), { ctrl: true });

  return (
    <Wrapper>
      <Sidebar>
        <Title>Escrituras</Title>

        <Typeahead
          emptyLabel="No existe esa opcion."
          highlightOnlyResult={true}
          id="combo"
          labelKey="subtext"
          minLength={0}
          onChange={handleSearch}
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

        <FinderButton onOpen={setOpenFinder} />

        <DisplayButton
          value={showLogo}
          presenting={presenting}
          onToggle={setShowLogo}
        />

        <BookmarkList
          className="mb-4"
          type="verse"
          items={bookmarks}
          onChange={setBookmarks}
          onClick={(item) => handleSearch([item])}
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
          <small>
            Capítulo:{' '}
            <strong>
              {current.chapterNumber}/{current.chaptersCount}
            </strong>{' '}
            &middot; Libro: <strong>{current.bookNumber}/66</strong> &middot;{' '}
            <strong className="text-warning">
              {Math.round(
                ((current.index / scriptures.length) * 100 + Number.EPSILON) *
                  100
              ) / 100}
              %
            </strong>
          </small>
        </div>

        <Controls centered>
          <ButtonGroup>
            <Button onClick={handlePrevVerse} variant="secondary">
              <ImArrowLeft2 />
            </Button>

            <Button onClick={handleNextVerse} variant="secondary">
              <ImArrowRight2 />
            </Button>
          </ButtonGroup>
        </Controls>
      </Wrapper>

      <Finder
        show={openFinder}
        onHide={() => setOpenFinder(false)}
        options={scriptures}
        onChange={(event) => {
          if (event.length) {
            handleSearch(event);
            setOpenFinder(false);
          }
        }}
        render={finderRender}
      />
    </Wrapper>
  );
}

export default ScripturesView;
