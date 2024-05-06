import { List } from 'components';
import { useState } from 'react';

import { West } from '@mui/icons-material';
import { useHymnals } from 'hooks';

export function HymnalBooks({ onClick = () => {}, current }) {
  const { hymnals, books } = useHymnals();
  const [selected, setSelected] = useState(null);
  const [list, setList] = useState([]);

  const onChangeBook = (book) => {
    setSelected(book === selected ? null : book);
    setList(() =>
      book === selected ? [] : hymnals.filter((song) => song.book === book)
    );
  };

  return (
    <List>
      {!selected ? (
        <List.Item>
          <List.Title>Himnarios</List.Title>
        </List.Item>
      ) : (
        <List.Item>
          <List.Title>
            <span className="tag pointer active">
              {selected} {list.length ? <span>({list.length})</span> : null}
            </span>
          </List.Title>
          <List.Action
            className="text-right"
            onClick={() => onChangeBook(selected)}
          >
            <West />
          </List.Action>
        </List.Item>
      )}

      {!selected ? (
        <List.Item
          className="my-2"
          style={{ flexWrap: 'wrap', justifyContent: 'start' }}
        >
          {books.map((book, index) => (
            <span
              key={index}
              onClick={() => onChangeBook(book)}
              className={`tag mr-1 mb-1 pointer ${
                book === selected ? 'active' : ''
              }`}
            >
              {book}
            </span>
          ))}
        </List.Item>
      ) : null}

      {list.map((item) => (
        <List.Item key={item.index}>
          <List.Action
            onClick={() => onClick([item])}
            title={item?.text.replaceAll('/n', '\n')}
            className={current.id === item.id ? 'text-light' : ''}
          >
            {item.title}
          </List.Action>
        </List.Item>
      ))}
    </List>
  );
}
