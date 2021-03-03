import React, { useState, useMemo, useContext } from 'react';

import { AnthemnsContext } from 'providers/anthemns';
import { BIRTHDAY } from 'values';
import { Storage, generateGUID, Time, Slide } from 'utils';

function createKey({ id }) {
  return `${id}_birthday`;
}

function getRecent(now) {
  return Storage.getAll()
    .filter(({ key }) => key.includes('birthday'))
    .map((item) => item.value)
    .filter(({ month, day }) => {
      const year = now.getFullYear();
      const prev = new Date(2020, month - 1, day).setFullYear(year - 1);
      const curr = new Date(2020, month - 1, day).setFullYear(year);
      const next = new Date(2020, month - 1, day).setFullYear(year + 1);
      const remaining = Math.min(
        Math.abs(Time.diff(prev, now)),
        Math.abs(Time.diff(curr, now)),
        Math.abs(Time.diff(next, now))
      );

      return remaining <= BIRTHDAY.TIME_FRAME;
    })
    .sort(
      (a, b) =>
        new Date(a.month === 12 ? 2019 : 2020, a.month - 1, a.day).getTime() -
        new Date(b.month === 12 ? 2019 : 2020, b.month - 1, b.day).getTime()
    );
}

function createSlide(birthdays) {
  return birthdays.length
    ? Slide.create({
        id: 'BS_1',
        title: '<span class="fs-lg">🥳</span>/n¡Feliz Cumpleaños!',
        text: birthdays
          .map(({ name, day, month }) => {
            return `${name} <i>(${Time.formatBirthday(day, month)})</i>`;
          })
          .join('<br/>'),
        subtext: `Deseamos que Dios le${
          birthdays.length > 1 ? 's' : ''
        } bendiga.`,
        type: 'birthday',
      })
    : Slide.create({
        id: 'BS_2',
        text: `No hay cumpleaños que mostrar.`,
        type: 'birthday',
      });
}

function getAllBirthdays() {
  return Storage.getAll('desc')
    .filter(({ key }) => key.includes('birthday'))
    .map((item) => item.value)
    .sort((a, b) => {
      const d1 = new Date(`2021-${a.month}-${a.day}`).getTime();
      const d2 = new Date(`2021-${b.month}-${b.day}`).getTime();
      return d1 - d2;
    });
}

const BirthdayContext = React.createContext({});

const BirthdayProvider = ({ children }) => {
  const [recent, setRecent] = useState(getRecent(new Date()));
  const [current, setCurrent] = useState(createSlide(recent));
  const [birthdays, setBirthdays] = useState(getAllBirthdays());

  const { anthemns } = useContext(AnthemnsContext);
  const bDaySong = useMemo(() => anthemns[BIRTHDAY.ANTHEMN_INDEX], [anthemns]);

  const add = (data) => {
    data.id = generateGUID();
    data.type = 'birthday';
    data.birthday = Time.formatBirthday(data.day, data.month);

    Storage.set(createKey(data), data);

    const recent = getRecent(new Date());
    const slide = createSlide(recent);

    setCurrent(slide);
    setRecent(recent);
    setBirthdays(getAllBirthdays());
  };

  const remove = (item) => {
    Storage.remove(createKey(item));

    const recent = getRecent(new Date());
    const slide = createSlide(recent);

    setCurrent(slide);
    setRecent(recent);
    setBirthdays(getAllBirthdays());
  };

  return (
    <BirthdayContext.Provider
      value={{
        recent,
        current,
        bDaySong,
        birthdays,
        add,
        remove,
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
};

export { BirthdayContext, BirthdayProvider };
