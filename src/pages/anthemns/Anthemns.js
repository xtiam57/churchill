import React, { useState, useRef, useEffect } from 'react';
import createPersistedState from 'use-persisted-state';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import {
  ImVolumeMute,
  ImVolumeHigh,
  ImStop2,
  ImPlay3,
  ImArrowLeft2,
  ImArrowRight2,
  ImFolderOpen,
} from 'react-icons/im';
import useSound from 'use-sound';

import {
  Slider,
  Sidebar,
  Wrapper,
  Controls,
  Bookmark,
  BookmarkList,
  Finder,
  DisplayButton,
  Title,
  FinderButton,
  Alert,
} from 'components';
import { useAnthemn, useFolder, useKeyUp, usePresenter } from 'hooks';
import { getBookmarkedItems, Storage } from 'utils';
import { BROADCAST, MOVEMENT } from 'values';

import { RecentBirthdays } from './RecentBirthdays';
import { AnthemnTags } from './AnthemnTags';
import { typeaheadRender, finderRender } from './renders';

const useSettings = createPersistedState(BROADCAST.SETTINGS);

export const createKey = ({ id, type }) => `${type}_${id}_config`;

export default function AnthemnsPage() {
  const folder = useFolder();

  const typeaheadRef = useRef();
  const sliderRef = useRef();
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const { presenting } = usePresenter();
  const { anthemns, current, setCurrent, moveAnthemn } = useAnthemn();
  const [showLogo, setShowLogo] = useState(true);
  const [openFinder, setOpenFinder] = useState(false);
  const [search, setSearch] = useState([current]);
  const [bookmarkSort, setBookmarkSort] = useState('asc');
  const [bookmarks, setBookmarks] = useState(
    getBookmarkedItems('anthemn', bookmarkSort)
  );
  const [url, setUrl] = useState(folder.getPath(current.number));
  const [isMP3Loaded, setIsMP3Loaded] = useState(false);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [volume, setVolume] = useState(1);
  const [play, { stop, isPlaying }] = useSound(url, {
    volume,
    playbackRate,
    interrupt: true,
    onload: () => setIsMP3Loaded(true),
    onloaderror: () => setIsMP3Loaded(false),
  });

  useEffect(() => {
    stop();
    setUrl(folder.getPath(current.number));
    // Bug: delay to set config of the song
    setTimeout(() => {
      // Trying to get settings from storage
      const config = Storage.get(createKey(current));
      setPlaybackRate(config ? config.playbackRate : 1);
      setVolume(config ? config.volume : 1);
    });
  }, [current, folder, stop]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  useEffect(() => {
    if (!presenting) {
      setShowLogo(true);
    }
  }, [presenting]);

  function handleSearch(event) {
    setSearch(event);

    if (event.length) {
      const [anthemn] = event;
      setCurrent(anthemn);
      typeaheadRef.current.blur();
    }
  }

  const handlePrevSlide = () => sliderRef.current.prev();

  const handleNextSlide = () => sliderRef.current.next();

  const handlePrevAnthemn = () => {
    if (!isPlaying) {
      const anthemn = moveAnthemn(MOVEMENT.PREV);
      setSearch([anthemn]);
    }
  };

  const handleNextAnthemn = () => {
    if (!isPlaying) {
      const anthemn = moveAnthemn(MOVEMENT.NEXT);
      setSearch([anthemn]);
    }
  };

  const handleTogglePlay = () => {
    if (isMP3Loaded) {
      isPlaying ? stop() : play();
    }
  };

  const handleOpenPath = (e) => {
    e.preventDefault();
    folder.open();
  };

  const handleSave = (target) => {
    Storage.set(createKey(current), {
      volume,
      playbackRate,
      [target.name]: +target.value,
    });
  };

  const handleSort = () => {
    const sort = bookmarkSort === 'desc' ? 'asc' : 'desc';
    setBookmarkSort(sort);
    setBookmarks(getBookmarkedItems('anthemn', sort));
  };

  useKeyUp('ArrowUp', handleNextAnthemn);
  useKeyUp('ArrowDown', handlePrevAnthemn);
  useKeyUp('F1', () => typeaheadRef.current.focus());
  useKeyUp('Space', handleTogglePlay);
  useKeyUp('KeyB', () => setOpenFinder(true), { ctrl: true });

  return (
    <Wrapper>
      <Sidebar>
        <Title>Himnos</Title>

        <Typeahead
          emptyLabel="No existe esa opcion."
          highlightOnlyResult={true}
          id="combo"
          labelKey="title"
          minLength={0}
          onChange={handleSearch}
          onFocus={(e) => e.target.select()}
          options={anthemns}
          paginate={true}
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

        <RecentBirthdays onClick={handleSearch} />

        <BookmarkList
          type="anthemn"
          items={bookmarks}
          onChange={setBookmarks}
          onClick={(item) => handleSearch([item])}
          onSort={handleSort}
          sort={bookmarkSort}
          current={current}
        />

        <AnthemnTags onClick={handleSearch} current={current} />
      </Sidebar>

      {presenting ? (
        <Alert presenting={!showLogo} label={current?.title} />
      ) : null}

      <Wrapper direction="column" {...settings}>
        <Bookmark
          element={current}
          onChange={setBookmarks}
          sort={bookmarkSort}
        />

        <Slider
          ref={sliderRef}
          live={!showLogo}
          wrapper={current}
          grayscale={presenting && showLogo}
          marquee={
            isPlaying ? (
              <>
                <span className="text-warning">{current?.title}</span>
                {current?.authors ? (
                  <span> &mdash; {current?.authors}</span>
                ) : null}
              </>
            ) : null
          }
        >
          Usa las teclas <strong>&larr;</strong> y <strong>&rarr;</strong> para
          cambiar de página, y <strong>&uarr;</strong> y <strong>&darr;</strong>{' '}
          para cambiar de himno.
        </Slider>

        <Controls>
          {isMP3Loaded ? (
            <div className="d-flex">
              <ImVolumeMute />
              <Form.Control
                type="range"
                name="volume"
                value={volume}
                min="0"
                max="1"
                step="0.05"
                className="mx-2"
                onChange={({ target }) => {
                  setVolume(() => {
                    handleSave(target);
                    return +target.value;
                  });
                }}
              />
              <ImVolumeHigh />
            </div>
          ) : null}

          {isMP3Loaded ? null : (
            <small>
              <span className="text-warning">
                Este himno <strong>NO</strong> tiene pista.
              </span>{' '}
              Agrégala en formato <i>.mp3</i> en la carpeta{' '}
              <strong
                className="pointer text-underline"
                onClick={handleOpenPath}
              >
                /himnos
              </strong>{' '}
              con el nombre <strong>{current.number}.mp3</strong>.
            </small>
          )}

          <div className="d-flex">
            {isMP3Loaded ? (
              <>
                <ButtonGroup className="mx-2">
                  {isPlaying ? (
                    <Button onClick={() => stop()} variant="light">
                      <ImStop2 />
                    </Button>
                  ) : (
                    <Button onClick={() => play()} variant="secondary">
                      <ImPlay3 />
                    </Button>
                  )}
                </ButtonGroup>
              </>
            ) : null}

            <ButtonGroup>
              <Button onClick={handlePrevSlide} variant="secondary">
                <ImArrowLeft2 />
              </Button>
              <Button onClick={handleNextSlide} variant="secondary">
                <ImArrowRight2 />
              </Button>
            </ButtonGroup>

            <Button
              className="ml-2"
              variant="secondary"
              onClick={handleOpenPath}
            >
              <ImFolderOpen />
            </Button>
          </div>

          {isMP3Loaded ? (
            <>
              <div className="d-flex align-items-center">
                <Form.Control
                  custom
                  type="range"
                  name="playbackRate"
                  value={playbackRate}
                  min="0.5"
                  max="2"
                  step="0.05"
                  className="mx-2"
                  style={{ width: '80px' }}
                  onChange={({ target }) => {
                    setPlaybackRate(() => {
                      handleSave(target);
                      return +target.value;
                    });
                    if (isPlaying) {
                      play();
                    }
                  }}
                />
                <small className="navbar-text">
                  x{Number.parseFloat(playbackRate).toFixed(2)}
                </small>
              </div>
            </>
          ) : null}
        </Controls>
      </Wrapper>

      <Finder
        show={openFinder}
        onHide={() => setOpenFinder(false)}
        options={anthemns}
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
