import styled from 'styled-components';

export const RoutesbarStyled = styled.div`
  width: 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  background-color: var(--light);
  /* color: var(--light); */
  grid-area: routesbar;
  z-index: 5;
  padding: 20px 0;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;
