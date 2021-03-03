import React from 'react';
import createPersistedState from 'use-persisted-state';
import { Button, ButtonGroup } from 'react-bootstrap';
import { BiZoomIn, BiZoomOut } from 'react-icons/bi';

import { BROADCAST } from 'values';

const useSettings = createPersistedState(BROADCAST.SETTINGS);

export function Zoom({
  children,
  value = 1,
  variant = '',
  size = '',
  onChange = () => {},
  ...rest
}) {
  const [settings, setSettings] = useSettings(BROADCAST.INITIAL_SETTINGS);

  const onZoomIn = () => {
    const zoom = Math.min(settings.zoom + 0.05, 2);
    setSettings((state) => ({ ...state, zoom }));
  };

  const onZoomOut = () => {
    const zoom = Math.max(settings.zoom - 0.05, 0.2);
    setSettings((state) => ({ ...state, zoom }));
  };

  const onReset = () => {
    setSettings((state) => ({ ...state, zoom: 1 }));
  };

  return (
    <ButtonGroup {...rest}>
      <Button onClick={onZoomOut} variant={variant} size={size}>
        <BiZoomOut />
      </Button>
      <Button
        onClick={onReset}
        variant={variant}
        size={size}
        style={{ width: 55 }}
      >
        {Number.parseFloat(settings.zoom * 100).toFixed(0)}%
      </Button>
      <Button onClick={onZoomIn} variant={variant} size={size}>
        <BiZoomIn />
      </Button>
    </ButtonGroup>
  );
}
