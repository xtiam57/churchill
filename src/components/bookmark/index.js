import React, { useState, useEffect } from 'react';
import { BsBookmarkPlus, BsBookmarkFill } from 'react-icons/bs';

import { BookmarkStyled } from './style';
import { setItem, hasItem, removeItem } from 'utils';

const createStorageKey = ({ index, type }) => `${type}_${index}_bookmarked`;

export function Bookmark({
  element,
  icon = false,
  onRefresh = () => {},
  ...rest
}) {
  const [bookmarked, setBookmarked] = useState(false);
  const inStorage = hasItem(createStorageKey(element));

  useEffect(() => {
    setBookmarked(hasItem(createStorageKey(element)));
  }, [element, inStorage]);

  return (
    <BookmarkStyled bookmarked={bookmarked} icon={icon} {...rest}>
      {bookmarked ? (
        <BsBookmarkFill
          onClick={() => {
            removeItem(createStorageKey(element));
            setBookmarked((state) => !state);
            onRefresh();
          }}
        />
      ) : (
        <BsBookmarkPlus
          onClick={() => {
            setItem(createStorageKey(element), element);
            setBookmarked((state) => !state);
            onRefresh();
          }}
        />
      )}
    </BookmarkStyled>
  );
}
