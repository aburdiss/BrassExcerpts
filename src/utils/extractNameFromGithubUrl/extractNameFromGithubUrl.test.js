import { extractNameFromGithubUrl } from './extractNameFromGithubUrl';

test('utility is a function', () => {
  expect(typeof extractNameFromGithubUrl).toEqual('function');
});

test('returns null when no url passed in', () => {
  const output = extractNameFromGithubUrl();
  expect(output).toEqual(null);
});
