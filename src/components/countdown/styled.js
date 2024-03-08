import styled from 'styled-components';

export const CountdownStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  border-radius: 0.25rem;
  overflow: hidden;
  height: 38px;
  border: 1px solid #555;

  .display {
    font-size: 90%;
    padding: 0 1rem;
    background-color: #000;
    color: var(--light);
    display: flex;
    justify-content: center;
    align-items: center;
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
