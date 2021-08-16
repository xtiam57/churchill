import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';

import { ImUserPlus } from 'react-icons/im';
import { RiCloseFill } from 'react-icons/ri';

import { Wrapper } from 'components/wrapper';
import { Presenter } from 'components/presenter';
import { Controls } from 'components/controls';
import { Sidebar } from 'components/sidebar';
import { List } from 'components/list';
import { Info } from 'components/info';

import { useBirthday, usePresenter } from 'hooks';
import { Time } from 'utils';
import { BROADCAST } from 'values';
import { BirthdayModal } from './modal';

const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useSettings = createPersistedState(BROADCAST.SETTINGS);

export default function BirthdaysPage() {
  const [, setMessage] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [showModal, setShowModal] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const { current, recent, add, remove, birthdays } = useBirthday();
  const { presenting } = usePresenter();

  useEffect(() => {
    setMessage(showLogo ? null : current);
  }, [current, showLogo, setMessage]);

  useEffect(() => {
    return () => setMessage(null);
  }, []);

  useEffect(() => {
    if (!presenting) {
      setShowLogo(true);
    }
  }, [presenting]);

  const onSave = (data) => {
    add(data);
    setShowModal(false);
  };

  const onDelete = (item) => {
    remove(item);
  };

  return (
    <Wrapper>
      <Sidebar>
        <h1 className="text-light display-4">Cumples</h1>

        <Button
          className={showLogo && presenting ? 'my-3 pulse' : 'my-3'}
          block
          size="lg"
          variant={showLogo ? 'secondary' : 'warning'}
          onClick={() => setShowLogo((value) => !value)}
          disabled={!presenting}
        >
          {showLogo ? 'Proyectar' : 'Mostrar Logo'}
        </Button>

        <List className="mb-4">
          {recent.length ? (
            <List.Item>
              <List.Title>recientes/próximos</List.Title>
            </List.Item>
          ) : null}

          {recent.map(({ id, name, day, month }) => (
            <List.Item key={id}>
              <List.Text className="text-light">{name}</List.Text>
              <List.Text>{Time.formatBirthday(day, month)}</List.Text>
            </List.Item>
          ))}
        </List>

        <List>
          {birthdays.length ? (
            <List.Item>
              <List.Title className="text-warning">listado completo</List.Title>
            </List.Item>
          ) : null}

          {birthdays.map((item) => (
            <List.Item key={item.id}>
              <List.Text>
                <span className="text-light">{item.name}</span> (
                {Time.formatBirthday(item.day, item.month)})
              </List.Text>
              <List.Action onClick={() => onDelete(item)}>
                <RiCloseFill />
              </List.Action>
            </List.Item>
          ))}
        </List>
      </Sidebar>

      <Wrapper direction="column" {...settings}>
        {/* <Info live={!showLogo}>
          {showLogo ? (
            <>
              Actualmente <strong>NO</strong> se están mostrando los
              cumpleañeros al público.
            </>
          ) : (
            <>Actualmente se están mostrando los cumpleañeros al público.</>
          )}
        </Info> */}

        <Presenter
          id={current.id}
          live={!showLogo}
          text={current.text}
          subtext={current.subtext}
          grayscale={presenting && showLogo}
          {...settings}
        />

        <Controls centered>
          <Button onClick={() => setShowModal(true)} variant="secondary">
            <ImUserPlus /> Agregar
          </Button>

          <BirthdayModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleSave={onSave}
          />
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}
