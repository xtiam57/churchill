import {
  East,
  FirstPage,
  FolderCopy,
  LastPage,
  MenuBook,
  PlayArrow,
  Stop,
  VolumeMute,
  VolumeUp,
  West,
} from '@mui/icons-material';
import {
  Alert,
  Bookmark,
  BookmarkList,
  Controls,
  DisplayButton,
  Finder,
  FinderButton,
  Sidebar,
  Slider,
  Title,
  Wrapper,
} from 'components';
import { useAnthemn, useFolder, useKeyUp, usePresenter } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Form,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import createPersistedState from 'use-persisted-state';
import useSound from 'use-sound';
import { Storage, getBookmarkedItems } from 'utils';
import { BROADCAST, MOVEMENT } from 'values';
import { AnthemnIndex } from './AnthemnIndex';
import { AnthemnTags } from './AnthemnTags';
import { RecentBirthdays } from './RecentBirthdays';
import { finderRender, typeaheadRender } from './renders';

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
  const [openIndex, setOpenIndex] = useState(false);
  const [search, setSearch] = useState([current]);
  const [bookmarkSort, setBookmarkSort] = useState('asc');
  const [bookmarks, setBookmarks] = useState(
    getBookmarkedItems('anthemn', bookmarkSort)
  );
  const [url, setUrl] = useState(folder.getPath(current.number));
  const [isMP3Loaded, setIsMP3Loaded] = useState(false);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [volume, setVolume] = useState(1);
  const [play, { stop, isPlaying, sound }] = useSound(url, {
    volume,
    playbackRate,
    interrupt: true,
    onload: () => setIsMP3Loaded(true),
    onloaderror: () => setIsMP3Loaded(false),
  });
  const [trackProgress, setTrackProgress] = useState(0);
  const intervalRef = useRef();

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

  useEffect(() => {
    if (!isPlaying) {
      setTrackProgress(0);
      clearInterval(intervalRef.current);
    }
  }, [isPlaying]);

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTrackProgress((state) => state + 1);
    }, [1000]);
  };

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

        <FinderButton
          onOpen={setOpenFinder}
          extraButton={
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Abrir Himnario</Tooltip>}
            >
              <Button
                variant="link"
                className="text-white p-0 text-small mr-2"
                onClick={(e) => setOpenIndex(true)}
                title="Abrir Himnario"
              >
                <MenuBook fontSize="small" />
              </Button>
            </OverlayTrigger>
          }
        />

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

        {isMP3Loaded && (
          <div className="p-2 bg-gray d-flex align-items-center">
            <Form.Control
              custom
              type="range"
              name="position"
              value={trackProgress}
              min="0"
              max={Math.floor(sound?.duration())}
              step="1"
              onChange={({ target }) => {
                sound?.seek(+target.value);
                setTrackProgress(+target.value);
              }}
            />
          </div>
        )}

        <Controls>
          {isMP3Loaded ? (
            <div className="d-flex">
              <VolumeMute fontSize="small" />
              <Form.Control
                custom
                type="range"
                name="volume"
                value={volume}
                min="0"
                max="1"
                step="0.05"
                className="mx-2 volume-control"
                onChange={({ target }) => {
                  setVolume(() => {
                    handleSave(target);
                    return +target.value;
                  });
                }}
              />
              <VolumeUp fontSize="small" />
            </div>
          ) : null}

          {isMP3Loaded ? null : (
            <small>
              <span className="text-light">
                Este himno <strong>NO</strong> tiene pista.
              </span>{' '}
              Agrega su pista en formato <i>.mp3</i> en la carpeta{' '}
              <strong
                className="pointer text-underline"
                onClick={handleOpenPath}
              >
                /himnos
              </strong>{' '}
              con el nombre <strong>{current.number}.mp3</strong>
            </small>
          )}

          <div className="d-flex">
            {isMP3Loaded ? (
              <>
                <ButtonGroup className="mx-2">
                  {isPlaying ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Detener</Tooltip>}
                    >
                      <Button onClick={() => stop()} variant="light">
                        <Stop />
                      </Button>
                    </OverlayTrigger>
                  ) : (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Reproducir</Tooltip>}
                    >
                      <Button
                        onClick={() => {
                          play();
                          startTimer();
                          sound?.seek(trackProgress);
                        }}
                        variant="secondary"
                      >
                        <PlayArrow />
                      </Button>
                    </OverlayTrigger>
                  )}
                </ButtonGroup>
              </>
            ) : null}

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Himno previo</Tooltip>}
            >
              <Button onClick={handlePrevAnthemn} variant="dark">
                <FirstPage />
              </Button>
            </OverlayTrigger>

            <ButtonGroup className="mx-3">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Página anterior</Tooltip>}
              >
                <Button onClick={handlePrevSlide} variant="primary">
                  <West />
                </Button>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Página siguiente</Tooltip>}
              >
                <Button onClick={handleNextSlide} variant="primary">
                  <East />
                </Button>
              </OverlayTrigger>
            </ButtonGroup>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Himno siguiente</Tooltip>}
            >
              <Button onClick={handleNextAnthemn} variant="dark">
                <LastPage />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Abrir directorio de pistas</Tooltip>}
            >
              <Button
                className="ml-2"
                variant="secondary"
                onClick={handleOpenPath}
              >
                <FolderCopy />
              </Button>
            </OverlayTrigger>
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
                  style={{ width: '80px' }}
                  className="mx-2 volume-control"
                  onChange={({ target }) => {
                    setPlaybackRate(() => {
                      handleSave(target);
                      return +target.value;
                    });
                    if (isPlaying) {
                      play();
                      setTrackProgress(0);
                    }
                  }}
                />
                <small className="text-light">
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

      <AnthemnIndex
        show={openIndex}
        onHide={() => setOpenIndex(false)}
        onChange={setBookmarks}
        sort={bookmarkSort}
        onSelect={(item) => {
          if (item) {
            handleSearch([item]);
            setOpenIndex(false);
          }
        }}
      />
    </Wrapper>
  );
}
