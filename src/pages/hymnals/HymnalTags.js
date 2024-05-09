import { List } from 'components';
import { useState } from 'react';

import { West } from '@mui/icons-material';
import { useHymnals } from 'hooks';

export function HymnalTags({ onClick = () => {}, current }) {
  const { hymnals, tags } = useHymnals();
  const [selected, setSelected] = useState(null);
  const [list, setList] = useState([]);

  const onChangeTag = (tag) => {
    setSelected(tag === selected ? null : tag);
    setList(() =>
      tag === selected
        ? []
        : hymnals.filter((song) => song.tags?.split(',').includes(tag))
    );
  };

  return (
    <List className="mb-4">
      {!selected ? (
        <>
          <List.Item>
            <List.Title>Etiquetas</List.Title>
          </List.Item>

          <List.Item
            className="my-2"
            style={{ flexWrap: 'wrap', justifyContent: 'start' }}
          >
            {tags.map((tag, index) => (
              <span
                key={index}
                onClick={() => onChangeTag(tag)}
                className={`tag mr-1 mb-1 pointer ${
                  tag === selected ? 'active' : ''
                }`}
              >
                {tag}
              </span>
            ))}
          </List.Item>
        </>
      ) : (
        <List.Item style={{ gap: 5 }}>
          <List.Title style={{ flex: '1 1 100%' }}>
            <span className="tag pointer active w-100">
              {selected} {list.length ? <span>({list.length})</span> : null}
            </span>
          </List.Title>

          <List.Action
            style={{ flex: '1 0 42px' }}
            className="text-right"
            onClick={() => onChangeTag(selected)}
          >
            <span
              className="tag pointer active"
              style={{ paddingTop: '1px', paddingBottom: '1px' }}
            >
              <West fontSize="small" />
            </span>
          </List.Action>
        </List.Item>
      )}

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
