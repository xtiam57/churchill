import React from 'react';

import { Bookmark, List, createKey } from 'components';
import { Storage, getBookmarkedItems } from 'utils';
import { MAX_BOOKMARKS } from 'values';
import { useScriptures, useAnthemn } from 'hooks';

export function BookmarkList({
  type = '',
  items = [],
  onChange = () => {},
  onClick = () => {},
  current,
  ...rest
}) {
  const { scriptures } = useScriptures();
  const { anthemns } = useAnthemn();

  const removeBookmarks = () => {
    items.forEach((item) => {
      Storage.remove(createKey(item));
    });
    onChange(getBookmarkedItems(type));
  };

  return items.length ? (
    <List className="mb-4" {...rest}>
      <List.Item>
        <>
          <List.Title>Marcadores ({items.length})</List.Title>
          <List.Action className="text-right" onClick={removeBookmarks}>
            (Borrar)
          </List.Action>
        </>
      </List.Item>

      {items.map((item, index) => {
        return index < MAX_BOOKMARKS ? (
          <List.Item key={index}>
            <List.Action
              onClick={() => {
                if (type === 'verse') {
                  onClick(scriptures[item.index]);
                } else {
                  onClick(anthemns[item.index]);
                }
              }}
              title={
                type === 'verse'
                  ? item?.text.replaceAll('<br/>', '\n').replaceAll('_', '')
                  : item?.text?.replaceAll('/n', '\n').replaceAll('_', '')
              }
              className={current.id === item.id ? 'text-warning' : ''}
            >
              {item.title}
            </List.Action>
            <Bookmark icon element={item} onChange={onChange} />
          </List.Item>
        ) : null;
      })}

      {items.length > MAX_BOOKMARKS ? (
        <List.Item>
          <List.Text>
            +{items.length - MAX_BOOKMARKS} marcador
            {items.length - MAX_BOOKMARKS > 1 ? 'es' : ''}
          </List.Text>
        </List.Item>
      ) : null}
    </List>
  ) : null;
}
