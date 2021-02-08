import { useContext, useState, useMemo } from 'react';
import { AnthemnsContext } from 'providers/anthemns';
import { BIRTHDAY_ANTHEMN_INDEX, BIRTHDAY_FRAME } from 'values';
import { Storage, generateGUID, Time } from 'utils';

function createStorageKey(index) {
  return `${index}_birthday`;
}

function getBirthdays(now) {
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

      return remaining <= BIRTHDAY_FRAME;
    })
    .sort(
      (a, b) =>
        new Date(a.month === 12 ? 2019 : 2020, a.month - 1, a.day).getTime() -
        new Date(b.month === 12 ? 2019 : 2020, b.month - 1, b.day).getTime()
    );
}

function getSlide(birthdays) {
  return {
    text: `<strong class="text-primary">¡Feliz Cumpleaños!</strong><br/>
          ${birthdays
            .map(({ name, day, month }) => {
              return `${name} <span class="text-muted">(${Time.formatBirthday(
                day,
                month
              )})</span>`;
            })
            .join('<br/>')}`,
    subtext: `Deseamos que Dios le${birthdays.length > 1 ? 's' : ''} bendiga.`,
    type: 'birthday',
  };
}

export function useBirthday() {
  const [now, setNow] = useState(new Date());
  const birthdays = getBirthdays(now);
  const [slide, setSlide] = useState(getSlide(birthdays));

  const { anthemns } = useContext(AnthemnsContext);
  const birthdayAnthemn = useMemo(() => anthemns[BIRTHDAY_ANTHEMN_INDEX], [
    anthemns,
  ]);

  const add = (data) => {
    data.index = generateGUID(true);
    data.type = 'birthday';
    data.birthday = Time.formatBirthday(data.day, data.month);

    Storage.set(createStorageKey(data.index), data);

    const birthdays = getBirthdays(now);
    const slide = getSlide(birthdays);

    setSlide(slide);
  };

  const remove = (index) => {
    Storage.remove(createStorageKey(index));

    const birthdays = getBirthdays(now);
    const slide = getSlide(birthdays);

    setSlide(slide);
  };

  return { birthdays, slide, setSlide, add, remove, birthdayAnthemn };
}
