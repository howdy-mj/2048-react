import React from "react";
import cn from "classnames";

const Tile = ({ x, y, value, isNew, isMerged }) => {
  return (
    <div
      className={cn(`tile tile-${value} tile-position-${x}-${y}`, {
        "tile-new": isNew,
        "tile-merged": isMerged,
      })}
    >
      <div className="tile-inner">{value}</div>
    </div>
  );
};

export default Tile;
