import styled from 'styled-components';
import { zIndex } from 'styled-system';

export const SidebarStyled = styled.aside`
  background-color: #20232a;
  height: calc(100vh - 56px);
  min-width: 300px;
  max-width: 300px;
  padding: 25px;
  overflow-y: auto;
  box-shadow: -3px 0 10px 0 rgba(0, 0, 0, 0.2);
  z-index: 3;

  ${({ closable }) => {
    return closable ? 'position: fixed; left: 0;bottom: 0;' : '';
  }}

  transform: translate3d(0px, 0px, 0px);
  visibility: visible;
  transition: transform 0.5s ease 0s, visibility 0.5s ease 0s;

  &.closed {
    transform: translate3d(-100%, 0px, 0px);
    visibility: hidden;
  }
`;
