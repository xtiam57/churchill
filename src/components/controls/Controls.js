export function Controls({ children, centered = false, ...rest }) {
  const alignment = centered ? 'center' : 'between';

  return (
    <>
      <nav className="navbar navbar-dark bg-primary text-white" {...rest}>
        <div className={`container-fluid justify-content-${alignment}`}>
          {children}
        </div>
      </nav>
    </>
  );
}
