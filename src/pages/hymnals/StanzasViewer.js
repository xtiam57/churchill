import { QueueMusic } from '@mui/icons-material';
import { useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';

const StanzasViewerStyled = styled.aside`
  background-color: rgba(255, 255, 255, 1);
  max-height: calc(100vh - 126px - 66px - 30px);
  width: 280px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.8);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 3;
  backdrop-filter: blur(10px);
  position: fixed;
  left: calc(55px + 320px + 20px);
  top: calc(56px + 20px);
  border-radius: 10px;

  > div {
    padding: 10px 20px;
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-left: 8px solid var(--light);
    color: #212529;

    &.chorus {
      border-left-color: var(--secondary);
    }

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: rgb(245, 245, 245);
    }

    &.active {
      background-color: rgb(245, 245, 245);
      pointer-events: none;
    }

    span {
      font-size: 0.8rem;
      line-height: 1.5;
      display: block;

      .fs-title {
        color: var(--primary);
        text-wrap: balance;
        font-size: 1rem;
      }
    }
  }

  transform: translate3d(0px, 0px, 0px);
  visibility: visible;
  transition: transform 0.5s ease 0s, visibility 0.5s ease 0s;

  &.closed {
    transform: translate3d(-120%, 0px, 0px);
    visibility: hidden;
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

export const StanzasViewer = ({ slides = [], onGoto = () => {}, ...rest }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StanzasViewerStyled className={open ? '' : 'closed'}>
        {slides
          .filter((slide) => slide.id !== 'AEOHAmen')
          .map((slide, index) =>
            index === 0 ? null : (
              <div
                key={index}
                className={slide.isChorus ? 'chorus' : ''}
                onClick={() => onGoto(slide.index)}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: slide.processedText,
                  }}
                />
              </div>
            )
          )}
      </StanzasViewerStyled>

      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Ver/Ocultar estrofas</Tooltip>}
      >
        <Button
          variant="secondary"
          onClick={(e) => setOpen((state) => !state)}
          title="Ver/Ocultar estrofas"
          {...rest}
        >
          <QueueMusic />
        </Button>
      </OverlayTrigger>
    </>
  );
};
