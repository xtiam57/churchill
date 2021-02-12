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

import { Slider } from 'components/slider';
import { Sidebar } from 'components/sidebar';
import { Wrapper } from 'components/wrapper';
import { Controls } from 'components/controls';
import { Bookmark, createStorageKey } from 'components/bookmark';
import { List } from 'components/list';

import {
  useAnthemn,
  useMoveAnthemn,
  useMoveSlide,
  useBirthday,
  useKeyDown,
} from 'hooks';
import { Storage, Time, getBookmarkedItems } from 'utils';
import { ITEMS_PER_LIST } from 'values';

const getMP3Path = (path, number) => `${path}\\${number}.mp3`;

export default function AnthemnsView() {
  const typeaheadRef = useRef();
  const [folder] = useState(() => {
    const { app, shell } = window.require('electron').remote;
    const { protocol } = window.location;
    const path = `${
      protocol === 'file:' ? app.getPath('userData') : ''
    }\\himnos`;
    return {
      open: () => shell.openPath(path),
      path,
    };
  });
  const { anthemns, song, setSong } = useAnthemn();
  const [slide, setSlide] = useState(song.slides[0]);
  const { moveSlide } = useMoveSlide(slide, song.slides);
  const { moveAnthemn } = useMoveAnthemn();
  const { birthdays, birthdayAnthemn } = useBirthday();

  const [showLogo, setShowLogo] = useState(true);
  const [search, setSearch] = useState([song]);
  const [bookmarkedItems, setBookmarkedItems] = useState(
    getBookmarkedItems('anthemn')
  );
  const [url, setUrl] = useState(getMP3Path(folder.path, song.number));
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
    setUrl(getMP3Path(folder.path, song.number));
    setPlaybackRate(1);
  }, [song, stop, folder.path]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  function onSearch(event) {
    setSearch(event);

    if (event.length) {
      const [anthemn] = event;
      setSong(anthemn);
      typeaheadRef.current.blur();
    }
  }

  const onPrevSlide = () => {
    const slide = moveSlide(-1);
    setSlide(slide);
  };
  const onNextSlide = () => {
    const slide = moveSlide(1);
    setSlide(slide);
  };

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
    setBookmarkedItems(getBookmarkedItems('anthemn'));
  };

  const onOpenPath = (e) => {
    e.preventDefault();
    folder.open();
  };

  useKeyDown('ArrowUp', onNextAnthemn);
  useKeyDown('ArrowDown', onPrevAnthemn);
  useKeyDown('F1', () => typeaheadRef.current.focus());
  useKeyDown('Space', onTogglePlay);

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
                <small className="badge bg-secondary text-light">
                  ({option.tags})
                </small>
              ) : null}
            </>
          )}
        />
        <div className="small text-muted d-block mt-1">
          Presiona <strong>F1</strong> para buscar.
        </div>

        <Button
          className="mt-3"
          block
          size="lg"
          variant={showLogo ? 'secondary' : 'warning'}
          onClick={() => setShowLogo((value) => !value)}
        >
          {showLogo ? 'Mostrar Himno' : 'Mostrar Logo'}
        </Button>

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
                <Bookmark icon element={item} onRefresh={setBookmarkedItems} />
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
        <Bookmark element={song} onRefresh={setBookmarkedItems} />

        <Alert className="m-0 br-0" variant="secondary">
          {showLogo ? (
            <>
              Actualmente <strong>NO</strong> se está mostrando el himno al
              público.
            </>
          ) : (
            <>
              Actualmente se está mostrando el himno{' '}
              <strong>{song.title}</strong> al público.
            </>
          )}
        </Alert>

        <Slider live={!showLogo} wrapper={song} extSlide={[slide, setSlide]}>
          Usa las teclas <strong>&larr;</strong> y <strong>&rarr;</strong> para
          cambiar de lámina, y <strong>&uarr;</strong> y <strong>&darr;</strong>{' '}
          para cambiar de himno.
        </Slider>

        <Controls>
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
              Agrégala en formato <i>.mp3</i> en la carpeta{' '}
              <strong className="pointer text-underline" onClick={onOpenPath}>
                /himnos
              </strong>{' '}
              con el nombre <strong>{song.number}.mp3</strong>.
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
