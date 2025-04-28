import { AlarmAdd, Close } from '@mui/icons-material';
import { Sidebar } from 'components';
import { Button } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { generateGUID } from 'utils';
import { BROADCAST } from 'values';
import { EntryContainer } from './EntryContainer';
import { EntryList } from './EntryList';

const useResources = createPersistedState(BROADCAST.RESOURCES);

export function ResourcesBar({ opened }) {
  const [resources, setResources] = useResources(BROADCAST.INITIAL_RESOURCES);

  const handleSchedulesChangeValue = (name, value, index) => {
    resources[index][name] = value;
    setResources([...resources]);
  };

  const handleAdd = () => {
    resources.push({
      id: generateGUID(),
      name: '',
      day: 'Domingo',
      hour: '01:00',
      hourSuffix: 'AM',
      type: 'SCHEDULE',
      background: null,
      date: null,
      active: true,
      repeat: 0,
    });

    setResources([...resources]);
  };

  const handleDelete = (index) => {
    resources.splice(index, 1);
    setResources([...resources]);
  };

  return (
    <Sidebar
      light
      closable
      className={opened ? '' : 'closed'}
      size={600}
      offset={320 + 55}
    >
      <h1 className="display-4">
        Anuncios{' '}
        {/* <small className="text-muted">
          ({schedules?.filter((s) => s.active).length}/{schedules?.length})
        </small> */}
      </h1>

      <p className="text-muted">
        La resolución recomendada para las imagenes de fondo es de{' '}
        <strong>1920x1080</strong> o <strong>1280×720</strong>.
      </p>

      <Button
        className="p-0 text-dark"
        variant="link"
        style={{ position: 'absolute', top: 13, right: 10 }}
        // onClick={toggleSchedule}
      >
        <Close />
      </Button>

      <EntryContainer>
        <EntryList
          onDelete={handleDelete}
          onChangeValue={handleSchedulesChangeValue}
          schedules={resources}
        />
      </EntryContainer>

      <Button
        block
        size="lg"
        className="m-0 mt-3"
        variant="success"
        onClick={handleAdd}
      >
        <AlarmAdd /> Agregar
      </Button>
    </Sidebar>
  );
}
