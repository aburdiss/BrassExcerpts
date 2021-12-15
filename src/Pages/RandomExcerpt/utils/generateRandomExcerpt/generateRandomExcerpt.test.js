import { generateRandomExcerpt } from './generateRandomExcerpt';

test('utility is a function', () => {
  expect(typeof generateRandomExcerpt).toEqual('function');
});
