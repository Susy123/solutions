import { maxProfit } from '../src/stockMaxProfit';

describe('stockMaxProfit', () => {
  test('stockMaxProfit test1', () => {
    const prices = [7, 1, 5, 3, 6, 4];
    expect(maxProfit(prices)).toBe(5);
  });
  test('stockMaxProfit test2', () => {
    const prices = [0];
    expect(maxProfit(prices)).toBe(0);
  });
});
