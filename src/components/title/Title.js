export function Title({ children, color = 'text-white' }) {
  return <h1 className={`${color} page-title`}>{children}</h1>;
}
