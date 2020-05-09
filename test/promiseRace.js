import { promiseRace } from '../src/promiseRace.js';

describe('promiseRace', () => {
  test('promiseRace test1 resolve', () => {
    expect.assertions(1);
    let p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('p1success');
      }, 1000);
    });

    let p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('p2failed');
      }, 500);
    });

    let p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('p3success');
      }, 100);
    });

    return promiseRace([p1, p2, p3]).then(data => {
      expect(data).toMatch('p3success');
    });
  });
  test('promiseRace test2 reject', () => {
    expect.assertions(1);
    let p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('p1success');
      }, 1000);
    });

    let p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('p2failed');
      }, 500);
    });

    return promiseRace([p1, p2]).catch(e => {
      expect(e).toMatch('p2failed');
    });
  });
});
