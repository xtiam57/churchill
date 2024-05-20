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
import * as XLSX from 'xlsx';
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
  const [file, setFile] = useState(null);

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      // Assuming the first sheet is the one we need
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      parsedData.forEach((row) => {
        const { dia, día, mes, nombres } = row;
        add({
          name: nombres,
          day: día ?? dia,
          month: mes,
        });
      });

      setFile(null);
    };

    reader.readAsArrayBuffer(file);
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

        <List.Item className="mb-1">
          <List.Title>importar cumpleaños</List.Title>
        </List.Item>

        {file ? (
          <div className="rounded bg-primary text-white text-center p-2 mb-4">
            Importando...
          </div>
        ) : (
          <div className="mb-4">
            <Form.File
              id="import"
              label="Seleccione un archivo..."
              custom
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            />
            <small class="form-text text-muted">
              El archivo Excel debe tener las columnas "nombres", "dia" y "mes".
            </small>
          </div>
        )}

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
              <List.Title>listado completo</List.Title>
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
