import { List } from 'components';
import { useState } from 'react';

import { useAnthemn } from 'hooks';

export function AnthemnTags({ onClick = () => {}, current }) {
  const { anthemns, tags } = useAnthemn();
  const [selected, setSelected] = useState(null);
  const [list, setList] = useState([]);

  const onChangeTag = (tag) => {
    setSelected(tag === selected ? null : tag);
    setList(() =>
      tag === selected
        ? []
        : anthemns.filter((song) => song.tags?.split(',').includes(tag))
    );
  };

  return (
    <>
      <List>
        {!selected ? (
          <List.Item>
            <List.Title>Etiquetas</List.Title>
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
              onClick={() => onChangeTag(selected)}
            >
              (Atrás)
            </List.Action>
          </List.Item>
        )}

        {!selected ? (
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
    </>
  );
}
