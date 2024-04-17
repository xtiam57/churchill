import styled from 'styled-components';

export const RoutesbarStyled = styled.div`
  width: 45px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  background-color: var(--light);
  grid-area: routesbar;
  z-index: 5;
  /* padding: 20px 0; */
  box-shadow: -2px 0 15px 0 rgba(0, 0, 0, 1);

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li,
    li a {
      outline: none;
    }

    .nav-link.active {
      pointer-events: none;
      background-color: var(--dark) !important;
      color: var(--light) !important;
    }
  }
`;
