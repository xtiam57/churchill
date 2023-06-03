import React from 'react';

export function Title({ children, color = 'text-light' }) {
  return <h1 className={`${color} display-4`}>{children}</h1>;
}
