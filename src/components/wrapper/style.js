import styled from 'styled-components';

export const WrapperStyled = styled.main`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  height: ${({ bare }) => (bare ? '100vh' : 'calc(100vh - 56px)')};
  width: 100%;
  ${({ centered }) =>
    centered ? 'justify-content: center; align-items: center;' : null}
  background-color: ${({ background }) => background || '#fff'};
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
`;
