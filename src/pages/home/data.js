import { Slide, Time } from 'utils';

const NOTICES = [
  {
    id: 1,
    index: 0,
    tag: 'WELCOME',
    type: 'notice',
    title: 'Bienvenida',
    slides: [
      Slide.create({
        title: '<span class="fs-xl">👨‍👩‍👧‍👦</span>',
        text: '<strong class="fs-xlg" style="line-height:1">¡BIENVENIDO!</strong>/nA la Casa de Dios',
      }),
      Slide.create({
        title: '<span class="fs-xl">📖</span>',
        text: 'Cuando <b>disfruta</b> algo no desea <b>interrupciones</b>. La <b>Palabra de Dios</b> merece respeto.',
      }),
      Slide.create({
        title: '<span class="fs-xl">🤐</span>',
        text: '<b>Evite conversar</b> o hacer ruido durante el culto. Dios quiere hablarle.',
      }),
      Slide.create({
        title: '<span class="fs-xl">📱</span>',
        text: 'Por favor <b>apague su celular</b> y evite usarlo durante el culto. Vino a ver a Dios no a su Facebook.',
      }),
      Slide.create({
        title: '<span class="fs-xl">🍗🍔🍬</span>',
        text: 'Espere un poco más y <b>no ingiera alimentos</b> durante el culto.',
      }),
      Slide.create({
        title: '<span class="fs-xl">🪑🪑🪑</span>',
        text: 'Permanezca en su lugar y <b>no se levante durante la predicación</b>.',
      }),
      Slide.create({
        title: '<span class="fs-xl">👦🏽👶🏼👧🏾</span>',
        text: 'No deje que sus niños corran o jueguen durante el culto. <b>Llévelos a su clase</b>. Ellos también necesitan a Dios.',
      }),
      Slide.create({
        title: '<span class="fs-xl">🧻🧼🚽</span>',
        text: 'Vaya a los servicios higiénicos <b>antes o después</b> de la predicación.',
      }),
      Slide.create({
        title: '<span class="fs-xl">⛪</span>',
        text: 'Recuerde <b>cuidar la Iglesia y sus instalaciones</b>. No olvide que es la Casa de Dios.',
      }),
    ],
  },
  {
    id: 2,
    index: 1,
    tag: 'BAPTISM',
    type: 'notice',
    title: 'Bautizo',
    slides: [
      Slide.create({
        text: '<strong class="fs-xl" style="line-height:1">¡BAUTIZO!</strong>/n¡La iglesia toda se goza con tu decisión!',
        subtext: 'Mateo 28:19',
      }),
    ],
  },
  {
    id: 3,
    index: 2,
    tag: 'SPECIAL_SONG',
    type: 'notice',
    title: 'Canto Especial',
    slides: [
      Slide.create({
        text: 'CANTO/n<strong class="fs-xl" style="line-height:1">ESPECIAL</strong>',
        subtext: 'Por favor permanezca en silencio durante la presentación.',
      }),
    ],
  },
  {
    id: 4,
    index: 3,
    tag: 'BIRTHDAYS',
    type: 'notice',
    title: 'Cumpleaños',
    slides: [],
  },
  {
    id: 5,
    index: 4,
    tag: 'SCHEDULES',
    type: 'notice',
    title: 'Todos los Anuncios',
    slides: [],
    openSchedule: true,
  },
];

export function getNotices(birthdaySlide) {
  const notices = JSON.parse(JSON.stringify(NOTICES));

  notices[3].slides.push(birthdaySlide);

  return notices;
}
export function getScheduleText(entry) {
  return entry.type === 'POSTER'
    ? ''
    : `${entry.name ? `${entry.name}/n` : ''}
      <b>${
        entry.type === 'SCHEDULE'
          ? entry.day
          : entry.date
          ? Time.formatDate(entry.date + 'T23:59:59')
          : 'Todos los días'
      }</b>/n
      <strong class="fs-xl" style="line-height:1">
        ${entry.hour} ${entry.hourSuffix}
      </strong>
      `;
}
