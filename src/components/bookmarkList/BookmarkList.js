import { Sort } from '@mui/icons-material';
import { Bookmark, createKey, List } from 'components';
import { useAnthemn, useScriptures } from 'hooks';
import { getBookmarkedItems, Storage } from 'utils';
import { MAX_BOOKMARKS } from 'values';

export function BookmarkList({
  type = '',
  items = [],
  onChange = () => {},
  onClick = () => {},
  onSort = null,
  current,
  sort = 'desc',
  ...rest
}) {
  const { scriptures } = useScriptures();
  const { anthemns } = useAnthemn();

  const handleRemove = () => {
    items.forEach((item) => {
      Storage.remove(createKey(item));
    });
    onChange(getBookmarkedItems(type, sort));
  };

  return items.length ? (
    <List className="mb-4" {...rest}>
      <List.Item>
        <>
          <List.Title>Marcadores ({items.length}) </List.Title>
          {onSort ? (
            <List.Action className="text-center" onClick={onSort}>
              <Sort />
            </List.Action>
          ) : null}
          <List.Action className="text-right" onClick={handleRemove}>
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
              className={current.id === item.id ? 'text-light' : ''}
            >
              {item.title}
            </List.Action>
            <Bookmark icon element={item} onChange={onChange} sort={sort} />
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
