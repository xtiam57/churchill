import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Alert, Form } from 'react-bootstrap';

import { ImPlus } from 'react-icons/im';

import { Wrapper } from 'components/wrapper';
import { Presenter } from 'components/presenter';
import { Controls } from 'components/controls';
import { Sidebar } from 'components/sidebar';
import { List } from 'components/list';

import { usePresenter, useChannel, useBirthday } from 'hooks';
import { Time } from 'utils';

function BirthdaysView() {
  const [showLogo, setShowLogo] = useState(true);
  const { setLastBroadcast } = usePresenter();
  const channel = useChannel();
  const { birthdays, slide } = useBirthday();

  useEffect(() => {
    return () => {
      setLastBroadcast(null);
    };
  }, [setLastBroadcast]);

  useEffect(() => {
    return () => {
      channel.postMessage(null);
      channel.close();
    };
  }, [channel]);

  // useEffect(() => {
  //   const value = showLogo ? null : slide;
  //   setLastBroadcast(value);
  //   channel.postMessage(value);
  // }, [channel, setLastBroadcast, showLogo, slide]);

  const toggleLogo = () => setShowLogo((value) => !value);

  const onAdd = () => {};

  return (
    <Wrapper>
      <Sidebar>
        <h1 className="text-light display-4">Cumpleaños</h1>

        <List>
          {birthdays.length ? (
            <List.Item>
              <List.Title>recientes/próximos</List.Title>
            </List.Item>
          ) : null}

          {birthdays.map(({ name, day, month }, index) => (
            <List.Item key={index}>
              <List.Text className="text-light">{name}</List.Text>
              <List.Text>{Time.formatBirthday(day, month)}</List.Text>
            </List.Item>
          ))}
        </List>
      </Sidebar>

      <Wrapper direction="column">
        <Alert className="m-0" variant={showLogo ? 'secondary ' : 'warning'}>
          <div className="d-flex align-items-center justify-content-between">
            {showLogo ? (
              <span>
                Actualmente <strong>NO</strong> se están mostrando los
                cumpleañeros al público.
              </span>
            ) : (
              <span>
                Actualmente se están mostrando los cumpleañeros al público.
              </span>
            )}
            <Button
              size="sm"
              variant={showLogo ? 'secondary' : 'warning'}
              onClick={toggleLogo}
            >
              {showLogo ? 'Mostrar' : 'No Mostrar'}
            </Button>
          </div>
        </Alert>

        <Presenter subtext={slide.subtext} type={slide.type}>
          {slide.text}
        </Presenter>

        <Controls centered>
          <Button onClick={onAdd} variant="secondary">
            <ImPlus />
          </Button>
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}

export default BirthdaysView;
