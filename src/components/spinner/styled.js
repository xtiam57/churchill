import styled from 'styled-components';

export const SpinnerStyled = styled.div`
  position: relative;
  display: inline-block;
  height: 46px;
  width: 46px;
  margin: 1em;
  border-radius: 50%;
  background: none repeat scroll 0 0 #dddddd;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 0 25px rgba(0, 0, 255, 0.075);

  &:after {
    content: '';
    position: absolute;
    top: 9px;
    left: 9px;
    display: block;
    height: 28px;
    width: 28px;
    background: none repeat scroll 0 0 #f2f2f2;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  > span {
    position: absolute;
    height: 100%;
    width: 50%;
    overflow: hidden;
  }

  .left {
    left: 0;
  }
  .right {
    left: 50%;
  }

  .anim {
    position: absolute;
    left: 100%;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 999px;
    background: none repeat scroll 0 0 #508ec3;
    opacity: 0.8;
    -webkit-animation: ui-spinner-rotate-left 3s infinite;
    animation: ui-spinner-rotate-left 3s infinite;
    -webkit-transform-origin: 0 50% 0;
    transform-origin: 0 50% 0;
  }
  .left .anim {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
  .right .anim {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    left: -100%;
    -webkit-transform-origin: 100% 50% 0;
    transform-origin: 100% 50% 0;
  }

  .anim {
    -webkit-animation-delay: 0s;
    -webkit-animation-duration: 3s;
    -webkit-animation-timing-function: linear;
    animation-delay: 0s;
    animation-duration: 3s;
    animation-timing-function: linear;
  }
  .right .anim {
    -webkit-animation-name: ui-spinner-rotate-right;
    -webkit-animation-delay: 0;
    -webkit-animation-delay: 1.5s;
    animation-name: ui-spinner-rotate-right;
    animation-delay: 0;
    animation-delay: 1.5s;
  }

  @keyframes ui-spinner-rotate-right {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(180deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes ui-spinner-rotate-left {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
