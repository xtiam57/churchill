import styled from 'styled-components';

export const StanzasViewer = styled.aside`
  background-color: rgba(255, 255, 255, 1);
  height: calc(100vh - 560px);
  width: 320px;

  overflow-y: auto;
  overflow-x: hidden;
  z-index: ${({ closable }) => (closable ? 3 : 4)};
  box-shadow: -2px 0 15px 0 rgba(0, 0, 0, 1);
  backdrop-filter: blur(10px);
  position: absolute;
  right: 30px;
  top: 100px;

  > div {
    padding: 10px 30px;
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: rgba(221, 215, 215, 0.9);
    }

    span {
      font-size: 0.9rem;
      line-height: 1.4;
      display: block;

      .fs-title {
        color: var(--primary);
        text-wrap: balance;
        font-size: 1rem;
      }
    }
  }

  transform: translate3d(0px, 0px, 0px);
  visibility: visible;
  transition: transform 0.5s ease 0s, visibility 0.5s ease 0s;

  &.closed {
    transform: translate3d(100%, 0px, 0px);
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
