import React, { useState, useRef, useEffect } from 'react';
import { Typeahead, Highlighter } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup, Alert, Form } from 'react-bootstrap';
import {
  ImArrowLeft2,
  ImArrowRight2,
  ImPlay3,
  ImStop2,
  ImVolumeHigh,
  ImVolumeMute,
} from 'react-icons/im';
import useSound from 'use-sound';
import createPersistedState from 'use-persisted-state';

import { Presenter } from 'components/presenter';
import { Sidebar } from 'components/sidebar';
import { Wrapper } from 'components/wrapper';
import { Controls } from 'components/controls';
import { Bookmark, createStorageKey } from 'components/bookmark';
import { List } from 'components/list';

import { useAnthemn, useMoveAnthemn, useMoveSlide, useBirthday } from 'hooks';
import { Storage, Time } from 'utils';
import {
  ITEMS_PER_LIST,
  CHANNEL_NAME,
  SETTINGS_NAME,
  SETTINGS_INITIAL_STATE,
} from 'values';

const getMP3Path = (number) => `himnos/${number}.mp3`;

const useBroadcast = createPersistedState(CHANNEL_NAME);
const useSettings = createPersistedState(SETTINGS_NAME);

const getBookmarkedItems = () => {
  return Storage.getAll('desc')
    .filter(({ key }) => key.includes('anthemn') && key.includes('bookmarked'))
    .map((item) => item.value);
};

export default function AnthemnsView() {
  const { anthemns, song, setSong } = useAnthemn();
  const { moveSlide, slide, setSlide } = useMoveSlide();
  const { moveAnthemn } = useMoveAnthemn();
  const { birthdays, birthdayAnthemn } = useBirthday();

  const [, setMessage] = useBroadcast(null);
  const [settings] = useSettings(SETTINGS_INITIAL_STATE);
  const [showLogo, setShowLogo] = useState(true);
  const [search, setSearch] = useState([song]);
  const [bookmarkedItems, setBookmarkedItems] = useState(getBookmarkedItems());

  const [url, setUrl] = useState(getMP3Path(song.number));
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

  const typeaheadRef = useRef();

  useEffect(() => {
    stop();
    setUrl(getMP3Path(song.number));
    setSlide(song.slides[0]);
    setPlaybackRate(1);
  }, [song, setSlide, stop]);

  useEffect(() => {
    setMessage(showLogo ? null : slide);
  }, [slide, showLogo, setMessage]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  useEffect(() => {
    return () => setMessage(null);
  }, [setMessage]);

  function onSearch(event) {
    setSearch(event);

    if (event.length) {
      const [anthemn] = event;
      setSong(anthemn);
      typeaheadRef.current.blur();
    }
  }

  const onPrevSlide = () => moveSlide(-1);

  const onNextSlide = () => moveSlide(1);

  const onPrevAnthemn = () => {
    const anthemn = moveAnthemn(-1);
    setSearch([anthemn]);
  };

  const onNextAnthemn = () => {
    const anthemn = moveAnthemn(1);
    setSearch([anthemn]);
  };

  const onTogglePlay = () => {
    if (isMP3Loaded) {
      isPlaying ? stop() : play();
    }
  };

  const removeBookmarks = () => {
    bookmarkedItems.forEach((item) => {
      Storage.remove(createStorageKey(item));
    });
    setBookmarkedItems(getBookmarkedItems());
  };

  return (
    <Wrapper>
      <Sidebar>
        <h1 className="text-light display-4">Himnos</h1>
        <Typeahead
          emptyLabel="No existe esa opcion."
          highlightOnlyResult={true}
          id="combo"
          labelKey="title"
          minLength={0}
          onChange={onSearch}
          onFocus={(e) => e.target.select()}
          options={anthemns}
          paginate={true}
          paginationText="Ver más opciones..."
          placeholder="Selecciona un versículo..."
          ref={typeaheadRef}
          selected={search}
          size="large"
          renderMenuItemChildren={(option, { text }) => (
            <>
              <Highlighter search={text}>{option.title}</Highlighter>
              <small
                className="d-block overflow-hidden font-italic"
                style={{ textOverflow: 'ellipsis' }}
                title={option.slides[1].text
                  .replaceAll('<br/>', '\n')
                  .replaceAll('1)', '')}
              >
                {option.slides[1].text
                  .replaceAll('<br/>', ' ')
                  .replaceAll('1)', '')}
              </small>
              {option.tags ? (
                <small class="badge bg-secondary text-light">
                  ({option.tags})
                </small>
              ) : null}
            </>
          )}
        />
        <div className="small text-muted d-block mt-1">
          Presiona <strong>F1</strong> para buscar.
        </div>

        {birthdays.length ? (
          <List>
            <List.Item>
              <List.Title
                className="text-warning"
                title={birthdays.reduce(
                  (res, { name, day, month }) =>
                    `${res}${name} (${Time.formatBirthday(day, month)})\n`,
                  ''
                )}
              >
                Cumpleaños detectados ({birthdays.length})
              </List.Title>
            </List.Item>

            <List.Item>
              <List.Action onClick={() => onSearch([birthdayAnthemn])}>
                {birthdayAnthemn.title}
              </List.Action>
            </List.Item>
          </List>
        ) : null}

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
                <List.Action onClick={() => onSearch([item])}>
                  {item.title}
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

      <Wrapper direction="column" {...settings}>
        <Bookmark
          element={song}
          onRefresh={() => setBookmarkedItems(getBookmarkedItems())}
        />

        <Alert
          className="m-0"
          variant={showLogo ? 'secondary ' : 'warning'}
          style={{ borderRadius: 0 }}
        >
          <div className="d-flex align-items-center justify-content-between">
            {showLogo ? (
              <span>
                Actualmente <strong>NO</strong> se está mostrando el himno al
                público.
              </span>
            ) : (
              <span>
                Actualmente se está mostrando el himno{' '}
                <strong>{song.title}</strong> al público.
              </span>
            )}
            <Button
              size="sm"
              variant={showLogo ? 'secondary' : 'warning'}
              onClick={() => setShowLogo((value) => !value)}
            >
              {showLogo ? 'Mostrar' : 'No Mostrar'}
            </Button>
          </div>
        </Alert>

        <Presenter live={!showLogo} {...settings}>
          {slide.text}
        </Presenter>

        <div className="text-muted bg-white py-2 px-3 d-flex justify-content-between">
          <small>
            Usa las teclas <strong className="text-primary">&larr;</strong> y{' '}
            <strong className="text-primary">&rarr;</strong> para cambiar de
            lámina, y <strong className="text-primary">&uarr;</strong> y{' '}
            <strong className="text-primary">&darr;</strong> para cambiar de
            himno.
          </small>
          <small>
            {slide.index + 1}/{song.length}
          </small>
        </div>

        <Controls
          onKeyLeft={onPrevSlide}
          onKeyRight={onNextSlide}
          onKeyUp={onNextAnthemn}
          onKeyDown={onPrevAnthemn}
          onKeyF1={() => typeaheadRef.current.focus()}
          onKeySpace={onTogglePlay}
        >
          {isMP3Loaded ? (
            <div className="d-flex">
              <ImVolumeMute />
              <Form.Control
                type="range"
                value={volume}
                min="0"
                max="1"
                step="0.05"
                className="mx-2"
                onChange={(e) => setVolume(+e.target.value)}
              />
              <ImVolumeHigh />
            </div>
          ) : null}
          {isMP3Loaded ? null : (
            <small>
              <span className="text-warning">
                Este himno <strong>NO</strong> tiene pista.
              </span>{' '}
              Agrégalo en formato <i>.mp3</i> en la carpeta{' '}
              <strong>/himnos</strong> con el nombre{' '}
              <strong>{song.number}.mp3</strong>.
            </small>
          )}
          <div className="d-flex">
            {isMP3Loaded ? (
              <>
                {/* <small className="navbar-text text-light">
                  Duración: {msToTime(duration)}
                </small> */}

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
              <Button onClick={onPrevSlide} variant="secondary">
                <ImArrowLeft2 />
              </Button>
              <Button onClick={onNextSlide} variant="secondary">
                <ImArrowRight2 />
              </Button>
            </ButtonGroup>
          </div>
          {isMP3Loaded ? (
            <>
              {' '}
              <div className="d-flex">
                <Form.Control
                  type="range"
                  value={playbackRate}
                  min="0.5"
                  max="2"
                  step="0.1"
                  className="mx-2"
                  style={{ width: '80px' }}
                  onChange={(e) => {
                    setPlaybackRate(+e.target.value);
                    if (isPlaying) {
                      play();
                    }
                  }}
                />
                <small className="navbar-text">
                  x{Number.parseFloat(playbackRate).toFixed(1)}
                </small>
              </div>
            </>
          ) : null}
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}
