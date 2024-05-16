import {
  ChildCare,
  GraphicEq,
  MusicNote,
  Piano,
  PostAdd,
} from '@mui/icons-material';

import pdf5 from 'assets/pdfs/Apéndice.pdf';
import pdf4 from 'assets/pdfs/Corario Bautista.pdf';
import pdf1 from 'assets/pdfs/Himnos Bautistas.pdf';
import pdf2 from 'assets/pdfs/Himnos Majestuosos.pdf';
import pdf3 from 'assets/pdfs/Himnos de Gracia.pdf';

export const PDF_HYMNALS = [
  {
    label: 'Himnos Bautistas',
    url: pdf1,
    icon: <MusicNote fontSize="large" />,
  },
  {
    label: 'Himnos Majestuosos',
    url: pdf2,
    icon: <Piano fontSize="large" />,
  },
  {
    label: 'Himnos de Gracia',
    url: pdf3,
    icon: <GraphicEq fontSize="large" />,
  },
  {
    label: 'Corario Bautista',
    url: pdf4,
    icon: <ChildCare fontSize="large" />,
  },
  { label: 'Apéndice', url: pdf5, icon: <PostAdd fontSize="large" /> },
];
