import React, { useState, useEffect } from 'react';
import { Stage, Layer } from "react-konva"
import Cell from './components/shapes/cell'
import { connect } from 'react-redux'
import { createCells, toggleCell, handleLife } from './store/actions';
// GLOBALS
const __SCREEN_WIDTH__ = 800
const __SCREEN_HEIGHT__ = 800
const ___CELL_SIZE__ = 32

const __GRID_ROWS__ = __SCREEN_HEIGHT__ / ___CELL_SIZE__
const __GRID_COLS__ = __SCREEN_WIDTH__ / ___CELL_SIZE__


const App = (store) => {
  // EDITOR SETTINGS
  const { cells, createCells, toggleCell, handleLife, is_toggling, generation, is_generating, population } = store

  const [startSimulation, setStartSimulation] = useState(false)
  // const [cells, setCells] = useState(store.cells)

  const [dimensions, setDimensions] = useState({
    width: __SCREEN_WIDTH__,
    height: __SCREEN_HEIGHT__,
    grid_size: ___CELL_SIZE__,
    cols: __GRID_COLS__,
    rows: __GRID_ROWS__
  })


  // useEffect(() => {
  //   console.log("MOUNTED")
  //   createCells(__GRID_COLS__, __GRID_ROWS__)
  // }, [])

  /**
   *  SIMULATION LOOP, WILL END EITHER IF THE STOP BUTTON IS PRESSED OR IF THE GAME STATE REACHES GAME_OVER
   */
  useEffect(() => {
    if (startSimulation) {

      var simulate = setInterval(() => {
        console.log("simulating")
        if (population > 0) {
          handleLife(cells)
        } else {
          setStartSimulation(false)
          createCells(__GRID_COLS__, __GRID_ROWS__)
        }
      }, 0)
    }
    return () => clearInterval(simulate)

  }, [startSimulation])


  useEffect(() => {
    // setCells(store.cells)
  }, [is_toggling, is_generating])

  const togglePlay = () => {
    setStartSimulation(!startSimulation)
  }

  return (
    <div className="App">

      <Stage className="game-view" width={dimensions.width} height={dimensions.height}>
        <Layer >
          {
            cells.map(
              (row, x) => row.map(
                (cell, y) => <Cell
                  cells={cells}
                  id={`${cell.x}-${cell.y}`}
                  key={`${cell.x}-${cell.y}`}
                  x={cell.x}
                  y={cell.y}
                  toggleCell={toggleCell}
                  isAlive={cell.isAlive}
                  is_toggling={is_toggling}
                  is_generating={is_generating}
                  generation={generation} />,
              )
            )
          }
        </Layer>
      </Stage>

      <div className="controls">
        <button onClick={togglePlay}>{`${startSimulation ? "Stop" : "Play"}`}</button>
      </div>
    </div>
  );
}

const __props = (store) => {
  return {
    cells: store.cells,
    is_toggling: store.is_toggling,
    is_generating: store.is_generating,
    generation: store.generation,
    population: store.population
  }
}

const __actions_list = {
  createCells,
  toggleCell,
  handleLife
}

export default connect(__props, __actions_list)(App);
