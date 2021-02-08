import { useContext, useMemo, useState, useEffect } from 'react';
import { AnthemnsContext } from 'providers/anthemns';
import { BIRTHDAY_ANTHEMN_INDEX, BIRTHDAY_FRAME } from 'values';
import { Storage, generateGUID, Time } from 'utils';

// const brothers = [
//   {
//     index: generateGUID(),
//     name: 'Hno. Christiam Mena',
//     day: 9,
//     month: 2,
//     birthday: '09/Feb',
//     type: 'birthday',
//   },
//   {
//     index: generateGUID(),
//     name: 'Hno. José Perales',
//     day: 3,
//     month: 2,
//     birthday: '03/Feb',
//     type: 'birthday',
//   },
//   {
//     index: generateGUID(),
//     name: 'Hna. Pepita Espinales',
//     day: 7,
//     month: 2,
//     birthday: '07/Feb',
//     type: 'birthday',
//   },
//   {
//     index: generateGUID(),
//     name: 'Hna. Susana Rodriguez',
//     day: 27,
//     month: 2,
//     birthday: '27/Feb',
//     type: 'birthday',
//   },
// ];

function getBirthdays(now) {
  // TODO get brothers from storage
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

export function useBirthday(now = new Date()) {
  const { anthemns } = useContext(AnthemnsContext);

  const birthdays = getBirthdays(now);
  const slide = useMemo(() => getSlide(birthdays), [birthdays]);

  // useEffect(() => {
  //   // setBirthdays(() => {
  //   //   const birthdays = getBirthdays(now);
  //   //   // setSlide(getSlide(birthdays));
  //   //   return birthdays;
  //   // });
  // }, [now]);

  const birthdayAnthemn = useMemo(() => anthemns[BIRTHDAY_ANTHEMN_INDEX], [
    anthemns,
  ]);

  return { birthdays, slide, birthdayAnthemn };
}
