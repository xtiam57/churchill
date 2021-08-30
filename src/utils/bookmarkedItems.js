import { Storage } from './storage';

export const getBookmarkedItems = (view = 'anthemn', order = 'desc') => {
  return Storage.getAll(order)
    .filter(({ key }) => key.includes(view) && key.includes('bookmarked'))
    .sort(
      (a, b) =>
        (new Date(a.timestamp) - new Date(b.timestamp)) *
        (order === 'asc' ? 1 : -1)
    )
    .map((item) => item.value);
};
