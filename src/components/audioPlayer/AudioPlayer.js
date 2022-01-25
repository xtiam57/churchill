import React from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { ImPlay3, ImStop2, ImVolumeHigh, ImVolumeMute } from 'react-icons/im';
import { useLocation } from 'react-router-dom';
import { PATHS } from 'router';
import { AudioPlayerStyled, ControlsStyled, SummaryStyled } from './styled';

export function AudioPlayer({
  isMP3Loaded = true,
  volume = 1,
  isPlaying = true,
  playbackRate = 1,
  trackProgress = 0,
}) {
  const location = useLocation();

  if (location.pathname === PATHS.CAST_PAGE) {
    return null;
  }

  return (
    <AudioPlayerStyled class="fixed-bottom">
      {/* <SummaryStyled className="bg-dark text-light py-2 px-3">
        <small className="text-nowrap">1st</small>

        <div className="marquee small">
          <p className="m-0">
            ¡SANTO! ¡SANTO! ¡SANTO! - Letra por Reginal Heber, 1826, Traducido
            por J. B. Cabrera, Música por John B. Dykes, 1861
          </p>
        </div>

        <small className="text-nowrap text-right">2nd</small>
      </SummaryStyled> */}

      <div className="marquee small">
        <p className="m-0">
          ¡SANTO! ¡SANTO! ¡SANTO! - Letra por Reginal Heber, 1826, Traducido por
          J. B. Cabrera, Música por John B. Dykes, 1861
        </p>
      </div>

      <ControlsStyled>
        {isMP3Loaded ? (
          <div className="d-flex">
            <ImVolumeMute className="pointer" onClick={() => {}} />
            <Form.Control
              type="range"
              name="volume"
              value={volume}
              min="0"
              max="1"
              step="0.05"
              className="mx-2"
              onChange={({ target }) => {
                // setVolume(() => {
                //   handleSave(target);
                //   return +target.value;
                // });
              }}
            />
            <ImVolumeHigh className="pointer" onClick={() => {}} />
          </div>
        ) : null}

        <div></div>

        {/* {isMP3Loaded ? null : (
          <small>
            <span className="text-warning">
              Este himno <strong>NO</strong> tiene pista.
            </span>{' '}
            Agrégala en formato <i>.mp3</i> en la carpeta{' '}
            <strong className="pointer text-underline" onClick={handleOpenPath}>
              /himnos
            </strong>{' '}
            con el nombre <strong>{current.number}.mp3</strong>.
          </small>
        )} */}

        <div className="d-flex ">
          {isMP3Loaded ? (
            <>
              <ButtonGroup className="mx-auto">
                {isPlaying ? (
                  <Button
                    onClick={() => {
                      /* stop() */
                    }}
                    variant="light"
                  >
                    <ImStop2 />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      // play();
                      // startTimer();
                      // sound?.seek(trackProgress);
                    }}
                    variant="secondary"
                  >
                    <ImPlay3 />
                  </Button>
                )}
              </ButtonGroup>
            </>
          ) : null}
        </div>

        <span></span>

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
                onChange={({ target }) => {
                  // setPlaybackRate(() => {
                  //   handleSave(target);
                  //   return +target.value;
                  // });
                  // if (isPlaying) {
                  //   play();
                  //   setTrackProgress(0);
                  // }
                }}
              />
              <small className="navbar-text">
                x{Number.parseFloat(playbackRate).toFixed(2)}
              </small>
            </div>
          </>
        ) : null}

        <SummaryStyled className=" pt-2" style={{ gridColumn: '2 / span 3' }}>
          <small className="text-nowrap">1st</small>

          <Form.Control
            type="range"
            name="position"
            value={trackProgress}
            min="0"
            max={/* Math.floor(sound?.duration()) */ 0}
            step="1"
            onChange={({ target }) => {
              // sound?.seek(+target.value);
              // setTrackProgress(+target.value);
              // +target.value;
            }}
          />

          <small className="text-nowrap text-right">2nd</small>
        </SummaryStyled>
      </ControlsStyled>
    </AudioPlayerStyled>
  );
}
