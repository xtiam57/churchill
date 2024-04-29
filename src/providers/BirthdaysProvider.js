import { HymnalsContext } from 'providers';
import React, { useContext, useMemo, useState } from 'react';
import { BIRTHDAY } from 'values';

const BirthdaysContext = React.createContext({});

const BirthdaysProvider = ({ children }) => {
  const [now] = useState(new Date());

  const { hymnals } = useContext(HymnalsContext);
  const bDaySong = useMemo(() => hymnals[BIRTHDAY.ANTHEMN_INDEX], [hymnals]);

  return (
    <BirthdaysContext.Provider value={{ now, bDaySong }}>
      {children}
    </BirthdaysContext.Provider>
  );
};

export { BirthdaysContext, BirthdaysProvider };
