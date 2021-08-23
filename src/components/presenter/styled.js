import styled from 'styled-components';

export const PresenterStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding: 4em;
  text-align: center;
  border: 1px solid var(--dark);
  /* border: ${({ live, background }) =>
    live ? 'solid 4px var(--warning)' : `solid 1px ${background}`}; */
  filter: ${({ grayscale }) => `grayscale(${grayscale ? 1 : 0})`};
  backdrop-filter: ${({ blur, grayscale }) =>
    blur
      ? `blur(${blur}px) grayscale(${grayscale ? 1 : 0})`
      : `grayscale(${grayscale ? 1 : 0})`};
  font-family: ${({ font }) =>
    font ||
    '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  p {
    font-size: calc(1.4em + 3vh);
    margin: 0;
    color: ${({ textcolor }) => textcolor || '#000'};

    strong {
      color: ${({ titlecolor }) => titlecolor || '#007bff'} !important;
    }

    b {
      font-weight: normal;
      color: ${({ titlecolor }) => titlecolor || '#007bff'} !important;
    }

    small {
      display: block;
      color: ${({ subtextcolor }) => subtextcolor || '#007bff'};
      font-size: 0.6em;
      margin-top: 1rem;
    }

    i {
      color: ${({ jesus }) => jesus || '#fff'};

      b {
        font-weight: normal;
        color: ${({ subtextcolor }) => subtextcolor || '#007bff'} !important;
      }
    }
  }
`;
