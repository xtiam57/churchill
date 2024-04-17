import styled from 'styled-components';

export const SidebarStyled = styled.aside`
  background-color: ${({ light }) => (light ? '#fff' : '#20232a')};
  height: calc(100vh - 56px);
  min-width: ${({ size = 310 }) => `${size}px`};
  max-width: ${({ size = 310 }) => `${size}px`};
  padding: 30px;
  overflow-y: auto;
  z-index: ${({ closable }) => (closable ? 3 : 4)};
  box-shadow: -2px 0 15px 0 rgba(0, 0, 0, 1);

  ${({ closable, offset = 310 }) => {
    return closable ? `position: fixed; left: ${offset}px;bottom: 0;` : '';
  }}

  transform: translate3d(0px, 0px, 0px);
  visibility: visible;
  transition: transform 0.5s ease 0s, visibility 0.5s ease 0s;

  &.closed {
    transform: translate3d(-100%, 0px, 0px);
    visibility: hidden;
  }

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 14px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--gray);
    border-radius: 14px;
    border: 4px solid ${({ light }) => (light ? '#fff' : 'var(--dark)')};
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`;
