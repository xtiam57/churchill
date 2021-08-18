import React, { useState } from 'react';
import { List } from 'components';

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
        <List.Item>
          <List.Title>
            Etiquetas {list.length ? <span>({list.length})</span> : null}
          </List.Title>
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

        {list.map((item) => (
          <List.Item key={item.index}>
            <List.Action
              onClick={() => onClick([item])}
              title={item?.text.replaceAll('/n', '\n')}
              className={current.id === item.id ? 'text-warning' : ''}
            >
              {item.title}
            </List.Action>
          </List.Item>
        ))}
      </List>
    </>
  );
}
