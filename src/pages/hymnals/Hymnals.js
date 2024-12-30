import {
  Download,
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
import AudioPlayer from '../../components/AudioPlayer';
import { useFolder, useHymnals, useKeyUp, usePresenter } from 'hooks';
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
import { HymnalBooks } from './HymnalBooks';
import { HymnalIndex } from './HymnalIndex';
import { HymnalTags } from './HymnalTags';
import { RecentBirthdays } from './RecentBirthdays';
import { finderRender, typeaheadRender } from './renders';

const useSettings = createPersistedState(BROADCAST.SETTINGS);

export const createKey = ({ id, type }) => `${type}_${id}_config`;

export default function HymnalsPage() {
  const folder = useFolder();

  const typeaheadRef = useRef();
  const sliderRef = useRef();
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const { presenting } = usePresenter();
  const { hymnals, current, setCurrent, moveHymnal } = useHymnals();
  const [showLogo, setShowLogo] = useState(true);
  const [openFinder, setOpenFinder] = useState(false);
  const [openIndex, setOpenIndex] = useState(false);
  const [search, setSearch] = useState([current]);
  const [bookmarkSort, setBookmarkSort] = useState('asc');
  const [bookmarks, setBookmarks] = useState(
    getBookmarkedItems('hymnal', bookmarkSort)
  );
  const [url, setUrl] = useState(folder.getPath(current.reference));
  const [url2, setUrl2] = useState(
    'https://renzo971.github.io/boda/pistas/' + current.reference + '.mp3'
  );
  const [show, setShow] = useState(false);
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
    setUrl(folder.getPath(current.reference));
    setShow(false);
    setIsMP3Loaded(false);
    setUrl2(
      'https://renzo971.github.io/boda/pistas/' + current.reference + '.mp3'
    );
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
      const [hymnal] = event;
      setCurrent(hymnal);
      typeaheadRef.current.blur();
    }
  }

  const handlePrevSlide = () => sliderRef.current.prev();

  const handleNextSlide = () => sliderRef.current.next();

  const handlePrevHymnal = () => {
    if (!isPlaying) {
      const hymnal = moveHymnal(MOVEMENT.PREV);
      setSearch([hymnal]);
    }
  };

  const handleNextHymnal = () => {
    if (!isPlaying) {
      const hymnal = moveHymnal(MOVEMENT.NEXT);
      setSearch([hymnal]);
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
    setBookmarks(getBookmarkedItems('hymnal', sort));
  };
  const Downloadtrack = () => {
    try {
      const link = document.createElement('a');
      link.href = url2;
      link.download = `${current.reference}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar la pista:', error);
    }
  };

  useKeyUp('ArrowUp', handleNextHymnal);
  useKeyUp('ArrowDown', handlePrevHymnal);
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
          options={hymnals}
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
              overlay={<Tooltip>Abrir Himnarios</Tooltip>}
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
          type="hymnal"
          items={bookmarks}
          onChange={setBookmarks}
          onClick={(item) => handleSearch([item])}
          onSort={handleSort}
          sort={bookmarkSort}
          current={current}
        />

        <HymnalTags onClick={handleSearch} current={current} />

        <HymnalBooks onClick={handleSearch} current={current} />
      </Sidebar>

      {presenting ? (
        <Alert
          presenting={!showLogo}
          label={current?.title}
          sublabel={current?.book}
        />
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

        {isMP3Loaded ? (
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
        ) : show ? (
          <AudioPlayer url={url2} current={current}>
            <Button variant="danger" onClick={(e) => setShow(false)}>
              No deseo consumir internet
            </Button>
          </AudioPlayer>
        ) : (
          <div className="py-2 px-3 bg-warning d-flex align-items-center">
            <small>
              <strong>Este himno NO tiene pista.</strong> Agrega su pista en
              formato <i>.mp3</i> en la carpeta{' '}
              <strong
                className="pointer text-underline"
                onClick={handleOpenPath}
              >
                /pistas
              </strong>{' '}
              con el nombre <strong>{current.reference}.mp3</strong> o{' '}
              <Button onClick={(e) => setShow(true)}>
                Reproducir desde la web
              </Button>{' '}
              o{' '}
              <Button onClick={Downloadtrack}>
                <Download />
              </Button>
            </small>
          </div>
        )}

        <Controls>
          <div className="d-flex align-items-center">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Abrir directorio de pistas</Tooltip>}
            >
              <Button
                className="mr-2"
                variant="secondary"
                onClick={handleOpenPath}
              >
                <FolderCopy />
              </Button>
            </OverlayTrigger>

            {isMP3Loaded && (
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
            )}
          </div>

          <div className="d-flex">
            {isMP3Loaded && (
              <div className="mr-2">
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
              </div>
            )}

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Himno previo</Tooltip>}
            >
              <Button onClick={handlePrevHymnal} variant="dark">
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
              <Button onClick={handleNextHymnal} variant="dark">
                <LastPage />
              </Button>
            </OverlayTrigger>
          </div>

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
          ) : (
            <div />
          )}
        </Controls>
      </Wrapper>

      <Finder
        show={openFinder}
        onHide={() => setOpenFinder(false)}
        options={hymnals}
        onChange={(event) => {
          if (event.length) {
            handleSearch(event);
            setOpenFinder(false);
          }
        }}
        render={finderRender}
      />

      <HymnalIndex
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
