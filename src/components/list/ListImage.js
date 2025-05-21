import { Edit } from '@mui/icons-material';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';

const ImageWrapperStyled = styled.div`
  display: flex;
  user-select: none;

  .settings {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      padding: 6px 8px;
      height: 100%;

      &:hover {
        background-color: var(--secondary);
        color: var(--dark);
      }
    }
  }
`;

const ImageStyled = styled.div`
  background-color: transparent;
  border: none;
  text-align: left;
  color: #999;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  font-size: 0.9em;
  padding: 8px;
  margin-bottom: 5px;
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

  &:hover {
    color: var(--dark);
    background-color: var(--light);

    .image {
      transform: scale(1.05) rotate(-3deg);
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    }
  }
`;

export function ListImage({ src, title, description }) {
  return (
    <ImageWrapperStyled>
      <ImageStyled title={title}>
        <div
          className="image"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: 65,
            height: 65,
            borderRadius: 8,
            flex: '0 1 65px',
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
            title={description}
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

      <div className="settings">
        <OverlayTrigger placement="right" overlay={<Tooltip>Editar</Tooltip>}>
          <Button variant="dark" onClick={() => {}}>
            <Edit fontSize="small" />
          </Button>
        </OverlayTrigger>

        {/* <OverlayTrigger placement="right" overlay={<Tooltip>Eliminar</Tooltip>}>
          <Button variant="dark" onClick={() => {}}>
            <Close fontSize="small" />
          </Button>
        </OverlayTrigger> */}
      </div>
    </ImageWrapperStyled>
  );
}
