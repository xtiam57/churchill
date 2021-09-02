import React, { useState, useMemo, useContext } from 'react';

import { AnthemnsContext } from 'providers';
import { BIRTHDAY } from 'values';

const BirthdaysContext = React.createContext({});

const BirthdaysProvider = ({ children }) => {
  const [now] = useState(new Date());

  const { anthemns } = useContext(AnthemnsContext);
  const bDaySong = useMemo(() => anthemns[BIRTHDAY.ANTHEMN_INDEX], [anthemns]);

  return (
    <BirthdaysContext.Provider value={{ now, bDaySong }}>
      {children}
    </BirthdaysContext.Provider>
  );
};

export { BirthdaysContext, BirthdaysProvider };
