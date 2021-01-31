import React, { useState } from 'react';
import { Wrapper } from 'components/wrapper';
import { Preview } from 'components/preview';

import Projection from 'components/projection/Projection';
import { Sidebar } from 'components/sidebar';
import Controls from 'components/scripturesControls';
import { useScriptures, useVerse, useVerseSelection } from 'hooks';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Container, Row, Col } from 'react-bootstrap';

function MainView() {
  const verses = useScriptures();
  const { verse, setVerse } = useVerse();
  const { verseSelection, setVerseSelection } = useVerseSelection();

  const onChange = (event) => {
    setVerseSelection(event);

    if (event.length) {
      setVerse(...event);
    }
  };

  return (
    <Wrapper>
      <Preview cite={verse.cite}>{verse.text}</Preview>

      <Sidebar>
        <Typeahead
          id="combo"
          options={verses}
          paginate={false}
          labelKey="cite"
          placeholder="Selecciona un versículo..."
          size="large"
          minLength={0}
          highlightOnlyResult={true}
          onChange={onChange}
          paginationText="Ver más opciones..."
          emptyLabel="No existe esa opcion."
          selected={verseSelection}
        />
      </Sidebar>
    </Wrapper>
  );
}

export default MainView;
