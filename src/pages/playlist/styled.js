import styled from 'styled-components';

export const RowStyled = styled.div`
  display: flex;
  align-items: stretch;
  user-select: none;
  margin-bottom: 5px;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--dark);
  transition: background-color 0.2s ease;

  &.active {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px 0px inset;
    border: 1px solid var(--secondary);
  }

  &.disabled {
    background-color: #1a1a1a;

    .content {
      opacity: 0.5;
    }
  }

  .content {
    flex: 1 0;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    cursor: pointer;
  }

  .thumb {
    flex: 0 0 44px;
    width: 44px;
    height: 44px;
    border-radius: 8px;
    background-color: var(--light);
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--dark);
  }

  .info {
    flex: 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    strong {
      color: #fff;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 0.9em;
    }

    p {
      margin: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 0.8em;
      color: #999;
    }
  }

  .switch {
    display: flex;
    align-items: center;
    padding: 0 8px;
  }

  .settings {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      padding: 6px 8px;
      height: 100%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      color: #fff;
      outline: none;
    }
  }

  .delete-plain {
    background: transparent;
    border: none;
    color: #777;
    padding: 0 10px;
    outline: none;

    :hover {
      color: #fff;
    }
  }
`;
