import React, { useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import Cell from "./components/shapes/cell";
import { connect } from "react-redux";
import {
  createCells,
  finish_life,
  toggleCell,
  handleLife,
} from "./store/actions";
import InformationPanel from "./components/info-panel";
import Controls from "./components/controls";
import ReactTooltip from "react-tooltip";

const App = (store) => {
  // EDITOR SETTINGS
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
  } = store;

  /**
   *  SIMULATION LOOP, WILL END EITHER IF THE STOP BUTTON IS PRESSED OR IF THE GAME STATE REACHES GAME_OVER
   */

  
  const game_loop = ()=>{
    if (is_simulating) {
      var simulate = setInterval(() => {
        console.log("simulating");
        if (population > 0) {
          handleLife(cells, dimensions.cols, dimensions.rows);
          finish_life();
        }
      }, 10);
    }
    return () => clearInterval(simulate);
  }
  
  useEffect(() => {
    createCells(dimensions.cols, dimensions.rows);
  }, []);
  
  useEffect(game_loop, [is_simulating, is_generating===false]);

  useEffect(() => {
    createCells(dimensions.cols, dimensions.rows);
  }, [dimensions.cols, dimensions.rows]);

  return (
    <div className="App">
      {/* <GuidePanel /> */}
      <Controls />

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
      <InformationPanel />
      <ReactTooltip place="bottom"/>
    </div>
  );
};

//REDUX  ------------------------

const __props = (store) => {
  return {
    cells: store.cells,
    is_toggling: store.is_toggling,
    is_generating: store.is_generating,
    is_simulating: store.is_simulating,
    generation: store.generation,
    population: store.population,
    dimensions: store.dimensions,
  };
};

const __actions_list = {
  createCells,
  toggleCell,
  handleLife,
  finish_life,
};

export default connect(__props, __actions_list)(App);
