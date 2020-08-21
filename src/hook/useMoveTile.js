import { useEffect } from "react";
import { addKeyObserver, removeKeyObserver } from "../util/keyboard";
import { makeTile, moveTile } from "../util/tile";

export default function useMoveTile({ tileList, setTileList, setScore }) {
  // 움직이고 추가까지 하는 함수
  function moveAndAdd({ x, y }) {
    // x는 좌우, y는 상하
    // 움직여서 새로운 tileList 생성
    const newTileList = moveTile({ tileList, x, y });

    // 점수는 isMerged를 기준으로 올라감
    const score = newTileList.reduce(
      (acc, item) => (item.isMerged ? acc + item.value : acc),
      0
    );
    setScore((v) => v + score); // 이전 값에서 지금 옮긴 score

    const newTile = makeTile(newTileList);
    newTile.isNew = true; // 새로 만들어진게 맞다고 tile에 저장
    newTileList.push(newTile);
    setTileList(newTileList);
  }

  // 해제하려하니, 함수의 레퍼런스를 고정할 필요가 있음
  function moveUp() {
    moveAndAdd({ x: 0, y: -1 });
  }
  function moveDown() {
    moveAndAdd({ x: 0, y: 1 });
  }
  function moveLeft() {
    moveAndAdd({ x: -1, y: 0 });
  }
  function moveRight() {
    moveAndAdd({ x: 1, y: 0 });
  }

  useEffect(() => {
    addKeyObserver("up", moveUp);
    addKeyObserver("down", moveDown);
    addKeyObserver("left", moveLeft);
    addKeyObserver("right", moveRight);

    return () => {
      removeKeyObserver("up", moveUp);
      removeKeyObserver("down", moveDown);
      removeKeyObserver("left", moveLeft);
      removeKeyObserver("right", moveRight);
    };
  });
}
