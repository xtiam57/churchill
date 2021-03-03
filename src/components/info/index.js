import React from 'react';
import { Alert } from 'react-bootstrap';

import { Zoom } from 'components/zoom';

export function Info({ children, ...rest }) {
  return (
    <Alert
      className="m-0 br-0 d-flex align-items-center justify-content-between py-2"
      variant="secondary"
      {...rest}
    >
      <div>{children}</div>

      <Zoom variant="outline-dark" size="sm" />
    </Alert>
  );
}
