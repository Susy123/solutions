/**
 * promise.race
 */
export function promiseRace(promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError('You must pass array');
  }

  return new Promise(function (resolve, reject) {
    function resolver(value) {
      resolve(value);
    }

    function rejecter(reason) {
      reject(reason);
    }

    for (var i = 0; i < promises.length; i++) {
      promises[i].then(resolver, rejecter);
    }
  });
}