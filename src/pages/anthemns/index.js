import React, { useState, useRef, useEffect, useMemo } from 'react';
import createPersistedState from 'use-persisted-state';
import { Typeahead, Highlighter } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import * as ImIcons from 'react-icons/im';
import useSound from 'use-sound';

import { Slider } from 'components/slider';
import { Sidebar } from 'components/sidebar';
import { Wrapper } from 'components/wrapper';
import { Controls } from 'components/controls';
import { Bookmark } from 'components/bookmark';
import { List } from 'components/list';
import { BookmarkList } from 'components/bookmarkList';
import { Finder } from 'components/finder';
import { Info } from 'components/info';

import { useAnthemn, useBirthday, useKeyUp } from 'hooks';
import { Time, getBookmarkedItems, Storage } from 'utils';

import { BROADCAST, MOVEMENT } from 'values';

const useSettings = createPersistedState(BROADCAST.SETTINGS);

export const createKey = ({ id, type }) => `${type}_${id}_config`;

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
  const sliderRef = useRef();
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const { anthemns, current, setCurrent, tags, moveAnthemn } = useAnthemn();
  const { recent, bDaySong } = useBirthday();
  const [showLogo, setShowLogo] = useState(true);
  const [search, setSearch] = useState([current]);
  const [bookmarks, setBookmarks] = useState(getBookmarkedItems('anthemn'));
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
  const [tagSelected, setTagSelected] = useState(null);
  const [anthemnsWithTags, setAnthemnsWithTags] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  function onSearch(event) {
    setSearch(event);

    if (event.length) {
      const [anthemn] = event;
      setCurrent(anthemn);
      typeaheadRef.current.blur();
    }
  }

  const onPrevSlide = () => sliderRef.current.prev();

  const onNextSlide = () => sliderRef.current.next();

  const onPrevAnthemn = () => {
    const anthemn = moveAnthemn(MOVEMENT.PREV);
    setSearch([anthemn]);
  };

  const onNextAnthemn = () => {
    const anthemn = moveAnthemn(MOVEMENT.NEXT);
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
        : anthemns.filter((song) => song.tags?.split(',').includes(tag))
    );
  };

  const save = (target) => {
    Storage.set(createKey(current), {
      volume,
      playbackRate,
      [target.name]: +target.value,
    });
  };

  useKeyUp('ArrowUp', onNextAnthemn);
  useKeyUp('ArrowDown', onPrevAnthemn);
  useKeyUp('F1', () => typeaheadRef.current.focus());
  useKeyUp('Space', onTogglePlay);
  useKeyUp('KeyB', () => setShowModal(true), { ctrl: true });

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
                className="more font-italic"
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
            className="text-light p-0 text-small"
            onClick={(e) => setShowModal(true)}
          >
            <ImIcons.ImSearch /> Avanzado
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

        {recent.length ? (
          <List className="mb-4">
            <List.Item>
              <List.Title
                className="text-warning"
                title={recent.reduce(
                  (res, { name, day, month }) =>
                    `${res}${name} (${Time.formatBirthday(day, month)})\n`,
                  ''
                )}
              >
                Cumpleaños detectados ({recent.length})
              </List.Title>
            </List.Item>

            <List.Item>
              <List.Action
                onClick={() => onSearch([bDaySong])}
                title={bDaySong?.text.replaceAll('/n', '\n')}
              >
                {bDaySong.title}
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
        <Bookmark element={current} onChange={setBookmarks} />

        <Info>
          {showLogo ? (
            <>
              Actualmente <strong>NO</strong> se está mostrando el himno al
              público.
            </>
          ) : (
            <>
              Actualmente se está mostrando el himno{' '}
              <strong>{current.title}</strong> al público.
            </>
          )}
        </Info>

        <Slider ref={sliderRef} live={!showLogo} wrapper={current}>
          Usa las teclas <strong>&larr;</strong> y <strong>&rarr;</strong> para
          cambiar de página, y <strong>&uarr;</strong> y <strong>&darr;</strong>{' '}
          para cambiar de himno.
        </Slider>

        <Controls>
          {isMP3Loaded ? (
            <div className="d-flex">
              <ImIcons.ImVolumeMute />
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
                    save(target);
                    return +target.value;
                  });
                }}
              />
              <ImIcons.ImVolumeHigh />
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
              con el nombre <strong>{current.number}.mp3</strong>.
            </small>
          )}
          <div className="d-flex">
            {isMP3Loaded ? (
              <>
                <ButtonGroup className="mx-2">
                  {isPlaying ? (
                    <Button onClick={() => stop()} variant="light">
                      <ImIcons.ImStop2 />
                    </Button>
                  ) : (
                    <Button onClick={() => play()} variant="secondary">
                      <ImIcons.ImPlay3 />
                    </Button>
                  )}
                </ButtonGroup>
              </>
            ) : null}
            <ButtonGroup>
              <Button onClick={onPrevSlide} variant="secondary">
                <ImIcons.ImArrowLeft2 />
              </Button>
              <Button onClick={onNextSlide} variant="secondary">
                <ImIcons.ImArrowRight2 />
              </Button>
            </ButtonGroup>

            <Button className="ml-2" variant="secondary" onClick={onOpenPath}>
              <ImIcons.ImFolderOpen />
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
                      save(target);
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
              {option?.tags?.split(',').map((tag) => (
                <small key={tag} className="tag mb-0 ml-2">
                  {tag}
                </small>
              ))}
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
