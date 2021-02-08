const Storage = {};

Storage.getAll = (order = 'asc') => {
  const values = [];
  const keys = Object.keys(localStorage);
  let i = keys.length;

  while (i--) {
    const item = {
      key: keys[i],
      ...JSON.parse(localStorage.getItem(keys[i])),
    };
    values.push(item);
  }

  return values
    .sort((a, b) => (a.timestamp - b.timestamp) * (order === 'asc' ? 1 : -1))
    .map((item) => {
      delete item['timestamp'];
      return item;
    });
};

Storage.set = (key, value) => {
  const item = {
    value,
    timestamp: new Date().getTime(),
  };

  localStorage.setItem(key, JSON.stringify(item));
};

Storage.get = (key) => {
  let item = localStorage.getItem(key);

  if (item) {
    item = JSON.parse(item);
    item = item.value;
  }

  return item;
};

Storage.remove = (key) => {
  localStorage.removeItem(key);
};

Storage.has = (key) => {
  const item = localStorage.getItem(key);
  return item !== null;
};

export { Storage };
