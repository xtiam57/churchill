import React from 'react';

import { Bookmark, createKey } from 'components/bookmark';
import { List } from 'components/list';
import { Storage, getBookmarkedItems } from 'utils';
import { MAX_BOOKMARKS } from 'values';

export function BookmarkList({
  type = '',
  items = [],
  onChange = () => {},
  onClick = () => {},
  ...rest
}) {
  const removeBookmarks = () => {
    items.forEach((item) => {
      Storage.remove(createKey(item));
    });
    onChange(getBookmarkedItems(type));
  };

  return items.length ? (
    <List {...rest}>
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
              onClick={() => onClick(item)}
              title={
                type === 'verse'
                  ? item?.text.replaceAll('<br/>', '\n')
                  : item?.text?.replaceAll('/n', '\n')
              }
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
