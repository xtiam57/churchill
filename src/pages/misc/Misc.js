import {
  Alert,
  DisplayButton,
  List,
  Presenter,
  Sidebar,
  Title,
  Wrapper,
} from 'components';
import { usePresenter } from 'hooks';
import { useState } from 'react';
import createPersistedState from 'use-persisted-state';
import { BROADCAST } from 'values';

const useSettings = createPersistedState(BROADCAST.SETTINGS);
const useSchedule = createPersistedState(BROADCAST.SCHEDULES_AND_EVENTS);

export default function MiscPage() {
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [showLogo, setShowLogo] = useState(true);
  const { presenting } = usePresenter();
  const current = null;

  return (
    <Wrapper>
      <Sidebar>
        <Title>Recursos</Title>

        <DisplayButton
          value={showLogo}
          presenting={presenting}
          onToggle={setShowLogo}
        />

        <List className="mb-4">
          <List.Image
            src="https://picsum.photos/200/200?random=1"
            title="Mapa de viajes 1"
            description="Descripción del mapa de viajes 1"
          />
          <List.Image
            src="https://picsum.photos/400/200?random=2"
            title="Mapa de viajes 2"
            description="Descripción del mapa de viajes 1"
          />
          <List.Image
            src="https://picsum.photos/200/400?random=3"
            title="Foto de Pablo"
            description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam reiciendis sed cum exercitationem possimus placeat velit laborum iste aperiam, doloremque consequuntur fugiat obcaecati quisquam maxime officia unde suscipit nisi eveniet!"
          />
        </List>
      </Sidebar>

      {presenting ? (
        <Alert presenting={!showLogo} label={current?.title} />
      ) : null}

      <Wrapper direction="column" {...settings}>
        <Presenter
          id={current?.id}
          live={!showLogo}
          text={current?.text}
          subtext={current?.subtext}
          processedText={current?.processedText}
          grayscale={presenting && showLogo}
          {...settings}
        />

        {/* <Controls centered>
          <ButtonGroup className="mx-2">
            {autoplay ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Pausar cambio automático</Tooltip>}
              >
                <Button onClick={() => setAutoplay(false)} variant="secondary">
                  <Pause />
                </Button>
              </OverlayTrigger>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Empezar cambio automático</Tooltip>}
              >
                <Button onClick={() => setAutoplay(true)} variant="dark">
                  <PlayArrow />
                </Button>
              </OverlayTrigger>
            )}
          </ButtonGroup>

          <ButtonGroup>
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

          <ButtonGroup className="mx-2">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Repetir</Tooltip>}
            >
              <Button
                onClick={() => setLoop((state) => !state)}
                variant={loop ? 'secondary' : 'dark'}
              >
                <Repeat />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
        </Controls> */}
      </Wrapper>
    </Wrapper>
  );
}
