import { Search } from '@mui/icons-material';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export function FinderButton({ onOpen = () => {}, extraButton = null }) {
  return (
    <div className="small d-flex align-items-center justify-content-between mt-1 mb-3">
      <div className="text-muted">
        Presiona <strong>F1</strong> para buscar.
      </div>

      <div>
        {extraButton}

        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>Búsqueda avanzada (Ctrl+B)</Tooltip>}
        >
          <Button
            variant="link"
            className="text-white p-0 text-small"
            onClick={(e) => onOpen(true)}
          >
            <Search fontSize="small" />
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  );
}
