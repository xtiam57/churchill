import styled from 'styled-components';

export const LogoPreviewStyled = styled.div`
  border-radius: 8px;
  display: flex;
  padding: 1em;
  justify-content: center;
  height: 160px;
  border: 1px solid #ced4da;
  align-items: center;
  background-color: ${({ background }) => background || '#fff'};
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
`;
