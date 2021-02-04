export const isFunction = (foo) => {
  return foo && {}.toString.call(foo) === '[object Function]';
};
