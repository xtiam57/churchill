import { BACKGROUNDS } from './images';

export const MOVEMENT = {
  NEXT: '>',
  PREV: '<',
};

export const BIRTHDAY = {
  ANTHEMN_INDEX: 508,
};

export const MAX_BOOKMARKS = 15;

export const THEMES = {
  default: {
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
    jesus: '#ff9900',
    optionscolor: '#ffff00',
    mode: '#ffffff',
  },
  pinguin: {
    background: '#000000',
    textcolor: '#ffffff',
    titlecolor: '#ffa200',
    subtextcolor: '#ffff00',
    jesus: '#ffa200',
    optionscolor: '#ffff00',
    mode: '#ffffff',
  },
  dark: {
    background: '#202124',
    textcolor: '#bcc0c3',
    titlecolor: '#c58af9',
    subtextcolor: '#688dee',
    jesus: '#c58af9',
    optionscolor: '#ffff00',
    mode: '#ffffff',
  },
  calvario: {
    background: '#ffffff',
    textcolor: '#000000',
    titlecolor: '#0E96D1',
    subtextcolor: '#023060',
    jesus: '#16bcd4',
    optionscolor: '#ffff00',
    mode: 'default',
  },
  calvarioDark: {
    background: '#023060',
    textcolor: '#ffffff',
    titlecolor: '#0E96D1',
    subtextcolor: '#1EC0C2',
    jesus: '#16bcd4',
    optionscolor: '#ffff00',
    mode: '#ffffff',
  },
  female: {
    background: '#ED2079',
    textcolor: '#ffffff',
    titlecolor: '#20ED94',
    subtextcolor: '#F9AAD0',
    jesus: '#20ED94',
    optionscolor: '#ffff00',
    mode: '#ffffff',
  },
  fun: {
    background: '#72BE44',
    textcolor: '#000000',
    titlecolor: '#ffffff',
    subtextcolor: '#ffff00',
    jesus: '#ffffff',
    optionscolor: '#ffff00',
    mode: '#ffffff',
  },
  christmas: {
    background: '#7b0410',
    textcolor: '#ffffff',
    titlecolor: '#27cd16',
    subtextcolor: '#ffff00',
    jesus: '#27cd16',
    optionscolor: '#ffff00',
    mode: '#ffffff',
  },
};

const SETTINGS_INITIAL_STATE = {
  interval: 10000,
  font: '',
  blur: 5,
  logo: 'default',
  image: '',
  theme: 'default',
  preview: true,
  triviainterval: 20000,
  birthdaytimeframe: 3,
  ...THEMES['default'],
};

export const BROADCAST = {
  CHANNEL: 'BROADCASTING_MESSAGE',
  INITIAL_CHANNEL: null,
  SETTINGS: 'BROADCASTING_SETTINGS',
  INITIAL_SETTINGS: SETTINGS_INITIAL_STATE,
};

export const CLOCK_POSITION = [
  { value: '', label: 'Arriba-Izquierda' },
  { value: '', label: 'Arriba-Centro' },
  { value: '', label: 'Arriba-Derecha' },
  { value: '', label: 'Abajo-Izquierda' },
  { value: '', label: 'Abajo-Derecha' },
  { value: '', label: 'Abajo-Centro' },
];

export const SETTINGS_OPTIONS = {
  FONT_FAMILIES: [
    { value: '', label: 'Predeterminada' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Arial Black', label: 'Arial Black' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Garamond', label: 'Garamond' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Tahoma', label: 'Tahoma' },
    { value: 'Times New Roman', label: 'Times New Roman' },
  ],
  THEMES: [
    { value: 'default', label: 'Predeterminado' },
    { value: 'calvario', label: 'Monte Calvario' },
    { value: 'calvarioDark', label: 'Monte Calvario (Oscuro)' },
    { value: 'christmas', label: 'Navidad' },
    { value: 'cobalt', label: 'Cobalto' },
    { value: 'dark', label: 'Oscuro' },
    { value: 'female', label: 'Femenino' },
    { value: 'fun', label: 'Divertido' },
    { value: 'pinguin', label: 'Pingüino Emperador' },
    { value: 'custom', label: 'Personalizado' },
  ],
  LOGOS: [
    { value: 'default', label: 'Iglesia' },
    { value: 'damas', label: 'Damas' },
    { value: 'instituto', label: 'Instituto' },
    { value: 'jovenes', label: 'Jóvenes' },
    { value: 'ninos', label: 'Niños' },
    { value: 'rondalla', label: 'Rondalla' },
    { value: 'churchill', label: 'Churchill' },
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
  BACKGROUNDS,
};
