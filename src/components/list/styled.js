import styled from 'styled-components';

export const ListStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const TitleStyled = styled.span`
  color: #fff;
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

export const ItemStyled = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ActionStyled = styled.button`
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
  color: ${({ active }) => (active ? 'var(--light)' : 'var(--gray)')};

  &:hover {
    color: ${({ active }) => (active ? 'var(--light)' : 'var(--light)')};
  }
`;

export const TextStyled = styled.span`
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
