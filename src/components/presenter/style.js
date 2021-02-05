import styled from 'styled-components';

const PresenterStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding-top: 0;
  padding-right: 5em;
  padding-bottom: 0;
  padding-left: 5em;
  text-align: center;
  border: ${({ live }) => (live ? 'solid 5px var(--warning)' : 'none')};
  background-color: ${({ bg }) => bg || '#ffffff'};

  p {
    font-style: italic;
    font-size: calc(1.2em + 3vh);
    margin: 0 0 0.5em;
  }

  cite {
    color: var(--primary);
    font-size: calc(1.2em + 1vh);
  }
`;

export { PresenterStyled };
