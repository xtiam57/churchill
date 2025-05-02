import styled from 'styled-components';
import { DEFAULT_SYSTEM_FONT } from 'values';

export const TextPreviewWrapperStyled = styled.div`
  border-radius: 8px;
  height: 160px;
  background-color: ${({ background }) => background || '#fff'};
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  border: 1px solid #ced4da;
`;

export const TextPreviewStyled = styled.div`
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  backdrop-filter: ${({ blur }) => `blur(${blur}px)`};
  font-family: ${({ font }) =>
    font === 'Roca + Poppins' ? 'Poppins' : font || DEFAULT_SYSTEM_FONT};
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: ${({ tint = 0, bg }) =>
      bg ? 'rgba(0, 0, 0,0)' : `rgba(0, 0, 0, ${tint})`};
    pointer-events: none;
    z-index: 1;
  }

  p {
    z-index: 2;
    font-size: 90%;
    text-align: center;
    color: ${({ textcolor }) => textcolor || '#000'};
    text-shadow: ${({ textshadow }) =>
      textshadow
        ? '0.5px 0.5px 1px rgba(0, 0, 0, 0.5), 0px 0px 2px rgba(0, 0, 0, 0.2), 0px 0px 10px rgba(0, 0, 0, 0.1)'
        : 'none'};

    strong {
      color: ${({ titlecolor }) => titlecolor || '#007bff'} !important;
      font-family: ${({ font }) =>
        font === 'Roca + Poppins' ? 'Roca' : font || DEFAULT_SYSTEM_FONT};
    }

    b {
      font-weight: normal;
      color: ${({ titlecolor }) => titlecolor || '#007bff'} !important;
    }

    small {
      display: block;
      font-size: 0.6em;
      color: ${({ subtextcolor }) => subtextcolor || '#007bff'};
    }

    div.opts {
      font-size: 0.6em;
      color: ${({ optionscolor }) => optionscolor || '#ffff00'};
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      padding: 5px;
    }

    i {
      color: ${({ textcolor }) => textcolor || '#000'};

      &.jesus {
        color: ${({ jesus }) => jesus || '#fff'};
      }

      b {
        font-weight: normal;
        color: ${({ subtextcolor }) => subtextcolor || '#007bff'} !important;
      }
    }
  }
`;
