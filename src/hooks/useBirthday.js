import { useContext } from 'react';

import { BirthdayContext } from 'providers/birthdays';

export function useBirthday() {
  const { recent, current, birthdays, bDaySong, add, remove } = useContext(
    BirthdayContext
  );

  return {
    recent,
    current,
    bDaySong,
    birthdays,
    add,
    remove,
  };
}
