export const ROUTES = {
  ROOT: '/',
  SCRIPTURES_PAGE: '/scriptures',
  ANTHEMNS_PAGE: '/anthemns',
  BIRTHDAYS_PAGE: '/birthdays',
  CAST_PAGE: '/cast-screen',
};

export const MOVEMENT = {
  NEXT: '>',
  PREV: '<',
};

export const BIRTHDAY = {
  TIME_FRAME: 6,
  ANTHEMN_INDEX: 508,
};

export const MAX_BOOKMARKS = 15;

export const TRANSITIONS = {
  upDown: {
    text: {
      initial: { opacity: 0, y: '-100%' },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: '-100%' },
    },
    subtext: {
      initial: { opacity: 0, y: '100%' },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: '100%' },
    },
  },
  fade: {
    text: {},
    subtext: {},
  },
  leftRight: {
    text: {},
    subtext: {},
  },
  zoom: {
    text: {},
    subtext: {},
  },
};

export const THEMES = {
  default: {
    background: '#ffffff',
    textcolor: '#000000',
    titlecolor: '#007bff',
    subtextcolor: '#007bff',
    mode: 'default',
  },
  cobalt: {
    background: '#19354A',
    textcolor: '#FFC603',
    titlecolor: '#ff9900',
    subtextcolor: '#ffffff',
    mode: '#ffffff',
  },
  pinguin: {
    background: '#000000',
    textcolor: '#ffffff',
    titlecolor: '#ffa200',
    subtextcolor: '#ffff00',
    mode: '#ffffff',
  },
  dark: {
    background: '#202124',
    textcolor: '#bcc0c3',
    titlecolor: '#c58af9',
    subtextcolor: '#688dee',
    mode: '#ffffff',
  },
  calvario: {
    background: '#ffffff',
    textcolor: '#000000',
    titlecolor: '#0E96D1',
    subtextcolor: '#023060',
    mode: 'default',
  },
  calvarioDark: {
    background: '#023060',
    textcolor: '#ffffff',
    titlecolor: '#0E96D1',
    subtextcolor: '#1EC0C2',
    mode: '#ffffff',
  },
  female: {
    background: '#ED2079',
    textcolor: '#ffffff',
    titlecolor: '#20ED94',
    subtextcolor: '#F9AAD0',
    mode: '#ffffff',
  },
  fun: {
    background: '#72BE44',
    textcolor: '#000000',
    titlecolor: '#ffffff',
    subtextcolor: '#ffff00',
    mode: '#ffffff',
  },
  christmas: {
    background: '#7b0410',
    textcolor: '#ffffff',
    titlecolor: '#27cd16',
    subtextcolor: '#ffff00',
    mode: '#ffffff',
  },
};

const SETTINGS_INITIAL_STATE = {
  interval: 5000,
  font: '',
  fontscale: 1,
  blur: 0,
  logo: 'default',
  image: '',
  theme: 'default',
  ...THEMES['default'],
};

export const BROADCAST = {
  CHANNEL: 'BROADCASTING_MESSAGE',
  INITIAL_CHANNEL: null,
  SETTINGS: 'BROADCASTING_SETTINGS',
  INITIAL_SETTINGS: SETTINGS_INITIAL_STATE,
};

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
  BACKGROUNDS: [
    { value: '', label: 'Color Sólido' },
    { value: '/bg/christmas.jpg', label: 'Arbol de Navidad' },
    { value: '/bg/dawn.jpg', label: 'Amanecer' },
    { value: '/bg/dusk.jpg', label: 'Atardecer' },
    { value: '/bg/heart.jpg', label: 'Corazones' },
    { value: '/bg/cross.jpg', label: 'Cruz' },
    { value: '/bg/fun.jpg', label: 'Divertido' },
    { value: '/bg/celebration.jpg', label: 'Fiesta' },
    { value: '/bg/wall.jpg', label: 'Ladrillos' },
    { value: '/bg/wood.jpg', label: 'Madera' },
    { value: '/bg/wood-lights.jpg', label: 'Madera con luces' },
    { value: '/bg/green-wood.jpg', label: 'Madera Verde' },
    { value: '/bg/xmas.jpg', label: 'Navidad Colorida' },
    { value: '/bg/blue.jpg', label: 'Patrón Azul' },
    { value: '/bg/black.jpg', label: 'Patrón Negro' },
    { value: '/bg/paper3.jpg', label: 'Papel 1' },
    { value: '/bg/paper2.jpg', label: 'Papel 2' },
    { value: '/bg/paper1.jpg', label: 'Papel 3' },
    { value: '/bg/peru.jpg', label: 'Perú' },
    { value: '/bg/resurrection.jpg', label: 'Resurreción' },
  ],
  LOGOS: [
    { value: 'default', label: 'Iglesia' },
    { value: 'damas', label: 'Damas' },
    { value: 'instituto', label: 'Instituto' },
    { value: 'jovenes', label: 'Jóvenes' },
    { value: 'ninos', label: 'Niños' },
    { value: 'rondalla', label: 'Rondalla' },
  ],
  TIME_INTERVALS: [
    { value: '1000', label: '1 segundo' },
    { value: '2000', label: '2 segundos' },
    { value: '3000', label: '3 segundos' },
    { value: '5000', label: '5 segundos' },
    { value: '10000', label: '10 segundos' },
    { value: '15000', label: '15 segundos' },
    { value: '20000', label: '20 segundos' },
    { value: '60000', label: '1 minuto' },
  ],
};

export const FONT_FAMILIES_OPTIONS = [
  { value: '', label: 'Predeterminada' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Arial Black', label: 'Arial Black' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Garamond', label: 'Garamond' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Times New Roman', label: 'Times New Roman' },
];

export const THEMES_OPTIONS = [
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
];

export const BACKGROUNDS_OPTIONS = [
  { value: '', label: 'Color Sólido' },
  { value: '/bg/christmas.jpg', label: 'Arbol de Navidad' },
  { value: '/bg/dawn.jpg', label: 'Amanecer' },
  { value: '/bg/dusk.jpg', label: 'Atardecer' },
  { value: '/bg/heart.jpg', label: 'Corazones' },
  { value: '/bg/cross.jpg', label: 'Cruz' },
  { value: '/bg/fun.jpg', label: 'Divertido' },
  { value: '/bg/celebration.jpg', label: 'Fiesta' },
  { value: '/bg/wall.jpg', label: 'Ladrillos' },
  { value: '/bg/wood.jpg', label: 'Madera' },
  { value: '/bg/wood-lights.jpg', label: 'Madera con luces' },
  { value: '/bg/green-wood.jpg', label: 'Madera Verde' },
  { value: '/bg/xmas.jpg', label: 'Navidad Colorida' },
  { value: '/bg/blue.jpg', label: 'Patrón Azul' },
  { value: '/bg/black.jpg', label: 'Patrón Negro' },
  { value: '/bg/paper3.jpg', label: 'Papel 1' },
  { value: '/bg/paper2.jpg', label: 'Papel 2' },
  { value: '/bg/paper1.jpg', label: 'Papel 3' },
  { value: '/bg/peru.jpg', label: 'Perú' },
  { value: '/bg/resurrection.jpg', label: 'Resurreción' },
];

export const LOGO_OPTIONS = [
  { value: 'default', label: 'Iglesia' },
  { value: 'damas', label: 'Damas' },
  { value: 'instituto', label: 'Instituto' },
  { value: 'jovenes', label: 'Jóvenes' },
  { value: 'ninos', label: 'Niños' },
  { value: 'rondalla', label: 'Rondalla' },
];

export const TIME_INTERVAL_OPTIONS = [
  { value: '1000', label: '1 segundo' },
  { value: '2000', label: '2 segundos' },
  { value: '3000', label: '3 segundos' },
  { value: '5000', label: '5 segundos' },
  { value: '10000', label: '10 segundos' },
  { value: '15000', label: '15 segundos' },
  { value: '20000', label: '20 segundos' },
  { value: '60000', label: '1 minuto' },
];
