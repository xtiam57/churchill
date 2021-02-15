import React, { useState, useEffect } from 'react';
import { BsBookmarkPlus, BsBookmarkFill } from 'react-icons/bs';

import { BookmarkStyled } from './style';
import { Storage, getBookmarkedItems } from 'utils';

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

  return (
    <BookmarkStyled bookmarked={bookmarked} icon={icon} {...rest}>
      {bookmarked ? (
        <BsBookmarkFill
          onClick={() => {
            Storage.remove(createStorageKey(element));
            setBookmarked((state) => !state);
            onChange(getBookmarkedItems(element.type));
          }}
        />
      ) : (
        <BsBookmarkPlus
          onClick={() => {
            Storage.set(createStorageKey(element), element);
            setBookmarked((state) => !state);
            onChange(getBookmarkedItems(element.type));
          }}
        />
      )}
    </BookmarkStyled>
  );
}
