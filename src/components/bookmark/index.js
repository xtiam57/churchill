import React, { useState, useEffect } from 'react';
import { BsBookmarkPlus, BsBookmarkFill } from 'react-icons/bs';

import { BookmarkStyled } from './style';
import { Storage, getBookmarkedItems } from 'utils';
import { useKeyDown } from 'hooks';

export const createStorageKey = ({ index, type }) =>
  `${type}_${index}_bookmarked`;

export function Bookmark({
  element,
  icon = false,
  onChange = () => {},
  ...rest
}) {
  const [bookmarked, setBookmarked] = useState(false);
  const inStorage = Storage.has(createStorageKey(element));

  useEffect(() => {
    setBookmarked(Storage.has(createStorageKey(element)));
  }, [element, inStorage]);

  const add = () => {
    if (!Storage.has(createStorageKey(element))) {
      Storage.set(createStorageKey(element), element);
      setBookmarked(true);
      onChange(getBookmarkedItems(element.type));
    }
  };

  const remove = () => {
    Storage.remove(createStorageKey(element));
    setBookmarked(false);
    onChange(getBookmarkedItems(element.type));
  };

  useKeyDown('KeyS', add, { ctrl: true });

  return (
    <BookmarkStyled bookmarked={bookmarked} icon={icon} {...rest}>
      {bookmarked ? (
        <BsBookmarkFill onClick={remove} />
      ) : (
        <BsBookmarkPlus onClick={add} />
      )}
    </BookmarkStyled>
  );
}
