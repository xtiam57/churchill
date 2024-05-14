import { Bookmark } from 'components';
import { useHymnals } from 'hooks';
import { useCallback, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import styledComponents from 'styled-components';
import { Storage } from 'utils';
import { HymnalCategory, createCategoryKey } from './HymnalCategory';

const HymnalIndexStyled = styledComponents.div`
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

export function HymnalIndex({
  onChange = () => {},
  onSelect = () => {},
  sort = 'desc',
  show = false,
  onHide = () => {},
  ...rest
}) {
  const { hymnals, books } = useHymnals();
  const [category, setCategory] = useState('ALL');
  const [book, setBook] = useState(books[2]);

  const handleCategoryChange = ({ target }) => {
    const { value } = target;
    setCategory(value);
  };

  const handleBookChange = ({ target }) => {
    const { value } = target;
    setBook(value);
  };

  const render = useCallback(() => {
    return hymnals
      .filter((item) => (book !== 'ALL' ? item.book === book : true))
      .map((item, index) => {
        if (!item.category) {
          item.category = Storage.get(createCategoryKey(item));
        }

        if (category === 'CHEERFUL' && item.category !== 'CHEERFUL') {
          return null;
        }

        if (
          category === 'CONGREGATIONAL' &&
          item.category !== 'CONGREGATIONAL'
        ) {
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
            <span
              className="d-flex align-items-center"
              title={item?.text?.replaceAll('/n', '\n').replaceAll('_', '')}
            >
              <span className="number text-light">#{item.number}</span>
              <span className="name" onClick={() => onSelect(item)}>
                {item.name}
              </span>
              <span className="tag active">{item.book}</span>
            </span>
            <HymnalCategory element={item} className="mr-2" />
            <Bookmark icon element={item} onChange={onChange} sort={sort} />
          </li>
        );
      });
  }, [hymnals, book, category, onChange, sort, onSelect]);

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
          Himnarios
          <div className="input-group" style={{ width: '50%' }}>
            <Form.Control
              size="sm"
              as="select"
              value={book}
              onChange={handleBookChange}
              {...rest}
            >
              {/* <option value="ALL">Todos los himnarios</option> */}
              {books.map((book) => (
                <option key={book} value={book}>
                  {book}
                </option>
              ))}
            </Form.Control>
            <Form.Control
              size="sm"
              as="select"
              value={category}
              onChange={handleCategoryChange}
              {...rest}
            >
              <option value="ALL">Todas las categorías</option>
              <option value="">⚪ Sin categoría</option>
              <option value="CHEERFUL">🟡 Alegre</option>
              <option value="CONGREGATIONAL">🟢 Congregacional</option>
              <option value="SOLEMN">🟠 Solemne</option>
            </Form.Control>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <HymnalIndexStyled>
          <div className="sub-index">
            <ul>{render()}</ul>
          </div>
        </HymnalIndexStyled>
      </Modal.Body>
    </Modal>
  );
}
