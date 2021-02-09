import styled from 'styled-components';

const PresenterStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding-top: 0;
  padding-right: 5em;
  padding-bottom: 0;
  padding-left: 5em;
  text-align: center;
  border: ${({ live }) => (live ? 'solid 4px var(--warning)' : 'none')};

  p {
    font-size: calc(1.2em + 3vh);
    margin: 0 0 0.5em;
    color: ${({ textcolor }) => textcolor || '#000'};

    strong {
      color: ${({ titlecolor }) => titlecolor || '#007bff'} !important;
    }
  }

  cite {
    color: ${({ subtextcolor }) => subtextcolor || '#007bff'};
    font-size: calc(1.2em + 1vh);
  }
`;

export { PresenterStyled };
