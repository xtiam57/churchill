import { Storage } from './storage';

export const getBookmarkedItems = (view = 'anthemn') => {
  return Storage.getAll('desc')
    .filter(({ key }) => key.includes(view) && key.includes('bookmarked'))
    .map((item) => item.value);
};
