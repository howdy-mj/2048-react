import React, { useState } from "react";
import times from "lodash/times";
import { MAX_POSITION } from "../constant";
import { getInitiailTileList } from "../util/tile";
import useMoveTile from "../hook/useMoveTile";
import Tile from "./Tile";

export default function Game({ setScore }) {
  const [tileList, setTileList] = useState(getInitiailTileList);
  // 사용할 키보드: up, down, left, right
  useMoveTile({ tileList, setTileList, setScore });

  return (
    <div className="game-container">
      {/* 네모 틀 x * y개 */}
      <div className="grid-container">
        {/* 가로 세로 MAX_POSITION 만큼 출력 */}
        {times(MAX_POSITION, (index) => (
          <div key={index} className="grid-row">
            {times(MAX_POSITION, (index2) => (
              <div key={index2} className="grid-cell"></div>
            ))}
          </div>
        ))}
      </div>

      <div className="tile-container">
        {/* 안에 있는 숫자*/}
        {tileList.map((item) => (
          <Tile key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
