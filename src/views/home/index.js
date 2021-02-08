import React, { useState, useEffect, useRef } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup, Alert, Form } from 'react-bootstrap';

import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';

import { Wrapper } from 'components/wrapper';
import { Presenter } from 'components/presenter';
import { Controls } from 'components/controls';
import { Sidebar } from 'components/sidebar';
import { Bookmark, createStorageKey } from 'components/bookmark';
import { List } from 'components/list';

import {
  useScriptures,
  useVerse,
  useMoveVerse,
  usePresenter,
  useChannel,
} from 'hooks';
import { Storage } from 'utils';
import { ITEMS_PER_LIST } from 'values';

function HomeView() {
  return (
    <Wrapper>
      <Sidebar>
        <h1 className="text-light display-4">Home</h1>
      </Sidebar>

      <Wrapper direction="column">
        <Presenter>Welcome!</Presenter>
        <Controls centered>controls</Controls>
      </Wrapper>
    </Wrapper>
  );
}

export default HomeView;
