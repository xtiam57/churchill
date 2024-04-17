import { PersonAddAlt, RemoveCircle } from '@mui/icons-material';
import {
  Alert,
  DisplayButton,
  List,
  Presenter,
  Sidebar,
  Title,
  Wrapper,
} from 'components';
import { useBirthday, usePresenter } from 'hooks';
import { useEffect, useState } from 'react';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { Time } from 'utils';
import { BROADCAST } from 'values';
import { BirthdayModal } from './modal';

const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useSettings = createPersistedState(BROADCAST.SETTINGS);

export default function BirthdaysPage() {
  const [, setMessage] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const { recent, current, birthdays, count, add, remove, toggle } =
    useBirthday();
  const [showModal, setShowModal] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const { presenting } = usePresenter();

  useEffect(() => {
    setMessage(showLogo ? null : current);
  }, [current, showLogo, setMessage]);

  useEffect(() => {
    return () => setMessage(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!presenting) {
      setShowLogo(true);
    }
  }, [presenting]);

  const handleSave = (data) => {
    add(data);
    setShowModal(false);
  };

  const handleDelete = (item) => {
    remove(item);
  };

  return (
    <Wrapper>
      <Sidebar>
        <Title>Cumpleaños</Title>

        <DisplayButton
          value={showLogo}
          presenting={presenting}
          onToggle={setShowLogo}
        />

        <Button
          block
          size="lg"
          onClick={() => setShowModal(true)}
          variant="success"
          className="mb-4"
        >
          <PersonAddAlt /> Agregar
        </Button>

        <List className="mb-4">
          {recent.length ? (
            <List.Item>
              <List.Title>recientes/próximos</List.Title>
            </List.Item>
          ) : null}

          {recent.map((item) => (
            <List.Item key={item.id}>
              <List.Text className="text-light">
                <Form.Check
                  className="d-inline-block"
                  type="switch"
                  id={item.id}
                  name="active"
                  checked={item.active}
                  onChange={() => {
                    toggle(item);
                  }}
                />
                {item.name}
              </List.Text>
              <List.Text>{Time.formatBirthday(item.day, item.month)}</List.Text>
            </List.Item>
          ))}
        </List>

        <List>
          {count ? (
            <List.Item>
              <List.Title className="text-warning">listado completo</List.Title>
            </List.Item>
          ) : null}

          {birthdays.map((item) => (
            <List.Item key={item.id}>
              <List.Text>
                <Form.Check
                  className="d-inline-block"
                  type="switch"
                  id={item.id}
                  name="active"
                  checked={item.active}
                  onChange={() => {
                    toggle(item);
                  }}
                />
                <span className="text-light">{item.name}</span> (
                {Time.formatBirthday(item.day, item.month)})
              </List.Text>
              <List.Action onClick={() => handleDelete(item)}>
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip>Quitar de la lista</Tooltip>}
                >
                  <RemoveCircle fontSize="small" />
                </OverlayTrigger>
              </List.Action>
            </List.Item>
          ))}
        </List>
      </Sidebar>

      {presenting ? <Alert presenting={!showLogo} label="cumpleaños" /> : null}

      <Wrapper direction="column" {...settings}>
        <Presenter
          id={current.id}
          live={!showLogo}
          text={current.text}
          subtext={current.subtext}
          grayscale={presenting && showLogo}
          {...settings}
        />

        <BirthdayModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={handleSave}
        />
      </Wrapper>
    </Wrapper>
  );
}
