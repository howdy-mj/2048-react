import { getRandomInteger } from "./number";
import { MAX_POSITION } from "../constant";
import { assert } from "./assert";

// 초기 tileList에 생성
export function getInitiailTileList() {
  const tileList = [];
  // 두개 tile 생성
  const tile1 = makeTile(tileList);
  tileList.push(tile1);
  const tile2 = makeTile(tileList);
  tileList.push(tile2);
  return tileList;
}

// tileList에 tile이 있는지 검사하는 함수
function checkCollision(tileList, newTile) {
  // titleList 안에 title이 있다면 true
  // some은 true가 하나라도 있으면 만족
  return tileList.some((tile) => tile.x === newTile.x && tile.y === newTile.y);
}

// x, y값을 랜덤하게 생성
let currentId = 0;
export function makeTile(tileList) {
  let newTile;
  // 위치 검사, tile이 없거나, 겹치지 않는다면 tile 반환
  while (!newTile || (tileList && checkCollision(tileList, newTile))) {
    newTile = {
      id: currentId++,
      x: getRandomInteger(1, MAX_POSITION),
      y: getRandomInteger(1, MAX_POSITION),
      value: 2,
      isNew: undefined,
      isMerged: undefined,
    };
  }
  return newTile;
}

// tileList와 움직임 정보(x, y)를 받아서 움직인 후,
// newTileList 반환
export function moveTile({ tileList, x, y }) {
  assert(x === 0 || y === 0, ""); // x, y 중 하나는 무조건 안 움직여야 함. 대각선 방지
  const isMoveY = y !== 0;
  const isMinus = x + y < 0;
  const sorted = tileList
    .map((item) => ({ ...item, isMerged: false, isNew: false }))
    .filter((item) => !item.isDisabled)
    .sort((a, b) => {
      const res = isMoveY ? a.x - b.x : a.y - b.y;
      if (res) {
        return res;
      } else {
        if (isMoveY) {
          return isMinus ? a.y - b.y : b.y - a.y;
        } else {
          return isMinus ? a.x - b.x : b.x - a.x;
        }
      }
    });
  const initialPos = isMinus ? 1 : MAX_POSITION;
  let pos = initialPos;
  for (let i = 0; i < sorted.length; i++) {
    if (isMoveY) {
      sorted[i].y = pos;
      pos = isMinus ? pos + 1 : pos - 1;
      if (sorted[i].x !== sorted[i + 1]?.x) {
        pos = initialPos;
      }
    } else {
      sorted[i].x = pos;
      pos = isMinus ? pos + 1 : pos - 1;
      if (sorted[i].y !== sorted[i + 1]?.y) {
        pos = initialPos;
      }
    }
  }

  let nextPos = 0;
  const newTileList = [...sorted];
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].isDisabled) {
      continue;
    }

    if (
      nextPos &&
      (isMoveY
        ? sorted[i].x === sorted[i - 1]?.x
        : sorted[i].y === sorted[i - 1]?.y)
    ) {
      if (isMoveY) {
        sorted[i].y = nextPos;
      } else {
        sorted[i].x = nextPos;
      }
      nextPos += isMinus ? 1 : -1;
    } else {
      nextPos = 0;
    }

    if (
      (isMoveY
        ? sorted[i].x === sorted[i + 1]?.x
        : sorted[i].y === sorted[i + 1]?.y) &&
      sorted[i].value === sorted[i + 1]?.value
    ) {
      const tile = makeTile();
      tile.x = sorted[i].x;
      tile.y = sorted[i].y;
      tile.isMerged = true;
      tile.value = sorted[i].value * 2;
      newTileList.push(tile);
      sorted[i].isDisabled = true;
      sorted[i + 1].isDisabled = true;
      if (isMoveY) {
        nextPos = sorted[i + 1].y;
        sorted[i + 1].y = sorted[i].y;
      } else {
        nextPos = sorted[i + 1].x;
        sorted[i + 1].x = sorted[i].x;
      }
    }
  }
  return newTileList;
}
