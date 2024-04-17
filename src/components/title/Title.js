export function Title({ children, color = 'text-white' }) {
  return <h1 className={`${color} display-4`}>{children}</h1>;
}
