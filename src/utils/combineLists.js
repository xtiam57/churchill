export function combineLists(mainList, repeatList, intervals) {
  let result = [];
  let mainIndex = 0;
  // Inicializar los contadores con los valores de los intervalos
  let repeatCounters = [...intervals];

  while (mainIndex < mainList.length) {
    result.push(mainList[mainIndex]);
    mainIndex++;

    for (let i = 0; i < repeatList.length; i++) {
      // Decrementar los contadores y verificar si es necesario insertar un elemento de repeatList
      repeatCounters[i]--;

      if (repeatCounters[i] === 0) {
        result.push(repeatList[i]);
        // // Reiniciar el contador
        repeatCounters[i] = intervals[i];
      }
    }
  }

  return result;
}
