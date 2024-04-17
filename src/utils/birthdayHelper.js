import { Slide, Storage, Time, generateGUID } from 'utils';

export const BirthdayHelper = {};

BirthdayHelper.getRecent = (now, frame = 3) => {
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

      return remaining <= frame;
    })
    .sort(
      (a, b) =>
        new Date(a.month === 12 ? 2019 : 2020, a.month - 1, a.day).getTime() -
        new Date(b.month === 12 ? 2019 : 2020, b.month - 1, b.day).getTime()
    );
};

BirthdayHelper.getSlide = (
  birthdays,
  now = new Date(),
  frame = 3,
  suffix = ''
) => {
  const bdays = birthdays.filter((item) => item.active);

  return bdays.length
    ? Slide.create({
        id: `BS_${frame}_${now.getTime()}${suffix}`,
        title: '<span class="fs-lg">🥳</span>/n¡Feliz Cumpleaños!',
        text: bdays
          .map(({ name, day, month }) => {
            return `${name} <i>(${Time.formatBirthday(day, month)})</i>`;
          })
          .join('/n'),
        // subtext: `Deseamos que Dios le${bdays.length > 1 ? 's' : ''} bendiga.`,
        type: 'birthday',
        count: bdays.length,
      })
    : Slide.create({
        id: 'BS_404',
        text: `No hay cumpleaños que mostrar.`,
        type: 'birthday',
        count: 0,
      });
};

BirthdayHelper.getAll = () => {
  return Storage.getAll()
    .filter(({ key }) => key.includes('birthday'))
    .map((item) => item.value)
    .sort((a, b) => {
      const d1 = new Date(`2021-${a.month}-${a.day}`).getTime();
      const d2 = new Date(`2021-${b.month}-${b.day}`).getTime();
      return d1 - d2;
    });
};

BirthdayHelper.add = (data, now = new Date(), frame = 3) => {
  data.id = generateGUID();
  data.type = 'birthday';
  data.birthday = Time.formatBirthday(data.day, data.month);
  data.active = true;

  Storage.set(createKey(data), data);

  const recent = BirthdayHelper.getRecent(now, frame);

  const slide = BirthdayHelper.getSlide(recent, now, frame, data.id);

  const birthdays = BirthdayHelper.getAll();

  return { slide, recent, birthdays };
};

BirthdayHelper.remove = (item, now = new Date(), frame = 3) => {
  Storage.remove(createKey(item));

  const recent = BirthdayHelper.getRecent(now, frame);

  const slide = BirthdayHelper.getSlide(recent, now, frame, item.id);

  const birthdays = BirthdayHelper.getAll();

  return { slide, recent, birthdays };
};

BirthdayHelper.toggle = (item, now = new Date(), frame = 3) => {
  item.active = !item.active;

  Storage.set(createKey(item), item);

  const recent = BirthdayHelper.getRecent(now, frame);

  const slide = BirthdayHelper.getSlide(
    recent,
    now,
    frame,
    item.id + item.active
  );

  const birthdays = BirthdayHelper.getAll();

  return { slide, recent, birthdays };
};

function createKey({ id }) {
  return `${id}_birthday`;
}
