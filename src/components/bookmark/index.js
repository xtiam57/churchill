import React, { useState, useEffect } from 'react';
import { BsBookmarkPlus, BsBookmarkFill } from 'react-icons/bs';

import { BookmarkStyled } from './styled';
import { Storage, getBookmarkedItems } from 'utils';
import { useKeyUp } from 'hooks';

export const createKey = ({ id, type }) => `${type}_${id}_bookmarked`;

export function Bookmark({
  element,
  icon = false,
  onChange = () => {},
  ...rest
}) {
  const [bookmarked, setBookmarked] = useState(false);
  const inStorage = Storage.has(createKey(element));

  useEffect(() => {
    setBookmarked(Storage.has(createKey(element)));
  }, [element, inStorage]);

  const add = () => {
    if (!Storage.has(createKey(element))) {
      Storage.set(createKey(element), element);
      setBookmarked(true);
      onChange(getBookmarkedItems(element.type));
    }
  };

  const remove = () => {
    Storage.remove(createKey(element));
    setBookmarked(false);
    onChange(getBookmarkedItems(element.type));
  };

  useKeyUp('KeyS', add, { ctrl: true });

  return (
    <BookmarkStyled
      bookmarked={bookmarked}
      title="Ctrl+S"
      icon={icon}
      {...rest}
    >
      {bookmarked ? (
        <BsBookmarkFill onClick={remove} />
      ) : (
        <BsBookmarkPlus onClick={add} />
      )}
    </BookmarkStyled>
  );
}
