import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Treemap } from '.';

const stories = storiesOf('UI/Treemap', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Treemap
    data={[
      {
        id: 'js',
        value: 900,
        label: 'JavaScript',
      },
      {
        id: 'css',
        value: 200,
        label: 'CSS',
      },
      {
        id: 'media',
        value: 400,
        label: 'Media',
      },
      {
        id: 'html',
        value: 50,
        label: 'HTML',
      },
      {
        id: 'media',
        value: 5,
        label: 'Media',
      },
    ]}
  />
));

stories.add('with small values', () => (
  <Treemap
    data={[
      {
        id: 'js',
        value: 900,
        label: 'JavaScript',
      },
      {
        id: 'css',
        value: 200,
        label: 'CSS',
      },
      {
        id: 'media',
        value: 400,
        label: 'Media',
      },
      {
        id: 'html',
        value: 1,
        label: 'HTML',
      },
      {
        id: 'media',
        value: 1,
        label: 'Media',
      },
    ]}
  />
));
