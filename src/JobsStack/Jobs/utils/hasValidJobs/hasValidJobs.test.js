import { hasValidJobs } from './hasValidJobs';

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
