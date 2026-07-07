import {
  AutoStories,
  Delete,
  Image as ImageIcon,
  SmartDisplay,
} from '@mui/icons-material';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { RowStyled } from './styled';

const ICONS = {
  verse: <AutoStories />,
  video: <SmartDisplay />,
  image: <ImageIcon />,
};

export function PlaylistItemRow({ item, active, onSelect, onToggle, onDelete }) {
  return (
    <RowStyled
      className={`${active ? 'active' : ''} ${item.enabled ? '' : 'disabled'}`}
    >
      <div
        className="content"
        onClick={item.enabled ? onSelect : undefined}
        role={item.enabled ? 'button' : undefined}
      >
        <div
          className="thumb"
          style={item.bg ? { backgroundImage: `url(${item.bg})` } : undefined}
        >
          {!item.bg && ICONS[item.type]}
        </div>

        <div className="info">
          <strong>{item.title}</strong>
          {item.description ? <p>{item.description}</p> : null}
        </div>
      </div>

      <div className="switch">
        <Form.Check
          type="switch"
          id={`enable-${item.entryId}`}
          checked={item.enabled}
          onChange={onToggle}
          label=""
        />
      </div>

      {active ? (
        <div className="settings">
          <OverlayTrigger placement="right" overlay={<Tooltip>Eliminar</Tooltip>}>
            <Button variant="secondary" onClick={onDelete}>
              <Delete fontSize="small" />
            </Button>
          </OverlayTrigger>
        </div>
      ) : (
        <OverlayTrigger placement="right" overlay={<Tooltip>Eliminar</Tooltip>}>
          <button type="button" className="delete-plain" onClick={onDelete}>
            <Delete fontSize="small" />
          </button>
        </OverlayTrigger>
      )}
    </RowStyled>
  );
}
