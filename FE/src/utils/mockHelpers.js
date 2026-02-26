export const clone = (value) => JSON.parse(JSON.stringify(value));

export const withMockPromise = (payload, delay = 120) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(clone(payload));
    }, delay);
  });
