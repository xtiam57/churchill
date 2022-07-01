import styled from 'styled-components';

export const SemaphoreStyled = styled.div`
  display: flex;

  .display {
    display: flex;
    align-items: center;
    background-color: var(--dark);
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    color: var(--light);
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
    margin: 0;

    span {
      height: 20px;
      width: 20px;
      display: inline-block;
      border-radius: 50%;
      margin-right: 8px;
      background-color: var(--secondary);

      &.yellow {
        background-color: var(--warning);
        animation: blink 0.8s ease infinite;
      }

      &.red {
        background-color: var(--danger);
        animation: blink 0.8s ease infinite;
      }

      &.green {
        background-color: var(--success);
      }
    }
  }

  .controls {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #20232a;
    color: var(--light);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 0 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: #111;
    }
  }
`;
