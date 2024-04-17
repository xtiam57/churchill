import { East, FirstPage, LastPage, West } from '@mui/icons-material';
import {
  Alert,
  Bookmark,
  BookmarkList,
  Controls,
  DisplayButton,
  Finder,
  FinderButton,
  Presenter,
  Sidebar,
  Title,
  Wrapper,
} from 'components';
import { useKeyUp, usePresenter, useScriptures } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import createPersistedState from 'use-persisted-state';
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
  const [openFinder, setOpenFinder] = useState(false);
  const { presenting } = usePresenter();

  useEffect(() => {
    setMessage(showLogo ? null : current);
  }, [current, showLogo, setMessage]);

  useEffect(() => {
    return () => setMessage(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          current={current}
        />
      </Sidebar>

      {presenting ? (
        <Alert presenting={!showLogo} label={current?.subtext} />
      ) : null}

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

        <div className="text-white bg-dark py-2 px-3 d-flex justify-content-between">
          <small>
            Usa las teclas <strong>&larr;</strong> y <strong>&rarr;</strong>{' '}
            para cambiar de versículo, y <strong>&uarr;</strong> y{' '}
            <strong>&darr;</strong> para cambiar de capítulo.
          </small>
          <small>
            Capítulo: {current.chapterNumber}/{current.chaptersCount} &middot;
            Libro: {current.bookNumber}/66 &middot;{' '}
            <strong className="text-light">
              {Math.round(
                ((current.index / scriptures.length) * 100 + Number.EPSILON) *
                  100
              ) / 100}
              %
            </strong>
          </small>
        </div>

        <Controls centered>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Capítulo previo</Tooltip>}
          >
            <Button onClick={handlePrevChapter} variant="dark">
              <FirstPage />
            </Button>
          </OverlayTrigger>

          <ButtonGroup className="mx-5">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Versículo previo</Tooltip>}
            >
              <Button onClick={handlePrevVerse} variant="primary">
                <West />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Versículo siguiente</Tooltip>}
            >
              <Button onClick={handleNextVerse} variant="primary">
                <East />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Capítulo siguiente</Tooltip>}
          >
            <Button onClick={handleNextChapter} variant="dark">
              <LastPage />
            </Button>
          </OverlayTrigger>
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
