import React, { useState, useRef } from 'react';
import createPersistedState from 'use-persisted-state';
import { Button, ButtonGroup } from 'react-bootstrap';
import * as ImIcons from 'react-icons/im';

import { Slider } from 'components/slider';
import { Sidebar } from 'components/sidebar';
import { Wrapper } from 'components/wrapper';
import { Controls } from 'components/controls';
import { List } from 'components/list';
import { Info } from 'components/info';

import { useKeyUp, useIterate } from 'hooks';
import { Slide } from 'utils';
import { BROADCAST, MOVEMENT } from 'values';

const useSettings = createPersistedState(BROADCAST.SETTINGS);

function HomeView() {
  const notices = [
    {
      id: 1,
      index: 0,
      type: 'notice',
      title: 'Recomendaciones',
      slides: [
        Slide.create({
          title: '',
          text:
            'Sea usted cordialmente/n<strong class="fs-xl" style="line-height:1">¡BIENVENIDO!</strong>/n a la Casa de Dios.',
        }),
        Slide.create({
          title: '<span class="fs-xl">📖</span>',
          text:
            'Cuando <strong>disfruta</strong> algo no desea <strong>interrupciones</strong>. La <strong>Palabra de Dios</strong> merece respeto.',
        }),
        Slide.create({
          title: '<span class="fs-xl">🤫🙊🤐</span>',
          text:
            '<strong>Evite conversar</strong> o hacer ruido durante el culto. Dios quiere hablarle.',
        }),
        Slide.create({
          title: '<span class="fs-xl">📱☎📣</span>',
          text:
            'Por favor <strong>apague su celular</strong> y evite usarlo durante el culto. Vino a ver a Dios no a su celular.',
        }),
        Slide.create({
          title: '<span class="fs-xl">🍫🍔🍿</span>',
          text:
            'Espere un poco más y <strong>no ingiera alimentos</strong> durante el culto.',
        }),
        Slide.create({
          title: '<span class="fs-xl">🪑🚶🪑</span>',
          text:
            'Permanezca en su lugar y <strong>no se levante durante el culto</strong>.',
        }),
        Slide.create({
          title: '<span class="fs-xl">👦👶👧</span>',
          text:
            'No deje que sus niños corran o jueguen durante el culto. <strong>Llévelos a su clase</strong>. Ellos también necesitan a Dios.',
        }),
        Slide.create({
          title: '<span class="fs-xl">🧻🧼🚽</span>',
          text:
            'Vaya a los servicios higiénicos <strong>antes o después</strong> del culto.',
        }),
        Slide.create({
          title: '<span class="fs-xl">⛪</span>',
          text:
            'Recuerde <strong>cuidar la Iglesia y sus instalaciones</strong>. No olvide que es la Casa de Dios.',
        }),
      ],
    },
    {
      id: 2,
      index: 1,
      type: 'notice',
      title: '¡Bautizo!',
      slides: [
        Slide.create({
          text:
            '<strong class="fs-xl" style="line-height:1">¡BAUTIZO!</strong>/n¡Hoy un pecador ha recibido a Cristo y <strong>ha decidido bautizarse</strong>!',
          subtext: 'Mateo 28:19',
        }),
        Slide.create({
          title: '<span class="fs-xl">🎉</span>',
          text: '¡Felicidades por su decisión!',
          subtext: 'Mateo 28:19',
        }),
      ],
    },
    {
      id: 3,
      index: 2,
      type: 'notice',
      title: 'Canto Especial',
      slides: [
        Slide.create({
          text:
            'Canto/n<strong class="fs-xl" style="line-height:1">ESPECIAL</strong>',
          subtext: 'Por favor permanezca en silencio durante la presentación.',
        }),
      ],
    },
    {
      id: 4,
      index: 3,
      type: 'notice',
      title: 'Dedicación',
      slides: [
        Slide.create({
          text:
            'Hoy tenemos una bonita/n<strong class="fs-xl" style="line-height:1">DEDICACIÓN</strong>',
          subtext: 'Felicidades a los padres por confiar su hijo(a) al Señor.',
        }),
      ],
    },
  ];

  const sliderRef = useRef();
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [showLogo, setShowLogo] = useState(true);
  const [notice, setNotice] = useState(notices[0]);
  const [autoplay, setAutoplay] = useState(true);
  const [loop, setLoop] = useState(true);
  const [moveNotice] = useIterate(notice, notices);

  const onPrevSlide = () => sliderRef.current.prev();

  const onNextSlide = () => sliderRef.current.next();

  const onNextNotice = () => {
    const notice = moveNotice(MOVEMENT.NEXT);
    setNotice(notice);
  };

  const onPrevNotice = () => {
    const notice = moveNotice(MOVEMENT.PREV);
    setNotice(notice);
  };

  useKeyUp('ArrowUp', onPrevNotice);
  useKeyUp('ArrowDown', onNextNotice);
  useKeyUp('Space', () => setAutoplay((state) => !state));

  return (
    <Wrapper>
      <Sidebar>
        <h1 className="text-light display-4">Inicio</h1>

        <Button
          className="my-3"
          block
          size="lg"
          variant={showLogo ? 'secondary' : 'warning'}
          onClick={() => setShowLogo((value) => !value)}
        >
          {showLogo ? 'Mostrar Anuncio' : 'Mostrar Logo'}
        </Button>

        <List className="mb-4">
          <List.Item>
            <List.Title>Anuncios</List.Title>
          </List.Item>

          {notices.map((item) => (
            <List.Item key={item.id}>
              <List.Action
                active={item.id === notice.id}
                onClick={() => setNotice(item)}
              >
                {item.title}
              </List.Action>
            </List.Item>
          ))}
        </List>
      </Sidebar>

      <Wrapper direction="column" {...settings}>
        <Info>
          {showLogo ? (
            <>
              Actualmente <strong>NO</strong> se está mostrando el anuncio al
              público.
            </>
          ) : (
            <>
              Actualmente se está mostrando el anuncio{' '}
              <strong>{notice.title}</strong> al público.
            </>
          )}
        </Info>

        <Slider
          ref={sliderRef}
          live={!showLogo}
          wrapper={notice}
          autoplay={autoplay}
          loop={loop}
        >
          Usa las teclas <strong>&larr;</strong> y <strong>&rarr;</strong> para
          cambiar de página, y <strong>&uarr;</strong> y <strong>&darr;</strong>{' '}
          para cambiar de anuncio.
        </Slider>

        <Controls centered>
          <ButtonGroup className="mx-2">
            {autoplay ? (
              <Button onClick={() => setAutoplay(false)} variant="light">
                <ImIcons.ImStop2 />
              </Button>
            ) : (
              <Button onClick={() => setAutoplay(true)} variant="secondary">
                <ImIcons.ImPlay3 />
              </Button>
            )}
          </ButtonGroup>

          <ButtonGroup>
            <Button onClick={onPrevSlide} variant="secondary">
              <ImIcons.ImArrowLeft2 />
            </Button>
            <Button onClick={onNextSlide} variant="secondary">
              <ImIcons.ImArrowRight2 />
            </Button>
          </ButtonGroup>

          <ButtonGroup className="mx-2">
            <Button
              onClick={() => setLoop((state) => !state)}
              variant={loop ? 'light' : 'secondary'}
            >
              <ImIcons.ImLoop />
            </Button>
          </ButtonGroup>
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}

export default HomeView;
