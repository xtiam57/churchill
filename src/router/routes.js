import AnthemnsPage from 'pages/anthemns';
import BirthdaysPage from 'pages/birthdays';
import CastPage from 'pages/cast';
import HomePage from 'pages/home';
import ScripturesPage from 'pages/scriptures';
import { BsBook, BsGift, BsHouseFill, BsMusicNoteList } from 'react-icons/bs';

export const PATHS = {
  ROOT: '/',
  SCRIPTURES_PAGE: '/scriptures',
  ANTHEMNS_PAGE: '/anthemns',
  BIRTHDAYS_PAGE: '/birthdays',
  CAST_PAGE: '/cast-screen',
  COUNTDOWN_PAGE: '/countdown',
  TRIVIA_PAGE: '/trivia',
};

export const routes = flatten([
  {
    key: PATHS.ROOT,
    exact: true,
    path: PATHS.ROOT,
    component: HomePage,
    icon: <BsHouseFill />,
    label: 'Inicio',
  },
  {
    key: PATHS.SCRIPTURES_PAGE,
    exact: true,
    path: PATHS.SCRIPTURES_PAGE,
    component: ScripturesPage,
    icon: <BsBook />,
    label: 'Escrituras',
    menu: true,
    showLabel: true,
  },
  {
    key: PATHS.ANTHEMNS_PAGE,
    exact: true,
    path: PATHS.ANTHEMNS_PAGE,
    component: AnthemnsPage,
    icon: <BsMusicNoteList />,
    label: 'Himnos',
    menu: true,
    showLabel: true,
  },
  {
    key: PATHS.BIRTHDAYS_PAGE,
    exact: true,
    path: PATHS.BIRTHDAYS_PAGE,
    component: BirthdaysPage,
    icon: <BsGift />,
    label: 'Cumpleaños',
    menu: true,
    showLabel: false,
  },
  {
    key: PATHS.CAST_PAGE,
    exact: true,
    path: PATHS.CAST_PAGE,
    component: CastPage,
    label: 'Proyectar',
  },
  // {
  //   key: PATHS.COUNTDOWN_PAGE,
  //   exact: true,
  //   path: PATHS.COUNTDOWN_PAGE,
  //   component: CountdownPage,
  //   icon: <BsClock />,
  //   label: 'Temporizador',
  //   menu: true,
  //   showLabel: false,
  // },
  // {
  //   key: PATHS.TRIVIA_PAGE,
  //   exact: true,
  //   path: PATHS.TRIVIA_PAGE,
  //   component: TriviaPage,
  //   icon: <BsQuestionCircle />,
  //   label: 'Trivia',
  //   menu: true,
  //   showLabel: false,
  // },
]);

function flatten(routes) {
  // Recursive loop
  const flattenDeep = (routes = [], accum, path = '') => {
    routes.forEach((route) => {
      const newPath = path + route.path;
      accum.push({ ...route, path: newPath });
      if (route.routes && Array.isArray(route.routes)) {
        flattenDeep(route.routes, accum, newPath);
      }
    });
  };

  const flattened = [];
  flattenDeep(routes, flattened);
  return flattened;
}
