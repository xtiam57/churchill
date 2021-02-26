import styled from 'styled-components';

const SliderStyled = styled.div`
  height: 100%;
  width: 100%;
  backdrop-filter: ${({ blur }) => (blur ? `blur(${blur}px)` : 'none')};
`;

export { SliderStyled };
