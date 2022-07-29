import { useEffect, useState } from 'react';
import styledComponents from 'styled-components';
import { Storage } from 'utils';

export const createCategoryKey = ({ id, type }) => `${type}_${id}_category`;

const AnthemnSelectStyled = styledComponents.select`
  padding: .15rem 0.5rem;
  background-color: #20232a;
  color: #ccc;
  font-size: .85rem;
  outline: none;
`;

export function AnthemnCategory({ element, ...rest }) {
  const [category, setCategory] = useState('');
  const inStorage = Storage.has(createCategoryKey(element));

  const handleChange = ({ target }) => {
    const { value } = target;
    setCategory(value);
    if (value) {
      Storage.set(createCategoryKey(element), value);
    } else {
      Storage.remove(createCategoryKey(element));
    }
  };

  useEffect(() => {
    if (inStorage) {
      setCategory(Storage.get(createCategoryKey(element)));
    }
  }, [element, inStorage]);

  return (
    <AnthemnSelectStyled value={category} onChange={handleChange} {...rest}>
      <option value="">⚪ Sin categoría</option>
      <option value="CHEERFUL">🟡 Alegre</option>
      <option value="CONGREGATIONAL">🟢 Congregacional</option>
      <option value="SOLEMN">🟠 Solemne</option>
    </AnthemnSelectStyled>
  );
}
