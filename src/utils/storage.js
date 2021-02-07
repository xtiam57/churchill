export const getAllItems = () => {
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
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((item) => {
      delete item['timestamp'];
      return item;
    });
};

export const setItem = (key, value) => {
  localStorage.setItem(
    key,
    JSON.stringify({ value, timestamp: new Date().getTime() })
  );
};

export const getItem = (key) => {
  const item = localStorage.getItem(key);

  if (item) {
    delete item['timestamp'];
  }

  return item ? JSON.parse(item) : null;
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

export const hasItem = (key) => {
  const item = localStorage.getItem(key);

  return item !== null;
};
