import { HymnalContext } from 'providers';
import React, { useContext, useMemo, useState } from 'react';
import { BIRTHDAY } from 'values';

const BirthdaysContext = React.createContext({});

const BirthdaysProvider = ({ children }) => {
  const [now] = useState(new Date());

  const { hymnal } = useContext(HymnalContext);
  const bDaySong = useMemo(() => hymnal[BIRTHDAY.HYMNAL_INDEX], [hymnal]);

  return (
    <BirthdaysContext.Provider value={{ now, bDaySong }}>
      {children}
    </BirthdaysContext.Provider>
  );
};

export { BirthdaysContext, BirthdaysProvider };
