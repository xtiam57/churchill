import styled from 'styled-components';

export const CountdownStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  border-radius: 0.25rem;
  overflow: hidden;
  height: 38px;

  .display {
    font-size: 90%;
    padding: 0 1rem;
    background-color: var(--dark);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    &.small {
      padding: 0;
    }

    &.time {
      background-color: #000;
    }
  }

  input {
    background-color: var(--dark);
    color: var(--light);
    width: 50px;
    border: none;
    outline: none;

    :focus {
      background-color: var(--dark);
      color: var(--light);
    }

    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .flat-left {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .flat-right {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;
