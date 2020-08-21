export const assert = function (condition, message) {
  // 조건을 만족하지 않으면 에러 throw
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
};
