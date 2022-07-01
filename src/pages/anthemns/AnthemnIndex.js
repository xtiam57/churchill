import { Bookmark } from 'components';
import { useAnthemn } from 'hooks';
import { Modal } from 'react-bootstrap';
import styledComponents from 'styled-components';

const AnthemnIndexStyled = styledComponents.div`
  width: 100%;

  .sub-index {
    padding: 30px;
    overflow-y: hidden;
    overflow-x: auto;
    background-color: #20232a;
    color: #ccc;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      columns: 300px;
      height: calc(100vh - 56px - 150px);

      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: .15rem;
        page-break-inside: avoid;
        break-inside: avoid;
        margin-right: 30px;

        &:hover {
          > span {
            color: #fff;
          }
        }

        > span {
          display: flex;
          flex: 1 0 auto;
          margin-right: 10px;
          font-size: .8rem;
          //border: solid 1px magenta;

          .name {
            flex: 1 1 auto;
            cursor: pointer;
            //border: solid 1px cyan;
          }

          .number {
            flex: 0 1 35px;
            text-align: right;
            margin-right: 10px;
            //border: solid 1px blue;
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

  return (
    <Modal
      size="xl"
      centered
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      className="anthemns-index"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Himnario</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <AnthemnIndexStyled>
          <div className="sub-index">
            <ul>
              {anthemns.map((item, index) => (
                <li key={index}>
                  <span
                    title={item?.text
                      ?.replaceAll('/n', '\n')
                      .replaceAll('_', '')}
                  >
                    <span className="number text-warning">#{item.number}</span>
                    <span className="name" onClick={() => onSelect(item)}>
                      {item.name}
                    </span>
                  </span>
                  <Bookmark
                    icon
                    element={item}
                    onChange={onChange}
                    sort={sort}
                  />
                </li>
              ))}
            </ul>
          </div>
        </AnthemnIndexStyled>
      </Modal.Body>
    </Modal>
  );
}
