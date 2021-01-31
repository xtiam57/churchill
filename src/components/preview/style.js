import styled from 'styled-components';

const PreviewStyled = {};

PreviewStyled.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  flex: 1 0;
`;

PreviewStyled.Main = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  color: black;
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding-top: 0;
  padding-right: 5em;
  padding-bottom: 0;
  padding-left: 5em;

  div {
    color: var(--primary);
    font-size: calc(1.2em + 1vh);
  }

  p {
    font-style: italic;
    font-size: calc(1.2em + 3vh);
    margin: 0 0 0.5em;
  }
`;

PreviewStyled.Navigation = styled.div`
  background-color: var(--primary);
  width: 100%;
  min-height: 65px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { PreviewStyled };
