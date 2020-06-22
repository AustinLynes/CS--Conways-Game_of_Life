import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Cell from "../shapes/cell";
import { Stage, Layer } from "react-konva";

// actions 
import {
  createCells,
  finish_life,
  toggleCell,
  handleLife,
} from "../../store/actions/grid";

const Canvas = (props) => {
  const {
    cells,
    is_simulating,
    is_generating,
    createCells,
    toggleCell,
    handleLife,
    population,
    dimensions,
    finish_life,
    simulation_speed
  } = props;
  /**
   *  SIMULATION LOOP, WILL END EITHER IF THE STOP BUTTON IS PRESSED OR
   *  IF THE GAME STATE REACHES GAME_OVER
   */
  const game_loop = () => {
    if (is_simulating) {
      var simulate = setInterval(() => {
        console.log("simulating");
        if (population > 0) {
          handleLife(cells, dimensions.cols, dimensions.rows);
          finish_life();
        }
      }, simulation_speed * 1000);
    }
    return () => clearInterval(simulate);
  };

  useEffect(() => {
    createCells(dimensions.cols, dimensions.rows);
  }, []);

  useEffect(game_loop, [is_simulating === true, is_generating === false]);

  useEffect(() => {
    createCells(dimensions.cols, dimensions.rows);
  }, [dimensions.grid_size,dimensions.cols, dimensions.rows]);

  return (
    <Stage
      className="game-view"
      width={dimensions.width}
      height={dimensions.height}
    >
      <Layer>
        {cells.map((row, x) =>
          row.map((cell, y) => (
            <Cell
              id={`${cell.x}-${cell.y}`}
              key={`${cell.x}-${cell.y}`}
              x={cell.x}
              y={cell.y}
              width={dimensions.grid_size}
              height={dimensions.grid_size}
              toggleCell={toggleCell}
              isAlive={cell.isAlive}
              is_simulating={is_simulating}
            />
          ))
        )}
      </Layer>
    </Stage>
  );
};
const __props = (store) => {
  return {
    cells: store.grid.cells,
    is_toggling: store.grid.is_toggling,
    is_generating: store.grid.is_generating,
    is_simulating: store.grid.is_simulating,
    generation: store.grid.generation,
    population: store.grid.population,
    dimensions: store.grid.dimensions,
    guide_open: store.app.guide_open,
    simulation_speed: store.grid.simulation_speed
  };
};

const __actions_list = {
  createCells,
  toggleCell,
  handleLife,
  finish_life,
};

export default connect(__props, __actions_list)(Canvas);
