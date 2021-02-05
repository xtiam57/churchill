import styled from 'styled-components';

export const WrapperStyled = styled.main`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  height: ${({ bare }) => (bare ? '100vh' : 'calc(100vh - 56px)')};
  width: 100%;
  ${({ centered }) =>
    centered ? 'justify-content: center; align-items: center;' : null}
`;
