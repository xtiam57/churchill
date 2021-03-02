import { useContext, useState, useMemo } from 'react';
import { AnthemnsContext } from 'providers/anthemns';
import { BIRTHDAY } from 'values';
import { Storage, generateGUID, Time, Slide } from 'utils';

function createKey({ id }) {
  return `${id}_birthday`;
}

function getRecentBDays(now) {
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
        title: '¡Feliz Cumpleaños!',
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
        text: `No hay cumpleaños que mostrar.`,
        type: 'birthday',
      });
}

export function useBirthday() {
  const [now] = useState(new Date());
  const recent = getRecentBDays(now);
  const [current, setCurrent] = useState(createSlide(recent));

  const { anthemns } = useContext(AnthemnsContext);
  const birthdayAnthemn = useMemo(() => anthemns[BIRTHDAY.ANTHEMN_INDEX], [
    anthemns,
  ]);

  const add = (data) => {
    data.id = generateGUID();
    data.type = 'birthday';
    data.birthday = Time.formatBirthday(data.day, data.month);

    Storage.set(createKey(data), data);

    const birthdays = getRecentBDays(now);
    const slide = createSlide(birthdays);

    setCurrent(slide);
  };

  const remove = (item) => {
    Storage.remove(createKey(item));

    const birthdays = getRecentBDays(now);
    const slide = createSlide(birthdays);

    setCurrent(slide);
  };

  return {
    recent,
    current,
    setCurrent,
    add,
    remove,
    birthdayAnthemn,
  };
}
