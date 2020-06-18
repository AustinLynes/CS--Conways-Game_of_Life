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

   useEffect(()=>{
    createCells(dimensions.cols, dimensions.rows)
   },[])
  useEffect(() => {
    if (startSimulation) {
      
      var simulate = setInterval(() => {
        console.log("simulating")
        if (population > 0) {
          handleLife(dimensions.cols, dimensions.rows)
        } else {
          setStartSimulation(false)
          createCells(dimensions.cols, dimensions.rows)
        }
      }, 0)
    }
    return () => clearInterval(simulate)

  }, [startSimulation])


  useEffect(() => {
    createCells(dimensions.cols, dimensions.rows)
    // setCells(store.cells)
  }, [dimensions.cols, dimensions.rows])

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
        <button onClick={()=>{setStartSimulation(true)}}>Start Simulation</button>
        <button onClick={()=>{setStartSimulation(false)}}>Pause Simulation</button>
        <button onClick={()=>{createCells(dimensions.cols, dimensions.rows)}}>Clear Cells</button>
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
