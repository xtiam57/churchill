import { AlarmAdd, Close } from '@mui/icons-material';
import { Sidebar } from 'components';
import { useSettingsSidebar } from 'hooks';
import { Button } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { generateGUID } from 'utils';
import { BROADCAST } from 'values';
import { EntryContainer } from './EntryContainer';
import { EntryList } from './EntryList';

const useSchedule = createPersistedState(BROADCAST.SCHEDULES_AND_EVENTS);

export function Schedule() {
  const { toggleSchedule, showingSchedule, setRefreshSchedules } =
    useSettingsSidebar();

  const [schedules, setSchedules] = useSchedule(
    BROADCAST.INITIAL_SCHEDULES_AND_EVENTS
  );

  const handleSchedulesChangeValue = (name, value, index) => {
    schedules[index][name] = value;
    setSchedules([...schedules]);
    setRefreshSchedules([...schedules]);
  };

  const handleAdd = () => {
    schedules.push({
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

    setSchedules([...schedules]);
    setRefreshSchedules([...schedules]);
  };

  const handleDelete = (index) => {
    schedules.splice(index, 1);
    setSchedules([...schedules]);
    setRefreshSchedules([...schedules]);
  };

  const handleMoveUp = (currentIndex) => {
    if (currentIndex === 0) {
      return;
    }

    const newSchedules = [...schedules];
    const removed = newSchedules.splice(currentIndex, 1);
    newSchedules.splice(currentIndex - 1, 0, removed[0]);

    setSchedules(newSchedules);
    setRefreshSchedules(newSchedules);
  };

  const handleMoveDown = (currentIndex) => {
    if (currentIndex === schedules.length - 1) {
      return;
    }

    const newSchedules = [...schedules];
    const removed = newSchedules.splice(currentIndex, 1);
    newSchedules.splice(currentIndex + 1, 0, removed[0]);

    setSchedules(newSchedules);
    setRefreshSchedules(newSchedules);
  };

  return (
    <Sidebar
      light
      closable
      className={showingSchedule ? '' : 'closed'}
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
        onClick={toggleSchedule}
      >
        <Close />
      </Button>

      <EntryContainer>
        <EntryList
          onDelete={handleDelete}
          onChangeValue={handleSchedulesChangeValue}
          schedules={schedules}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
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
