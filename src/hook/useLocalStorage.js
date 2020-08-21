import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  // 읽는 것
  useEffect(() => {
    const valueStr = window.localStorage.getItem(key);
    if (valueStr) {
      setValue(Number(valueStr));
    }
  }, [key]);

  // 이전 점수랑 다르면 새로 저장
  useEffect(() => {
    const prev = window.localStorage.getItem(key);
    const next = String(value);

    if (prev !== next) {
      window.localStorage.setItem(key, next);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
