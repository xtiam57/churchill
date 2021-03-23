import styled from 'styled-components';

const PresenterStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding-top: 0;
  padding-right: 4em;
  padding-bottom: 0;
  padding-left: 4em;
  text-align: center;
  border: ${({ live, background }) =>
    live ? 'solid 4px var(--warning)' : `solid 1px ${background}`};
  backdrop-filter: ${({ blur }) => (blur ? `blur(${blur}px)` : 'none')};
  font-family: ${({ font }) =>
    font ||
    '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'};

  p {
    font-size: ${({ size = 1.0, fontscale = 1.0, zoom = 1 }) => {
      return `calc(${1.4 * size * zoom * fontscale}em + 3vh)`;
    }};
    margin: 0 0 0.3em;
    color: ${({ textcolor }) => textcolor || '#000'};

    strong {
      color: ${({ titlecolor }) => titlecolor || '#007bff'} !important;
    }

    b {
      font-weight: normal;
      color: ${({ titlecolor }) => titlecolor || '#007bff'} !important;
    }
  }

  cite {
    color: ${({ subtextcolor }) => subtextcolor || '#007bff'};
    font-style: normal;
    font-size: ${({ zoom = 1 }) => {
      return `calc(${1.3 * zoom}em + 1.65vh)`;
    }};
  }
`;

export { PresenterStyled };
