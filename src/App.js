import React, { useState, useEffect } from 'react';
import { Stage, Layer } from "react-konva"
import { GameOfLife, toggleCellAlive } from './util/grid'
import Cell from './components/shapes/cell'
import { connect } from 'react-redux'
import { createCells } from './store/actions';
// GLOBALS
const __SCREEN_WIDTH__ = 800
const __SCREEN_HEIGHT__ = 800
const ___CELL_SIZE__ = 32

const __GRID_ROWS__ = __SCREEN_HEIGHT__ / ___CELL_SIZE__
const __GRID_COLS__ = __SCREEN_WIDTH__ / ___CELL_SIZE__


const App = (props) => {
  // EDITOR SETTINGS
  const { createCells, cells } = props
  const [startSimulation, setStartSimulation] = useState(false)

  // const [cells, setCells] = useState(props.createCells(__GRID_COLS__, __GRID_ROWS__))

  const [dimensions, setDimensions] = useState({
    width: __SCREEN_WIDTH__,
    height: __SCREEN_HEIGHT__,
    grid_size: ___CELL_SIZE__,
    cols: __GRID_COLS__,
    rows: __GRID_ROWS__
  })
  useEffect(() => {
    createCells(__GRID_COLS__, __GRID_ROWS__)
  }, [])
  useEffect(() => {
    if (startSimulation)
      var loop = setInterval(() => {
        // GameOfLife(cells, setCells)
      }, 1000)

    console.log('STOPPING')
    return () => clearInterval(loop)

  }, [startSimulation])

  const togglePlay = () => {
    setStartSimulation(!startSimulation)
  }
  const setAlive = (e) => {
    console.log("clicked ", e.target.attrs.id)
    // toggleCellAlive(cells, e.target.attrs.id, setCells)
    console.table(cells)
  }
  return (
    <div className="App">
      <Stage className="game-view" width={dimensions.width} height={dimensions.height}>
        <Layer>
          {
            cells.map(
              (row, i) => row.map(
                (cell, j) => <Cell id={`${i}-${j}`} key={`${i}-${j}`} x={i} y={j} setAlive={setAlive} alive={cell.alive} />,
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
    cells : store.cells
  }
}

const __actions_list = {
  createCells
}

export default connect(__props, __actions_list)(App);
