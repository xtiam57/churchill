import { useEffect, useState } from 'react';
import styledComponents from 'styled-components';
import { Storage } from 'utils';

export const createCategoryKey = ({ id, type }) => `${type}_${id}_category`;

const HymnalSelectStyled = styledComponents.select`
  padding: .15rem 0.5rem;
  background-color: #20232a;
  color: #ccc;
  font-size: .85rem;
  outline: none;
`;

export function HymnalCategory({ element, ...rest }) {
  const [category, setCategory] = useState(
    Storage.get(createCategoryKey(element)) ?? ''
  );

  const handleChange = ({ target }) => {
    const { value } = target;
    setCategory(value);
    if (value) {
      element.category = value;
      Storage.set(createCategoryKey(element), value);
    } else {
      delete element.category;
      Storage.remove(createCategoryKey(element));
    }
  };

  useEffect(() => {
    setCategory(Storage.get(createCategoryKey(element)) ?? '');
  }, [element]);

  return (
    <HymnalSelectStyled value={category} onChange={handleChange} {...rest}>
      <option value="">⚪ Sin categoría</option>
      <option value="CHEERFUL">🟡 Alegre</option>
      <option value="CONGREGATIONAL">🟢 Congregacional</option>
      <option value="SOLEMN">🟠 Solemne</option>
    </HymnalSelectStyled>
  );
}
