import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import MockContext from '../../../jest/MockContext';
import MockNavigator from '../../../jest/MockNavigator';

import Jobs from './Jobs';
import {hasValidJobs} from './JobsUtils';

test('Jobs renders correctly', () => {
  render(
    <MockNavigator>
      <MockContext>
        <Jobs />
      </MockContext>
    </MockNavigator>,
  );
});

describe('hasValidJobs returns correct value', () => {
  test('no jobs', () => {
    const mockJobs = undefined;
    const validJobs = hasValidJobs(mockJobs);
    expect(validJobs).toBeFalsy();
  });

  test('one valid job', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const mockJobs = [
      {
        closingDate: tomorrow,
      },
    ];
    const validJobs = hasValidJobs(mockJobs);
    expect(validJobs).toBeTruthy();
  });

  test('one invalid job', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const mockJobs = [
      {
        closingDate: yesterday,
      },
    ];
    const validJobs = hasValidJobs(mockJobs);
    expect(validJobs).toBeFalsy();
  });

  test('one valid, one invalid job', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const mockJobs = [
      {
        closingDate: yesterday,
      },
      {
        closingDate: tomorrow,
      },
    ];
    const validJobs = hasValidJobs(mockJobs);
    expect(validJobs).toBeTruthy();
  });
});
