import React from 'react';
import { Button } from 'react-bootstrap';
import { ImSearch } from 'react-icons/im';

export function FinderButton({ onOpen = () => {}, extraButton = null }) {
  return (
    <div className="small d-flex align-items-center justify-content-between mt-1 mb-3">
      <div className="text-muted">
        Presiona <strong>F1</strong> para buscar.
      </div>

      <div>
        {extraButton}

        <Button
          variant="link"
          className="text-light p-0 text-small"
          onClick={(e) => onOpen(true)}
          title="Búsqueda avanzada (Ctrl+B)"
        >
          <ImSearch />
        </Button>
      </div>
    </div>
  );
}
