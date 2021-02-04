// Configuración:
// color de texto,
// fuente
// tamaño
// margenes,
// posición de la cita,
// color de la cita,
// color de fondo

import { useState } from 'react';

const initialState = {
  backgroundColor: '#fff',
  textColor: '#000',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  fontSize: 2,
  marginTop: 0,
  marginRight: 0,
  margingBottom: 0,
  marginLeft: 0,
  citePosition: 'bottom',
  citeColor: 'var(--primary)',
  alignment: 'left',
};

export function useScripturesSettings() {
  const [scripturesSettings, setScripturesSettings] = useState(initialState);

  return { scripturesSettings, setScripturesSettings };
}
