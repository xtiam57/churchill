import React, { useState, useRef, useEffect, useMemo } from 'react';
import createPersistedState from 'use-persisted-state';
import { Typeahead, Highlighter } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup, Alert, Form } from 'react-bootstrap';
import {
  ImArrowLeft2,
  ImArrowRight2,
  ImPlay3,
  ImStop2,
  ImVolumeHigh,
  ImVolumeMute,
  ImSearch,
} from 'react-icons/im';
import useSound from 'use-sound';

import { Slider } from 'components/slider';
import { Sidebar } from 'components/sidebar';
import { Wrapper } from 'components/wrapper';
import { Controls } from 'components/controls';
import { Bookmark } from 'components/bookmark';
import { List } from 'components/list';
import { BookmarkList } from 'components/bookmarkList';
import { Finder } from 'components/finder';

import {
  useAnthemn,
  useMoveAnthemn,
  useIterate,
  useBirthday,
  useKeyDown,
} from 'hooks';
import { Time, getBookmarkedItems } from 'utils';

import { BROADCAST } from 'values';

const useSettings = createPersistedState(BROADCAST.SETTINGS);

export default function AnthemnsView() {
  const folder = useMemo(() => {
    const { app, shell } = window.require('electron').remote;
    const { protocol } = window.location;
    const path = `${
      protocol === 'file:' ? app.getPath('userData') : ''
    }\\himnos`;
    return {
      open: () => shell.openPath(path),
      getPath: (file) => `${path}\\${file}.mp3`,
    };
  }, []);

  const typeaheadRef = useRef();
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const { anthemns, song, setSong, tags } = useAnthemn();
  const [slide, setSlide] = useState(song.slides[0]);
  const [moveSlide] = useIterate(slide, song.slides);
  const { moveAnthemn } = useMoveAnthemn();
  const { birthdays, birthdayAnthemn } = useBirthday();
  const [showLogo, setShowLogo] = useState(true);
  const [search, setSearch] = useState([song]);
  const [bookmarks, setBookmarks] = useState(getBookmarkedItems('anthemn'));
  const [url, setUrl] = useState(folder.getPath(song.number));
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
  const [tagSelected, setTagSelected] = useState(null);
  const [anthemnsWithTags, setAnthemnsWithTags] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    stop();
    setUrl(folder.getPath(song.number));
    setPlaybackRate(1);
  }, [song, stop, folder]);

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

  const onOpenPath = (e) => {
    e.preventDefault();
    folder.open();
  };

  const onShowSongsWithTags = (tag) => {
    setTagSelected(tag === tagSelected ? null : tag);
    setAnthemnsWithTags(() =>
      tag === tagSelected
        ? []
        : anthemns.filter((song) => song.tags?.toLowerCase() === tag)
    );
  };

  useKeyDown('ArrowUp', onNextAnthemn);
  useKeyDown('ArrowDown', onPrevAnthemn);
  useKeyDown('F1', () => typeaheadRef.current.focus());
  useKeyDown('Space', onTogglePlay);
  useKeyDown('KeyB', () => setShowModal(true), { ctrl: true });

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
                title={option.text.replaceAll('/n', '\n')}
              >
                {option.text.replaceAll('1)', '').replaceAll('/n', ' ')}
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
          {showLogo ? 'Mostrar Himno' : 'Mostrar Logo'}
        </Button>

        {birthdays.length ? (
          <List className="mb-4">
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
              <List.Action
                onClick={() => onSearch([birthdayAnthemn])}
                title={birthdayAnthemn?.text.replaceAll('/n', '\n')}
              >
                {birthdayAnthemn.title}
              </List.Action>
            </List.Item>
          </List>
        ) : null}

        <BookmarkList
          className="mb-4"
          type="anthemn"
          items={bookmarks}
          onChange={setBookmarks}
          onClick={(item) => onSearch([item])}
        />

        <List>
          <List.Item>
            <List.Title>
              Etiquetas{' '}
              {anthemnsWithTags.length ? (
                <span>({anthemnsWithTags.length})</span>
              ) : null}
            </List.Title>
          </List.Item>

          <List.Item
            className="my-2"
            style={{ flexWrap: 'wrap', justifyContent: 'start' }}
          >
            {tags.map((tag, index) => (
              <span
                key={index}
                onClick={() => onShowSongsWithTags(tag)}
                className={`tag mr-1 mb-1 pointer ${
                  tag === tagSelected ? 'active' : ''
                }`}
              >
                {tag}
              </span>
            ))}
          </List.Item>

          {anthemnsWithTags.map((item) => (
            <List.Item key={item.index}>
              <List.Action
                onClick={() => onSearch([item])}
                title={item?.text.replaceAll('/n', '\n')}
              >
                {item.title}
              </List.Action>
            </List.Item>
          ))}
        </List>
      </Sidebar>

      <Wrapper direction="column" {...settings}>
        <Bookmark element={song} onChange={setBookmarks} />

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

        <Slider
          live={!showLogo}
          wrapper={song}
          value={slide}
          onChange={setSlide}
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

      <Finder
        show={showModal}
        onHide={() => setShowModal(false)}
        options={anthemns}
        onChange={(event) => {
          if (event.length) {
            onSearch(event);
            setShowModal(false);
          }
        }}
        render={(option, { text }) => (
          <div className="my-2">
            <div className="d-flex">
              <div className="text-primary fs-lg ">{option.title}</div>
              {option.tags ? (
                <small className="tag mb-0 ml-2">
                  {option.tags.toLowerCase()}
                </small>
              ) : null}
            </div>

            <Highlighter search={text}>
              {option.text.replaceAll('/n', ' ')}
            </Highlighter>

            {option.authors ? (
              <div className="small font-italic mt-2">
                Autor(es): {option.authors}
              </div>
            ) : null}
          </div>
        )}
      />
    </Wrapper>
  );
}
