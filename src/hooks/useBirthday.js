import { useContext } from 'react';

import { BirthdaysContext } from 'providers';

export function useBirthday() {
  const { recent, current, birthdays, bDaySong, add, remove } =
    useContext(BirthdaysContext);

  return {
    recent,
    current,
    bDaySong,
    birthdays,
    add,
    remove,
  };
}
