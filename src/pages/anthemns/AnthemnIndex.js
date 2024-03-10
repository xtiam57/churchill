import { Bookmark } from 'components';
import { useAnthemn } from 'hooks';
import { useCallback, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import styledComponents from 'styled-components';
import { Storage } from 'utils';
import { AnthemnCategory, createCategoryKey } from './AnthemCategory';

const AnthemnIndexStyled = styledComponents.div`
  width: 100%;

  .sub-index {
    padding: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #20232a;
    color: #ccc;
    height: calc(100vh - 56px - 100px);

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .3rem 1rem;
        border-radius: .25rem;
        page-break-inside: avoid;
        break-inside: avoid;

        &:nth-child(odd) {
          background-color: #2b2f36;
        }

        &:hover {
          background-color: var(--gray);
          > span {
            color: #fff;
          }
        }

        > span {
          display: flex;
          flex: 1 0 auto;
          margin-right: 10px;
          font-size: .85rem;

          .name {
            flex: 1 1 auto;
            cursor: pointer;
          }

          .number {
            flex: 0 1 35px;
            text-align: right;
            margin-right: 10px;
          }
        }
      }
    }
  }
`;

export function AnthemnIndex({
  onChange = () => {},
  onSelect = () => {},
  sort = 'desc',
  show = false,
  onHide = () => {},
  ...rest
}) {
  const { anthemns } = useAnthemn();
  const [category, setCategory] = useState('ALL');

  const handleChange = ({ target }) => {
    const { value } = target;
    setCategory(value);
  };

  const render = useCallback(() => {
    return anthemns.map((item, index) => {
      if (!item.category) {
        item.category = Storage.get(createCategoryKey(item));
      }

      if (category === 'CHEERFUL' && item.category !== 'CHEERFUL') {
        return null;
      }

      if (category === 'CONGREGATIONAL' && item.category !== 'CONGREGATIONAL') {
        return null;
      }

      if (category === 'SOLEMN' && item.category !== 'SOLEMN') {
        return null;
      }

      if (category === '' && item.category) {
        return null;
      }

      return (
        <li key={index}>
          <span title={item?.text?.replaceAll('/n', '\n').replaceAll('_', '')}>
            <span className="number text-light">#{item.number}</span>
            <span className="name" onClick={() => onSelect(item)}>
              {item.name}
            </span>
          </span>
          <AnthemnCategory element={item} className="mr-2" />
          <Bookmark icon element={item} onChange={onChange} sort={sort} />
        </li>
      );
    });
  }, [anthemns, onChange, onSelect, sort, category]);

  return (
    <Modal
      size="lg"
      centered
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="d-flex align-items-center justify-content-between w-100">
          Himnario
          <div>
            <Form.Control
              size="sm"
              as="select"
              value={category}
              onChange={handleChange}
              {...rest}
            >
              <option value="ALL">Todo</option>
              <option value="">⚪ Sin categoría</option>
              <option value="CHEERFUL">🟡 Alegre</option>
              <option value="CONGREGATIONAL">🟢 Congregacional</option>
              <option value="SOLEMN">🟠 Solemne</option>
            </Form.Control>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <AnthemnIndexStyled>
          <div className="sub-index">
            <ul>{render()}</ul>
          </div>
        </AnthemnIndexStyled>
      </Modal.Body>
    </Modal>
  );
}
