import styled from 'styled-components';

export const BlurStyled = styled.div`
  display: flex;
  backdrop-filter: ${({ blur }) => (blur ? `blur(${blur}px)` : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
