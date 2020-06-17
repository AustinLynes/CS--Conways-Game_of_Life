import React from 'react'
import Cell from '../components/shapes/cell'

const createGrid = (cols, rows) => {
    var _grid = new Array(cols)
    for (let x = 0; x < _grid.length; x++) {
        console.log("im running!")
        _grid[x] = new Array(rows)
    }

    return _grid
}

const createCells = (cols, rows) => {
    var _cells = []
    for (let x = 0; x < cols; x++) {
        _cells.push([])
        for (let y = 0; y < rows; y++) {
            const val = Math.floor(Math.random() * 2) + 1
            _cells[x].push(<Cell key={`${x}-${y}`} x={x} y={y} isAlive={val === 1 ? true : false} />)
        }
    }
    return _cells
}

const toggleCellAlive = (e) => {
    // console.log(e.target)

}

export { createCells, createGrid }