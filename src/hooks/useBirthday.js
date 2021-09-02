import { useContext, useEffect, useState, useCallback } from 'react';
import createPersistedState from 'use-persisted-state';

import { BirthdaysContext } from 'providers';
import { BROADCAST } from 'values';
import { BirthdayHelper as BH } from 'utils';

const useSettings = createPersistedState(BROADCAST.SETTINGS);

export function useBirthday() {
  const { now, bDaySong } = useContext(BirthdaysContext);
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const { birthdaytimeframe: frame } = settings;

  const [recent, setRecent] = useState(BH.getRecent(now, frame));
  const [current, setCurrent] = useState(BH.getSlide(recent, now, frame));
  const [birthdays, setBirthdays] = useState(BH.getAll());

  useEffect(() => {
    const recent = BH.getRecent(now, frame);
    const slide = BH.getSlide(recent, now, frame);

    setRecent(recent);

    setCurrent(slide);
  }, [now, frame]);

  const add = useCallback(
    (data) => {
      const { slide, recent, birthdays } = BH.add(data, now, frame);

      setCurrent(slide);
      setRecent(recent);
      setBirthdays(birthdays);
    },
    [now, frame]
  );

  const remove = useCallback(
    (item) => {
      const { slide, recent, birthdays } = BH.remove(item, now, frame);

      setCurrent(slide);
      setRecent(recent);
      setBirthdays(birthdays);
    },
    [now, frame]
  );

  const toggle = useCallback(
    (item) => {
      const { slide, recent, birthdays } = BH.toggle(item, now, frame);

      setCurrent(slide);
      setRecent(recent);
      setBirthdays(birthdays);
    },
    [now, frame]
  );

  return {
    recent,
    current,
    birthdays,
    count: birthdays.length,
    bDaySong,
    add,
    remove,
    toggle,
  };
}
