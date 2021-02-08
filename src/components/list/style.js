import styled from 'styled-components';

const ListStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2em 0 0;
`;

const TitleStyled = styled.span`
  color: var(--secondary);
  text-transform: uppercase;
  font-size: 0.7em;
  letter-spacing: 2px;

  background-color: transparent;
  border: none;
  text-align: left;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 5px 0 5px 0;
`;

const ItemStyled = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ActionStyled = styled.button`
  flex: 1 0;
  background-color: transparent;
  border: none;
  text-align: left;
  color: #ccc;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 0.9em;
  padding: 5px 0 5px 0;
  min-width: 16px;

  &:hover {
    color: var(--light);
  }
`;

const TextStyled = styled.span`
  background-color: transparent;
  border: none;
  text-align: left;
  color: #999;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 0.9em;
  padding: 5px 0 5px 0;

  & + button {
    flex: inherit;
  }
`;

export { ListStyled, TitleStyled, ItemStyled, ActionStyled, TextStyled };
