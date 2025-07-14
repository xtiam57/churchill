// Función para normalizar texto removiendo diacríticos y signos de puntuación
const normalizeText = (text) => {
  return text
    .normalize('NFD') // Descompone caracteres con diacríticos
    .replace(/[\u0300-\u036f]/g, '') // Remueve diacríticos
    .replace(/[¡!¿?,.;:\-_()""''«»]/g, '') // Remueve signos de puntuación
    .toLowerCase()
    .trim();
};

// Función de filtrado personalizada
export const customFilterBy = (option, props) => {
  const query = normalizeText(props.text);
  const title = normalizeText(option.title);
  return title.includes(query);
};
