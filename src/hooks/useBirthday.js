import { useContext, useEffect, useState, useCallback } from 'react';
import createPersistedState from 'use-persisted-state';

import { BirthdaysContext } from 'providers';
import { BROADCAST } from 'values';
import { BirthdayHelper } from 'utils';

const useSettings = createPersistedState(BROADCAST.SETTINGS);

export function useBirthday() {
  const { now, bDaySong } = useContext(BirthdaysContext);
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const { birthdaytimeframe: frame } = settings;

  const [recent, setRecent] = useState([]);
  const [current, setCurrent] = useState({});
  const [birthdays, setBirthdays] = useState(BirthdayHelper.getAll());

  useEffect(() => {
    const recent = BirthdayHelper.getRecent(now, frame);
    const slide = BirthdayHelper.getSlide(recent, now, frame);

    setRecent(recent);

    setCurrent(slide);
  }, [now, frame]);

  const add = useCallback(
    (data) => {
      const { slide, recent, birthdays } = BirthdayHelper.add(data, now, frame);

      setCurrent(slide);
      setRecent(recent);
      setBirthdays(birthdays);
    },
    [now, frame]
  );

  const remove = useCallback(
    (item) => {
      const { slide, recent, birthdays } = BirthdayHelper.remove(
        item,
        now,
        frame
      );

      setCurrent(slide);
      setRecent(recent);
      setBirthdays(birthdays);
    },
    [now, frame]
  );

  const toggle = useCallback(
    (item) => {
      const { slide, recent, birthdays } = BirthdayHelper.toggle(
        item,
        now,
        frame
      );

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
    quantity: birthdays.length,
    bDaySong,
    add,
    remove,
    toggle,
  };
}
