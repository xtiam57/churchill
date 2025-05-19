import { Close, ListAlt } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';

const VersesWrapperStyled = styled.div`
  position: absolute;
  left: calc(55px + 320px + 20px);
  top: calc(56px + 30px);
  z-index: 3;
  display: flex;
  align-items: start;

  transform: translate3d(0px, 0px, 0px);
  transition: transform 0.5s ease 0s;

  button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-top: 50px;
  }

  &.closed {
    transform: translate3d(calc(-100% + 30px), 0px, 0px);
    /* visibility: hidden; */
  }
`;

const VersesViewerTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  background-color: var(--secondary);
  padding: 10px 20px;
`;

const VersesViewerContainerStyled = styled.aside`
  background-color: #ffffff;
  max-height: calc(100vh - 126px - 66px - 30px);
  width: 280px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  overflow: hidden;
`;

const VersesViewerStyled = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 126px - 66px - 30px - 48px);

  > div {
    padding: 10px 20px;
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-left: 8px solid var(--light);
    color: #212529;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: rgb(245, 245, 245);
    }

    &.active {
      background-color: rgb(245, 245, 245);
      pointer-events: none;
      border-left-color: var(--secondary);
    }

    span {
      font-size: 0.8rem;
      line-height: 1.5;
      display: block;
    }

    strong {
      font-size: 0.8rem;
      display: block;
      margin-bottom: 5px;
      color: var(--primary);
    }
  }

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 14px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--gray);
    border-radius: 14px;
    border: 4px solid #fff;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`;

export const VersesViewer = ({
  verses = [],
  current,
  onGoto = () => {},
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const title = useMemo(() => {
    const title = verses[0]?.title;
    const sub = title?.indexOf(':');
    return title.substring(0, sub);
  }, [verses]);

  return (
    <VersesWrapperStyled className={open ? '' : 'closed'}>
      <VersesViewerContainerStyled>
        <VersesViewerTitle>{title}</VersesViewerTitle>
        <VersesViewerStyled>
          {verses.map((verse, index) => (
            <div
              key={index}
              title={verse.text.replaceAll('<br/>', '\n').replaceAll('_', '')}
              className={current.index === verse.index ? 'active' : ''}
              onClick={() => onGoto(verse)}
            >
              <strong>{verse.title}</strong>
              <span
                dangerouslySetInnerHTML={{ __html: verse.text }}
                style={{
                  overflow: 'hidden',
                  display: '-webkit-box',
                  lineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                }}
              />
            </div>
          ))}
        </VersesViewerStyled>
      </VersesViewerContainerStyled>

      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Selector de versículos</Tooltip>}
      >
        <Button
          variant="secondary"
          onClick={(e) => setOpen((state) => !state)}
          title="Ver/Ocultar versículos"
          {...rest}
        >
          {open ? <Close /> : <ListAlt />}
        </Button>
      </OverlayTrigger>
    </VersesWrapperStyled>
  );
};
