import styled from 'styled-components';

export const AudioPlayerStyled = styled.div`
  height: 85px;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1020;
`;

export const SummaryStyled = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 5px;
  grid-auto-rows: 1;
  height: 100%;
`;

export const ControlsStyled = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto 1fr auto;
  grid-template-rows: auto auto;
  grid-gap: 5px;
  grid-auto-rows: 1;
  background-color: var(--dark);
  color: var(--light);
  height: 100%;
  align-items: center;
  justify-content: center;
`;
