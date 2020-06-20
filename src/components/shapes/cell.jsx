import React, { useEffect, useState } from "react";
import { Rect } from "react-konva";
import { CREATE_CELLS_FINISHED } from "../../store/actions";

const Cell = (props) => {
  const {
    id,
    x = 0,
    y = 0,
    width,
    height,
    isAlive,
    toggleCell,
    is_simulating,
  } = props;

  const [status, setStatus] = useState(isAlive);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setStatus(isAlive);
  }, [isAlive]);
  const randomColor = () => {
    //                        R           G           B
    const arr_of_colors = ["#FF9999", "#99FF99", "#9999FF"];
    // will generate a random color between the colors chosen
    var num = Math.floor(Math.random() * arr_of_colors.length);

    for (let i = 0; i < 100; i++) {
      num = Math.floor(Math.random() * arr_of_colors.length);
    }
    
    return { color: arr_of_colors[num], id: num };
  };
  const [color, setColor] = useState(randomColor().color);
  return (
    <Rect
      cornerRadius={status ? 25 : 0}
      className="rect"
      id={id}
      x={x * width}
      y={y * height}
      width={width}
      height={height}
      onTap={() => {
        if (!is_simulating) toggleCell(id);
      }}
      onClick={() => {
        if (!is_simulating) toggleCell(id);
      }}
      onMouseOver={() => {
        if (!is_simulating) setHover(true);
      }}
      onMouseOut={() => {
        if (!is_simulating) setHover(false);
      }}
      fill={status ? color : hover ? "rgba(0,255,0,.2)" : "#111"}
      stroke={status ? color : hover ? "darkgreen" : "#181818"}
      shadowColor={color}
      shadowBlur={50}
      zIndex={status ? 99999 : 1}
      // shadowOffsetX={0}
      // shadowOffsetY={-20}
      // shadowOpacity={1}
      shadowEnabled={status}
    />
  );
};

export default Cell;
