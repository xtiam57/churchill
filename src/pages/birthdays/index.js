import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';

import { ImUserPlus } from 'react-icons/im';
import { RiCloseFill } from 'react-icons/ri';

import { Wrapper } from 'components/wrapper';
import { Presenter } from 'components/presenter';
import { Controls } from 'components/controls';
import { Sidebar } from 'components/sidebar';
import { List } from 'components/list';

import { useBirthday } from 'hooks';
import { Time, Storage } from 'utils';
import { BROADCAST } from 'values';
import { BirthdayModal } from './modal';

const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useSettings = createPersistedState(BROADCAST.SETTINGS);

function getBirthdayItems() {
  return Storage.getAll('desc')
    .filter(({ key }) => key.includes('birthday'))
    .map((item) => item.value);
}

function BirthdaysView() {
  const [, setMessage] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [showModal, setShowModal] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const { current, recent, add, remove } = useBirthday();
  const [birthdayItems, setBirthdayItems] = useState(getBirthdayItems());

  useEffect(() => {
    setMessage(showLogo ? null : current);
  }, [current, showLogo, setMessage]);

  useEffect(() => {
    return () => setMessage(null);
  }, []);

  const onSave = (data) => {
    add(data);
    setShowModal(false);
    setBirthdayItems(getBirthdayItems());
  };

  const onDelete = (item) => {
    remove(item);
    setBirthdayItems(getBirthdayItems());
  };

  return (
    <Wrapper>
      <Sidebar>
        <h1 className="text-light display-4">Cumpleaños</h1>

        <Button
          className="my-3"
          block
          size="lg"
          variant={showLogo ? 'secondary' : 'warning'}
          onClick={() => setShowLogo((value) => !value)}
        >
          {showLogo ? 'Mostrar Cumpleaños' : 'Mostrar Logo'}
        </Button>

        <List className="mb-4">
          {recent.length ? (
            <List.Item>
              <List.Title>recientes/próximos</List.Title>
            </List.Item>
          ) : null}

          {recent.map(({ name, day, month }, index) => (
            <List.Item key={index}>
              <List.Text className="text-light">{name}</List.Text>
              <List.Text>{Time.formatBirthday(day, month)}</List.Text>
            </List.Item>
          ))}
        </List>

        <List>
          {birthdayItems.length ? (
            <List.Item>
              <List.Title className="text-warning">listado completo</List.Title>
            </List.Item>
          ) : null}

          {birthdayItems.map((item) => (
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
        <Alert className="m-0 br-0" variant="secondary">
          {showLogo ? (
            <>
              Actualmente <strong>NO</strong> se están mostrando los
              cumpleañeros al público.
            </>
          ) : (
            <>Actualmente se están mostrando los cumpleañeros al público.</>
          )}
        </Alert>

        <Presenter live={!showLogo} subtext={current.subtext} {...settings}>
          {current.text}
        </Presenter>

        <Controls centered>
          <Button onClick={() => setShowModal(true)} variant="secondary">
            <ImUserPlus />
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

export default BirthdaysView;
