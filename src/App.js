import React, { useState, useEffect } from 'react';
import { Stage, Layer } from "react-konva"
import Cell from './components/shapes/cell'
import { connect } from 'react-redux'
import { createCells, toggleCell, handleLife } from './store/actions';


const App = (store) => {
  // EDITOR SETTINGS
  const {
    cells,
    createCells,
    toggleCell,
    handleLife,
    is_toggling,
    generation,
    is_generating,
    population,
    dimensions } = store

  const [startSimulation, setStartSimulation] = useState(false)

  /**
   *  SIMULATION LOOP, WILL END EITHER IF THE STOP BUTTON IS PRESSED OR IF THE GAME STATE REACHES GAME_OVER
   */

  useEffect(() => {
    createCells(dimensions.cols, dimensions.rows)
  }, [])
  useEffect(() => {
    if (startSimulation) {

      var simulate = setInterval(() => {
        console.log("simulating")
        if (population > 0) {
          handleLife(dimensions.cols, dimensions.rows)
        } 
      }, 144)
    }
    return () => clearInterval(simulate)

  }, [startSimulation])


  useEffect(() => {
    createCells(dimensions.cols, dimensions.rows)
    // setCells(store.cells)
  }, [dimensions.cols, dimensions.rows])

  return (
    <div className="App">

      <Stage className="game-view" width={dimensions.width} height={dimensions.height}>
        <Layer >
          {
            cells.map(
              (row, x) => row.map(
                (cell, y) => <Cell
                  id={`${cell.x}-${cell.y}`}
                  key={`${cell.x}-${cell.y}`}
                  x={cell.x}
                  y={cell.y}
                  width={dimensions.grid_size}
                  height={dimensions.grid_size}
                  toggleCell={toggleCell}
                  isAlive={cell.isAlive}
                />,
              )
            )
          }
        </Layer>
      </Stage>
      <div className="guide">
          <div className="rules">
            <h3>Rules</h3>
            <ul>
              <li>A Cell Who is Alive, and has 1 or less neighboring cells who are alive. dies. as if from lonleiness</li>
              <li>A Cell Who is Alive, and has 2 or 3 neighboring cells who are alive. <span className="highlight">lives on </span>to the next generation</li>
              <li>A Cell Who is Alive, and has more than 3 neighboring cells who are alive. dies. as if from <span className="highlight" >overpopulation</span></li>
              <li>A Cell Who is Dead, and has exactly 3 neighboring cells who are alive. becomes alive. as if from <span className="highlight">reproduction</span></li>
            </ul>
          </div>
      </div>
      <div className="controls">
        <button onClick={() => { setStartSimulation(true) }}>Start Simulation</button>
        <button onClick={() => { setStartSimulation(false) }}>Pause Simulation</button>
        <button onClick={() => {  setStartSimulation(false);createCells(dimensions.cols, dimensions.rows) }}>Clear Cells</button>
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
    population: store.population,
    dimensions: store.dimensions
  }
}

const __actions_list = {
  createCells,
  toggleCell,
  handleLife
}

export default connect(__props, __actions_list)(App);
