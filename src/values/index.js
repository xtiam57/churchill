import { Slide } from 'utils';

export const CHANNEL_NAME = 'BROADCASTING_MESSAGE';
export const SETTINGS_NAME = 'BROADCASTING_SETTINGS';

export const HOME_VIEW_PATH = '/';
export const BIBLE_VIEW_PATH = '/bible';
export const ANTHEMNS_VIEW_PATH = '/anthemns';
export const BIRTHDAYS_VIEW_PATH = '/birthdays';
export const SETTINGS_VIEW_PATH = '/settings';
export const CAST_VIEW_PATH = '/cast-screen';

export const LEFT_ARROW_KEY = 37;
export const UP_ARROW_KEY = 38;
export const RIGHT_ARROW_KEY = 39;
export const DOWN_ARROW_KEY = 40;
export const SPACE_BAR_KEY = 32;
export const ESCAPE_KEY = 27;
export const F1_KEY = 112;

export const BIRTHDAY_FRAME = 7;
export const BIRTHDAY_ANTHEMN_INDEX = 508;
export const ITEMS_PER_LIST = 12;
export const LOOP_INTERVAL = 5000;

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
    mode: 'negative',
  },
  dracula: {
    background: '#000000',
    textcolor: '#ffffff',
    titlecolor: '#ffa200',
    subtextcolor: '#ffff00',
    mode: 'negative',
  },
  dark: {
    background: '#202124',
    textcolor: '#bcc0c3',
    titlecolor: '#c58af9',
    subtextcolor: '#688dee',
    mode: 'negative',
  },
  calvario: {
    background: '#ffffff',
    textcolor: '#000000',
    titlecolor: '#023060',
    subtextcolor: '#0E96D1',
    mode: 'default',
  },
  female: {
    background: '#ED2079',
    textcolor: '#ffffff',
    titlecolor: '#20ED94',
    subtextcolor: '#F9AAD0',
    mode: 'negative',
  },
  fun: {
    background: '#72BE44',
    textcolor: '#000000',
    titlecolor: '#ffffff',
    subtextcolor: '#ffff00',
    mode: 'negative',
  },
  xmas: {
    background: '#7b0410',
    textcolor: '#ffffff',
    titlecolor: '#27cd16',
    subtextcolor: '#ffff00',
    mode: 'negative',
  },
};

export const SETTINGS_INITIAL_STATE = {
  interval: LOOP_INTERVAL,
  font: '',
  fontscale: 1,
  blur: 0,
  logo: 'default',
  image: '/christmas.jpg',
  ...THEMES['default'],
};

export const TEST_SLIDE = Slide.create({
  title: 'Nulla bibendum dignissim',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare metus dignissim augue fermentum dictum. Mauris facilisis ultrices nibh, ut convallis felis placerat non.',
  subtext: 'Fusce lectus libero',
});
