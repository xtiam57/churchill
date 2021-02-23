import styled from 'styled-components';

export const PreviewStyled = styled.div`
  border-radius: 0.2rem;
  display: flex;
  padding: 1em;
  justify-content: center;
  height: 160px;
  border: 1px solid var(--light);
  align-items: center;
  background-color: ${({ background }) => background || '#fff'};
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
`;
