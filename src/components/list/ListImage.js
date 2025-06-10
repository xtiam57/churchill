import { Delete } from '@mui/icons-material';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';

const ImageWrapperStyled = styled.div`
  display: flex;
  user-select: none;
  margin-bottom: 5px;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--dark);

  .settings {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      padding: 6px 8px;
      height: 100%;
      color: #999;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      color: var(--dark);
      outline: none;
    }
  }

  &.active {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px 0px inset;
    border: 1px solid var(--secondary);
  }
`;

const ImageStyled = styled.div`
  background-color: transparent;
  border: none;
  text-align: left;
  color: #999;
  cursor: pointer;
  overflow: hidden;
  font-size: 0.9em;
  padding: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex: 1 0;
  align-items: center;
  gap: 10px;

  p {
    font-size: 0.8rem;
  }

  .image {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &.active {
    pointer-events: none;

    strong {
      color: #fff;
    }

    p {
      color: #fff;
    }
  }
`;

export function ListImage({
  src,
  title,
  description,
  onClick,
  onEdit,
  onDelete,
  active = false,
  disabled = false,
}) {
  return (
    <ImageWrapperStyled title={title} className={active ? 'active' : ''}>
      <ImageStyled onClick={onClick} className={active ? 'active' : ''}>
        <div
          className="image"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: 55,
            height: 55,
            borderRadius: 8,
            flex: '0 1 55px',
          }}
        />
        <div
          style={{
            flex: '1 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <strong
            style={{
              overflow: 'hidden',
              display: '-webkit-box',
              lineClamp: 1,
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
            }}
          >
            {title}
          </strong>
          <p
            style={{
              overflow: 'hidden',
              display: '-webkit-box',
              lineClamp: 2,
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>
      </ImageStyled>

      {active && !disabled && (
        <div className="settings">
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>Eliminar</Tooltip>}
          >
            <Button variant="secondary" onClick={onDelete}>
              <Delete fontSize="small" />
            </Button>
          </OverlayTrigger>
        </div>
      )}
    </ImageWrapperStyled>
  );
}
