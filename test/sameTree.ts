import { isSameTree } from '../src/sameTree';

describe('isSameTree', () => {
  test('isSameTree test1 true', () => {
    const p = [1, 2, 3];
    const q = [1, 2, 3];
    expect(isSameTree(p, q)).toBeTruthy();
  });
  test('isSameTree test2 false', () => {
    const p = [1, 2];
    const q = [1, null, 2];
    expect(isSameTree(p, q)).toBeFalsy();
  });

  test('isSameTree test3 false', () => {
    const p = [1, 2, 1];
    const q = [1, 1, 2];
    expect(isSameTree(p, q)).toBeFalsy();
  });
});
