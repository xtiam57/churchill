import styled from 'styled-components';

const PreviewStyled = {};

PreviewStyled.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0;
  height: ${({ neat }) => (neat ? '100vh' : 'calc(100vh - 56px)')};
`;

PreviewStyled.Main = styled.section`
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

  div {
    color: var(--danger);
    font-size: calc(1.2em + 1vh);
  }

  p {
    font-style: italic;
    font-size: calc(1.2em + 3vh);
    margin: 0 0 0.5em;
  }
`;

PreviewStyled.Navigation = styled.div`
  background-color: var(--secondary);
  width: 100%;
  min-height: 70px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
`;

export { PreviewStyled };
