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
import { CHANNEL_NAME, SETTINGS_NAME, SETTINGS_INITIAL_STATE } from 'values';
import { BirthdayModal } from './modal';

const useBroadcast = createPersistedState(CHANNEL_NAME);
const useSettings = createPersistedState(SETTINGS_NAME);

const getBirthdayItems = () => {
  return Storage.getAll('desc')
    .filter(({ key }) => key.includes('birthday'))
    .map((item) => item.value);
};

function BirthdaysView() {
  const [, setMessage] = useBroadcast(null);
  const [settings] = useSettings(SETTINGS_INITIAL_STATE);

  const [show, setShow] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const { birthdays, add, remove, slide } = useBirthday();
  const [birthdayItems, setBirthdayItems] = useState(getBirthdayItems());

  useEffect(() => {
    setMessage(showLogo ? null : slide);
  }, [slide, showLogo, setMessage]);

  useEffect(() => {
    return () => setMessage(null);
  }, [setMessage]);

  const onSave = (data) => {
    add(data);
    setShow(false);
    setBirthdayItems(getBirthdayItems());
  };
  const onDelete = (index) => {
    remove(index);
    setBirthdayItems(getBirthdayItems());
  };

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

        <List>
          {birthdayItems.length ? (
            <List.Item>
              <List.Title className="text-warning">listado completo</List.Title>
            </List.Item>
          ) : null}

          {birthdayItems.map(({ index, name, day, month }) => (
            <List.Item key={index}>
              <List.Text>
                <span className="text-light">{name}</span> (
                {Time.formatBirthday(day, month)})
              </List.Text>
              <List.Action onClick={() => onDelete(index)}>
                <RiCloseFill />
              </List.Action>
            </List.Item>
          ))}
        </List>
      </Sidebar>

      <Wrapper direction="column" {...settings}>
        <Alert
          className="m-0"
          variant={showLogo ? 'secondary ' : 'warning'}
          style={{ borderRadius: 0 }}
        >
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
              onClick={() => setShowLogo((value) => !value)}
            >
              {showLogo ? 'Mostrar' : 'No Mostrar'}
            </Button>
          </div>
        </Alert>

        <Presenter subtext={slide.subtext} type={slide.type} {...settings}>
          {slide.text}
        </Presenter>

        <Controls centered>
          <Button onClick={() => setShow(true)} variant="secondary">
            <ImUserPlus />
          </Button>

          <BirthdayModal
            show={show}
            handleClose={() => setShow(false)}
            handleSave={onSave}
          />
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}

export default BirthdaysView;
