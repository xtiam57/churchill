import React from 'react';
import { Alert } from 'react-bootstrap';

export function Info({ children, live = false, ...rest }) {
  const variant = live ? 'warning' : 'secondary';

  return (
    <Alert
      className="m-0 br-0 d-flex align-items-center justify-content-between py-2"
      variant={variant}
      {...rest}
    >
      <div>{children}</div>
    </Alert>
  );
}
