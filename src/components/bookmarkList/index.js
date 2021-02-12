import React from 'react';

import { Bookmark, createStorageKey } from 'components/bookmark';
import { List } from 'components/list';
import { Storage, getBookmarkedItems } from 'utils';
import { ITEMS_PER_LIST } from 'values';

export function BookmarkList({
  type = '',
  items = [],
  onChange = () => {},
  onClick = () => {},
}) {
  const removeBookmarks = () => {
    items.forEach((item) => {
      Storage.remove(createStorageKey(item));
    });
    onChange(getBookmarkedItems(type));
  };

  return (
    <List>
      <List.Item>
        {items.length ? (
          <>
            <List.Title>Marcadores</List.Title>
            <List.Action className="text-right" onClick={removeBookmarks}>
              (Borrar)
            </List.Action>
          </>
        ) : null}
      </List.Item>

      {items.map((item, index) => {
        return index < ITEMS_PER_LIST ? (
          <List.Item key={index}>
            <List.Action onClick={() => onClick(item)}>
              {item.title}
            </List.Action>
            <Bookmark icon element={item} onRefresh={onChange} />
          </List.Item>
        ) : null;
      })}

      {items.length > ITEMS_PER_LIST ? (
        <List.Item>
          <List.Text>+{items.length - ITEMS_PER_LIST} marcadores</List.Text>
        </List.Item>
      ) : null}
    </List>
  );
}
