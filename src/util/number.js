// 타일 숫자 랜덤하게 생성
export function getRandomInteger(from, to) {
  // random은 0 이상 1미만
  return Math.floor(Math.random() * to + from);
}
