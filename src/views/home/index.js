import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Alert } from 'react-bootstrap';
import {
  ImArrowLeft2,
  ImArrowRight2,
  ImPlay3,
  ImStop2,
  ImLoop,
} from 'react-icons/im';

import { Slider } from 'components/slider';
import { Sidebar } from 'components/sidebar';
import { Wrapper } from 'components/wrapper';
import { Controls } from 'components/controls';
import { List } from 'components/list';

import { useKeyDown, useIterate } from 'hooks';
import { Slide } from 'utils';

const notices = [
  {
    id: 0,
    index: 0,
    type: 'notice',
    title: 'Recomendaciones',
    slides: [
      Slide.create({
        index: 0,
        title: 'Recomendaciones',
        text:
          'Evite hablar o hacer ruido durante el culto. Dios quiere hablarle.',
      }),
      Slide.create({
        index: 1,
        title: 'Recomendaciones',
        text: 'Por favor apague su celular y evite usarlos durante el culto.',
      }),
      Slide.create({
        index: 2,
        title: 'Recomendaciones',
        text: 'No ingerir alimentos durante el culto.',
      }),
      Slide.create({
        index: 3,
        title: 'Recomendaciones',
        text:
          'No se levante durante el culto. Vaya al baño antes o después del mismo.',
      }),
      Slide.create({
        index: 4,
        title: 'Recomendaciones',
        text:
          'No deje que sus niños corran o jueguen durante el culto. Llévelos a sus salones.',
      }),
      Slide.create({
        index: 5,
        title: 'Recomendaciones',
        text:
          'Cuida tu Iglesia y sus instalaciones, recuerda que es la Casa de Dios.',
      }),
    ],
  },
  {
    id: 1,
    index: 1,
    type: 'notice',
    title: 'Prueba de anuncio',
    slides: [
      Slide.create({ index: 0, title: '#1', text: 'lamina 1' }),
      Slide.create({
        index: 1,
        title: null,
        text: '<img src="/corriente.jpg" />',
      }),
      Slide.create({ index: 2, title: '#3', text: 'lamina 3' }),
    ],
  },
  {
    id: 2,
    index: 2,
    type: 'notice',
    title: 'Banquete de San Valentín',
    slides: [
      Slide.create({
        index: 0,
        title: 'Banquete de San Valentin',
        text: 'Están todas las parejas invitadas al banquete de San Valentín.',
        subtext: 'Sábado 14/Feb, 06:00 PM',
      }),
      Slide.create({
        index: 1,
        title: 'Costo',
        text: 'S/50, incluye comida y transporte.',
        subtext: 'Sábado 14/Feb, 06:00 PM',
      }),
    ],
  },
];

function HomeView() {
  const [showLogo, setShowLogo] = useState(true);
  const [notice, setNotice] = useState(notices[0]);
  const [slide, setSlide] = useState(notice.slides[0]);
  const [autoplay, setAutoplay] = useState(false);
  const [loop, setLoop] = useState(true);
  const [moveSlide] = useIterate(slide, notice.slides);
  const [moveNotice] = useIterate(notice, notices);

  useEffect(() => {
    setSlide(notice.slides[0]);
  }, [notice]);

  const onPrevSlide = () => {
    const slide = moveSlide(-1, loop);
    setSlide(slide);
  };

  const onNextSlide = () => {
    const slide = moveSlide(1, loop);
    setSlide(slide);
  };

  const onPrevNotice = () => {
    const notice = moveNotice(1);
    setNotice(notice);
  };

  const onNextNotice = () => {
    const notice = moveNotice(-1);
    setNotice(notice);
  };

  useKeyDown('ArrowUp', onNextNotice);
  useKeyDown('ArrowDown', onPrevNotice);
  useKeyDown('Space', () => setAutoplay((state) => !state));

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

      <Wrapper direction="column">
        <Alert className="m-0 br-0" variant="secondary">
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
        </Alert>

        <Slider
          live={!showLogo}
          wrapper={notice}
          autoplay={autoplay}
          loop={loop}
          value={slide}
          onChange={setSlide}
        >
          Usa las teclas <strong>&larr;</strong> y <strong>&rarr;</strong> para
          cambiar de página, y <strong>&uarr;</strong> y <strong>&darr;</strong>{' '}
          para cambiar de anuncio.
        </Slider>

        <Controls centered>
          <ButtonGroup className="mx-2">
            {autoplay ? (
              <Button onClick={() => setAutoplay(false)} variant="light">
                <ImStop2 />
              </Button>
            ) : (
              <Button onClick={() => setAutoplay(true)} variant="secondary">
                <ImPlay3 />
              </Button>
            )}
          </ButtonGroup>

          <ButtonGroup>
            <Button onClick={onPrevSlide} variant="secondary">
              <ImArrowLeft2 />
            </Button>
            <Button onClick={onNextSlide} variant="secondary">
              <ImArrowRight2 />
            </Button>
          </ButtonGroup>

          <ButtonGroup className="mx-2">
            <Button
              onClick={() => setLoop((state) => !state)}
              variant={loop ? 'light' : 'secondary'}
            >
              <ImLoop />
            </Button>
          </ButtonGroup>
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}

export default HomeView;
