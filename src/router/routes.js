import {
  Audiotrack,
  AutoStories,
  Cake,
  Image,
  Newspaper,
  SmartDisplay,
} from '@mui/icons-material';
import BirthdaysPage from 'pages/birthdays';
import CastPage from 'pages/cast';
import HomePage from 'pages/home';
import HymnalPage from 'pages/hymnal';
import MiscPage from 'pages/misc';
import ScripturesPage from 'pages/scriptures';
import VideosPage from 'pages/videos';
import PreacherScreen from 'pages/PreacherScreen';

export const PATHS = {
  ROOT: '/',
  SCRIPTURES_PAGE: '/scriptures',
  ANTHEMNS_PAGE: '/hymnals',
  BIRTHDAYS_PAGE: '/birthdays',
  CAST_PAGE: '/cast-screen',
  COUNTDOWN_PAGE: '/countdown',
  TRIVIA_PAGE: '/trivia',
  EXPORT_PAGE: '/export',
  RESOURCES_PAGE: '/resources',
  VIDEOS_PAGE: '/videos',
  PREACHER_SCREEN: '/preacher-screen',
};

export const routes = flatten([
  {
    key: PATHS.ROOT,
    exact: true,
    path: PATHS.ROOT,
    component: HomePage,
    icon: <Newspaper />,
    label: 'Mensajes',
    menu: true,
    showLabel: true,
  },
  {
    key: PATHS.SCRIPTURES_PAGE,
    exact: true,
    path: PATHS.SCRIPTURES_PAGE,
    component: ScripturesPage,
    icon: <AutoStories />,
    label: 'Escrituras',
    menu: true,
    showLabel: true,
  },
  {
    key: PATHS.ANTHEMNS_PAGE,
    exact: true,
    path: PATHS.ANTHEMNS_PAGE,
    component: HymnalPage,
    icon: <Audiotrack />,
    label: 'Himnos',
    menu: true,
    showLabel: true,
  },
  {
    key: PATHS.VIDEOS_PAGE,
    exact: true,
    path: PATHS.VIDEOS_PAGE,
    component: VideosPage,
    icon: <SmartDisplay />,
    label: 'Videos',
    menu: true,
    showLabel: false,
  },
  {
    key: PATHS.RESOURCES_PAGE,
    exact: true,
    path: PATHS.RESOURCES_PAGE,
    component: MiscPage,
    icon: <Image />,
    label: 'Recursos',
    menu: true,
    showLabel: false,
  },
  {
    key: PATHS.BIRTHDAYS_PAGE,
    exact: true,
    path: PATHS.BIRTHDAYS_PAGE,
    component: BirthdaysPage,
    icon: <Cake />,
    label: 'Cumpleaños',
    menu: true,
    showLabel: true,
  },
  // {
  //   key: PATHS.EXPORT_PAGE,
  //   exact: true,
  //   path: PATHS.EXPORT_PAGE,
  //   component: ExportPage,
  //   icon: <SystemUpdateAlt />,
  //   label: 'Exportar',
  //   menu: true,
  //   showLabel: true,
  // },
  {
    key: PATHS.CAST_PAGE,
    exact: true,
    path: PATHS.CAST_PAGE,
    component: CastPage,
    label: 'Proyectar',
  },
  {
    key: PATHS.PREACHER_SCREEN,
    exact: true,
    path: PATHS.PREACHER_SCREEN,
    component: PreacherScreen,
    label: 'Predicador',
  },

  // {
  //   key: PATHS.COUNTDOWN_PAGE,
  //   exact: true,
  //   path: PATHS.COUNTDOWN_PAGE,
  //   component: CountdownPage,
  //   icon: <Restore />,
  //   label: 'Temporizador',
  //   menu: true,
  //   showLabel: false,
  // },

  // {
  //   key: PATHS.TRIVIA_PAGE,
  //   exact: true,
  //   path: PATHS.TRIVIA_PAGE,
  //   component: TriviaPage,
  //   icon: <PsychologyAlt />,
  //   label: 'Trivia',
  //   menu: true,
  //   showLabel: true,
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
