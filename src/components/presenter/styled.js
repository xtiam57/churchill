import styled from 'styled-components';

export const PresenterStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding: 4em;
  text-align: center;
  border: 1px solid var(--dark);
  filter: ${({ grayscale }) => `grayscale(${grayscale ? 1 : 0})`};
  backdrop-filter: ${({ blur, grayscale }) =>
    blur
      ? `blur(${blur}px) grayscale(${grayscale ? 1 : 0})`
      : `grayscale(${grayscale ? 1 : 0})`};
  font-family: ${({ font }) =>
    font ||
    '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  background-image: ${({ bg }) => (bg ? `url(${bg})` : 'none')};
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;

  /* &:before,
  &:after {
    content: ' ';
    height: 100%;
    position: absolute;
    top: 0;
    width: 40px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  &:before {
    box-shadow: ${({ rightshadow }) =>
    rightshadow ? 'inset -30px 0 30px -30px rgba(255, 255, 255, 0.8)' : 'none'};
    left: calc(100% - 40px);
  }
  &:after {
    box-shadow: ${({ leftshadow }) =>
    leftshadow ? 'inset 30px 0 30px -30px rgba(255, 255, 255, 0.8)' : 'none'};
    right: calc(100% - 40px);
  } */

  p {
    font-size: calc(1.4em + 3vh);
    margin: 0;
    color: ${({ textcolor }) => textcolor || '#000'};
    width: 100%;

    strong {
      color: ${({ titlecolor }) => titlecolor || '#007bff'} !important;
    }

    b {
      font-weight: normal;
      color: ${({ titlecolor }) => titlecolor || '#007bff'} !important;
    }

    small {
      display: block;
      color: ${({ subtextcolor }) => subtextcolor || '#007bff'};
      font-size: 0.6em;
      margin-top: 1rem;
    }

    div.opts {
      font-size: 1.1em;
      color: ${({ optionscolor }) => optionscolor || '#ffff00'};
      background-color: rgba(0, 0, 0, 0.5);
      border: solid 1px var(--secondary);
      border-radius: 10px;
      padding: 10px 20px 15px;
      height: 100%;
      display: flex;
      align-items: center;
      text-align: left;
    }

    .opt-0,
    .opt-1 {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    i {
      color: ${({ textcolor }) => textcolor || '#000'};

      &.jesus {
        color: ${({ jesus }) => jesus || '#fff'};
        font-style: normal;
      }

      b {
        font-weight: normal;
        color: ${({ subtextcolor }) => subtextcolor || '#007bff'} !important;
      }
    }
  }
`;

export const CornerStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${({ font }) =>
    font ||
    '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'};
  position: absolute;
  bottom: 3%;
  right: 2%;

  p {
    font-size: calc(0.15em + 2.3vh);
    margin: 0;
    color: ${({ textcolor }) => textcolor || '#000'};
    width: 100%;
    line-height: 1;
  }

  &.bottom-left {
    bottom: 3%;
    left: 2%;
  }
  &.top-left {
    top: 3%;
    left: 2%;
  }
  &.bottom-center {
    bottom: 3%;
    right: 50%;
    transform: translateX(50%);
  }
  &.top-center {
    top: 3%;
    right: 50%;
    transform: translateX(50%);
  }
  &.bottom-right {
    bottom: 3%;
    right: 2%;
  }
  &.top-right {
    top: 3%;
    right: 2%;
  }
`;
