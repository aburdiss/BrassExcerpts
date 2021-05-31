import 'react-native';
import React from 'react';
import {
  TextListItem,
  LinkListItem,
  InternalListItem,
  SwitchListItem,
  ButtonListItem,
} from './MoreListItems';
import MockContext from '../../../../jest/MockContext';
import MockNavigator from '../../../../jest/MockNavigator';

import {render} from '@testing-library/react-native';

test('TextListItem renders correctly', () => {
  render(
    <MockContext>
      <TextListItem item={{value: ''}} />
    </MockContext>,
  );
});

test('LinkListItem renders correctly', () => {
  render(
    <MockContext>
      <LinkListItem item={{instrument: undefined}} />
    </MockContext>,
  );
});

test('InternalListItem renders correctly', () => {
  render(
    <MockNavigator>
      <MockContext>
        <InternalListItem item={{value: ''}} />
      </MockContext>
    </MockNavigator>,
  );
});

test('SwitchListItem renders correctly', () => {
  render(
    <MockContext>
      <SwitchListItem item={{value: '', setting: ''}} />
    </MockContext>,
  );
});

test('ButtonListItem renders correctly', () => {
  render(
    <MockContext>
      <ButtonListItem item={{value: ''}} />
    </MockContext>,
  );
});
