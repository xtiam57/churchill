import { generateGUID } from 'utils';
import { TEST_EVENT_POSTER } from './event64';
import { BACKGROUNDS } from './images';

export const DEFAULT_SYSTEM_FONT =
  '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';

export const MOVEMENT = {
  NEXT: '>',
  PREV: '<',
};

export const BIRTHDAY = {
  HYMNAL_INDEX: 508,
};

export const MAX_BOOKMARKS = 15;

export const THEMES = {
  dark: {
    background: '#233d57',
    textcolor: '#ffffff',
    titlecolor: '#ff8a65',
    subtextcolor: '#8be1f0',
    jesus: '#00FF84',
    optionscolor: '#99cccc',
    mode: '#ffffff',
  },
  light: {
    background: '#ffffff',
    textcolor: '#000000',
    titlecolor: '#007bff',
    subtextcolor: '#007bff',
    jesus: '#ED2079',
    optionscolor: '#ffff00',
    mode: 'default',
  },
  cobalt: {
    background: '#19354A',
    textcolor: '#FFC603',
    titlecolor: '#ff9900',
    subtextcolor: '#ffffff',
    jesus: '#00FF84',
    optionscolor: '#ffff00',
    mode: '#ffffff',
  },
  pinguin: {
    background: '#000000',
    textcolor: '#ffffff',
    titlecolor: '#ff8a65',
    subtextcolor: '#ffff00',
    jesus: '#00FF84',
    optionscolor: '#ffff00',
    mode: '#ffffff',
  },

  christmas: {
    background: '#7b0410',
    textcolor: '#ffffff',
    titlecolor: '#27cd16',
    subtextcolor: '#ffff00',
    jesus: '#00FF84',
    optionscolor: '#ffff00',
    mode: '#ffffff',
  },
};

const SETTINGS_INITIAL_STATE = {
  interval: 10000,
  font: '',
  blur: 5,
  logo: 'churchill',
  customlogo: null,
  logoheight: 60,
  image: '',
  theme: 'dark',
  preview: true,
  triviainterval: 15000,
  alertsinterval: 30000,
  birthdaytimeframe: 3,
  preachtime: 40,
  preachyellow: 10,
  preachred: 0,
  clockposition: 'bottom-right',
  textshadow: false,
  tint: 0,
  ...THEMES['dark'],
};

const SCHEDULES_AND_EVENTS = [
  {
    id: generateGUID(),
    name: 'Escuela Dominical',
    day: 'Domingo',
    hour: '10:00',
    hourSuffix: 'AM',
    type: 'SCHEDULE',
    background: null,
    date: null,
    active: false,
    repeat: 0,
  },
  {
    id: generateGUID(),
    name: 'Culto General Mañana',
    day: 'Domingo',
    hour: '11:00',
    hourSuffix: 'AM',
    type: 'SCHEDULE',
    background: null,
    date: null,
    active: false,
    repeat: 0,
  },
  {
    id: generateGUID(),
    name: 'Culto General Noche',
    day: 'Domingo',
    hour: '06:30',
    hourSuffix: 'PM',
    type: 'SCHEDULE',
    background: null,
    date: null,
    active: false,
    repeat: 0,
  },
  {
    id: generateGUID(),
    name: 'Reunión para "Ganar Almas"',
    day: 'Sábado',
    hour: '04:00',
    hourSuffix: 'PM',
    type: 'SCHEDULE',
    background: null,
    date: null,
    active: false,
    repeat: 0,
  },
  {
    id: generateGUID(),
    name: 'Conferencia Misionera',
    day: 'Domingo',
    hour: '01:00',
    hourSuffix: 'AM',
    type: 'POSTER',
    background: TEST_EVENT_POSTER,
    date: null,
    active: false,
    repeat: 0,
  },
  {
    id: generateGUID(),
    name: '',
    day: 'Domingo',
    hour: '01:00',
    hourSuffix: 'AM',
    type: 'SCHEDULE',
    background: null,
    date: null,
    active: false,
    repeat: 0,
  },
];

export const BROADCAST = {
  CHANNEL: 'BROADCASTING_MESSAGE',
  INITIAL_CHANNEL: null,
  SETTINGS: 'BROADCASTING_SETTINGS',
  INITIAL_SETTINGS: SETTINGS_INITIAL_STATE,
  ALERT: 'BROADCASTING_ALERT',
  INITIAL_ALERT: '',
  COUNTDOWN: 'BROADCASTING_COUNTDOWN',
  INITIAL_COUNTDOWN: null,
  SCHEDULES_AND_EVENTS: 'SCHEDULES_AND_EVENTS',
  INITIAL_SCHEDULES_AND_EVENTS: SCHEDULES_AND_EVENTS,
  FULL_COUNTDOWN: 'BROADCASTING_FULL_COUNTDOWN',
  PREACHER_MESSAGE: 'BROADCASTING_PREACHER_MESSAGE',
  PREACHER_POINTS: 'BROADCASTING_PREACHER_POINTS',
  PREACHER_TIME: 'BROADCASTING_PREACHER_TIME',
};

export const SETTINGS_OPTIONS = {
  CLOCK_POSITIONS: [
    { value: 'top-left', label: 'Arriba-Izquierda' },
    { value: 'top-center', label: 'Arriba-Centro' },
    { value: 'top-right', label: 'Arriba-Derecha' },
    { divider: true },
    { value: 'bottom-left', label: 'Abajo-Izquierda' },
    { value: 'bottom-center', label: 'Abajo-Centro' },
    { value: 'bottom-right', label: 'Abajo-Derecha' },
  ],
  FONT_FAMILIES: [
    { value: '', label: 'Predeterminada' },
    { value: 'Arial Black', label: 'Arial Black' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Garamond', label: 'Garamond' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Roca + Poppins', label: 'Roca + Poppins' },
    { value: 'Roca', label: 'Roca' },
    { value: 'Tahoma', label: 'Tahoma' },
    { value: 'Times New Roman', label: 'Times New Roman' },
  ],
  THEMES: [
    { value: 'dark', label: 'Oscuro' },
    { value: 'light', label: 'Claro' },
    { value: 'cobalt', label: 'Cobalto' },
    { value: 'pinguin', label: 'Pingüino Emperador' },
    { value: 'christmas', label: 'Navidad' },
    { value: 'custom', label: 'Personalizado' },
  ],
  LOGOS: [
    { value: 'default', label: 'Churchill (isologo)' },
    { value: 'small', label: 'Churchill (isotipo)' },
    { divider: true },
    { value: 'CUSTOM', label: 'Personalizado...' },
  ],
  TIME_INTERVALS: [
    { value: 1000, label: '1 segundo' },
    { value: 2000, label: '2 segundos' },
    { value: 3000, label: '3 segundos' },
    { value: 5000, label: '5 segundos' },
    { value: 10000, label: '10 segundos' },
    { value: 15000, label: '15 segundos' },
    { value: 20000, label: '20 segundos' },
    { value: 60000, label: '1 minuto' },
  ],
  TRIVIA_TIME_INTERVALS: [
    { value: 15000, label: '15 segundos' },
    { value: 20000, label: '20 segundos' },
    { value: 25000, label: '25 segundos' },
    { value: 30000, label: '30 segundos' },
    { value: 60000, label: '1 minuto' },
  ],
  ALERTS_TIME_INTERVALS: [
    { value: 20000, label: '20 segundos' },
    { value: 30000, label: '30 segundos' },
    { value: 40000, label: '40 segundos' },
    { value: 50000, label: '50 segundos' },
    { value: 60000, label: '1 minuto' },
  ],
  BIRTHDAYS_TIME_INTERVALS: [
    { value: 0, label: 'Hoy' },
    { value: 1, label: '1 día' },
    { value: 2, label: '2 días' },
    { value: 3, label: '3 días' },
    { value: 4, label: '4 días' },
    { value: 5, label: '5 días' },
    { value: 6, label: '6 días' },
    { value: 7, label: '1 semana' },
  ],
  PREACH_TIME: [
    { value: 60, label: '1 hora' },
    { value: 45, label: '45 minutos' },
    { value: 40, label: '40 minutos' },
    { value: 30, label: '30 minutos' },
    { value: 15, label: '15 minutos' },
  ],
  PREACH_YELLOW: [
    { value: 15, label: '15 minutos' },
    { value: 10, label: '10 minutos' },
    { value: 5, label: '5 minutos' },
  ],
  REPEAT_EVERY: [
    { value: 0, label: 'Se muestra normalmente' },
    { value: 1, label: 'Se muestra cada 1 página' },
    { value: 2, label: 'Se muestra cada 2 páginas' },
    { value: 3, label: 'Se muestra cada 3 páginas' },
    { value: 4, label: 'Se muestra cada 4 páginas' },
    { value: 5, label: 'Se muestra cada 5 páginas' },
  ],
  PREACH_RED: [
    { value: 10, label: '10 minutos' },
    { value: 5, label: '5 minutos' },
    { value: 0, label: '0 minutos' },
  ],
  BACKGROUNDS,
  DAYS: [
    { value: 'Domingo', label: 'Domingo' },
    { value: 'Lunes', label: 'Lunes' },
    { value: 'Martes', label: 'Martes' },
    { value: 'Miércoles', label: 'Miércoles' },
    { value: 'Jueves', label: 'Jueves' },
    { value: 'Viernes', label: 'Viernes' },
    { value: 'Sábado', label: 'Sábado' },
  ],
  HOURS: Array(12)
    .fill(0)
    .map((_, i) => {
      return Array(12)
        .fill(0)
        .map((_, j) => {
          return `${(i + 1).toString().padStart(2, '0')}:${(j * 5)
            .toString()
            .padStart(2, '0')}`;
        });
    })
    .flat(),
};

export * from './pdfs';
