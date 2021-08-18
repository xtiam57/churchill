import React, { useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

export function Finder({
  show = false,
  options = [],
  render = () => {},
  onHide = () => {},
  onChange = () => {},
}) {
  const typeaheadRef = useRef();

  return (
    <Modal
      size="xl"
      show={show}
      onHide={onHide}
      onShow={() => typeaheadRef.current.focus()}
    >
      <Modal.Body>
        <Typeahead
          emptyLabel="No hay resultados."
          className="search-typeahead"
          id="combo"
          labelKey="text"
          minLength={0}
          onChange={onChange}
          onFocus={(e) => e.target.select()}
          options={options}
          paginate={true}
          paginationText="Ver más resultados..."
          placeholder="Buscar una palabra..."
          ref={typeaheadRef}
          highlightOnlyResult={true}
          size="large"
          renderMenuItemChildren={render}
        />
      </Modal.Body>
    </Modal>
  );
}
