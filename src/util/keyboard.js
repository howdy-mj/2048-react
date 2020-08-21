import hotkeys from "hotkeys-js";

// 옵저버 패턴
const observerMap = {};

export function addKeyObserver(key, callback) {
  if (!observerMap[key]) {
    // 없다면 hotkey에 등록
    observerMap[key] = [];
    hotkeys(key, () => executeCallbacks(key));
  }
  observerMap[key].push(callback);
}

export function removeKeyObserver(key, callback) {
  // callback이 아닌 것만
  observerMap[key] = observerMap[key].filter((item) => item !== callback);
}

// 콜백 함수
function executeCallbacks(key) {
  for (const ob of observerMap[key]) {
    ob();
  }
}
