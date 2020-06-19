import React, { useEffect, useState } from "react";
import { Rect } from "react-konva";
import { CREATE_CELLS_FINISHED } from "../../store/actions";

const Cell = (props) => {
  const { id, x = 0, y = 0, width, height, isAlive, toggleCell, is_simulating } = props;

  const [status, setStatus] = useState(isAlive);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setStatus(isAlive);
  }, [isAlive]);
  const randomColor = () => {
    // will generate a random color between the colors chosen
    const arr_of_colors = ["lawngreen", "red", "green", "blue", "black"];
    const num = Math.floor(Math.random() * arr_of_colors.length - 1);
    return arr_of_colors[0];
  };
  const [color, setColor] = useState(randomColor());
  return (
    <Rect
      id={id}
      x={x * width + 1}
      y={y * height + 1}
      width={width - 2}
      height={height - 2}
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
      stroke={status ? "black" : hover ? "darkgreen" : "#181818"}
      shadowBlur="lawngreen"
    />
  );
};

export default Cell;
