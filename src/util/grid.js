const createGrid = (cols, rows) => {
    var _grid = new Array(cols)
    for (let x = 0; x < _grid.length; x++) {
        console.log("im running!")
        _grid[x] = new Array(rows)
    }

    return _grid
}


export const toggleCellAlive = (cells, id, cb) => {
    cb([...cells,
    cells.filter((rows, i) =>
        rows.filter((_cell, j) => {
            if (_cell.id === id) {
                _cell.isAlive = !_cell.isAlive
                console.log("found one ", _cell)
            }
        }
        ))
    ])
}

// The Game of Life algorithm
export const GameOfLife = (cells, updateCells, options = { cols: 25, rows: 25 }) => {
    // // double buffer
    // const { cols, rows } = options

    // var next_generation = createCells(cols, rows)

    // cells.map(row =>
    //     row.map(_cell => {
    //         console.log(_cell)
    //         const { isAlive, x, y } = _cell.props
    //         var neighbors = countNeighbors(cells, x, y, cols, rows)

    //         // RULE 1
    //         if (isAlive && neighbors === 3) {
    //             console.log("RULE 1 DEATH MET!")
    //             next_generation[x][y].props.setAlive(false)
    //         }
    //         // RULE 2
    //         else if (!isAlive && (neighbors > 2 || neighbors < 3)) {
    //             console.log("RULE 2 BIRTH MET!")
    //             next_generation[x][y].props.setAlive(true)

    //         }
    //         // RULE 3
    //         else {
    //             console.log("RULE 3 STASIS")
    //             next_generation[x][y].props.setAlive(isAlive)

    //         }
    //         return 1
    //     }))

    // updateCells(next_generation)
}


const countNeighbors = (cells, x, y, cols, rows) => {
    var __sum = 0
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            // if (cells[i + x][j + x].props.isAlive) {
            //     __sum += 1
            // }
            let col = (x + i + cols) % cols
            let row = (y + j + rows) % rows
            __sum += cells[col][row].props.isAlive === true ? 1 : 0
        }
    }

    __sum -= cells[x][y].props.isAlive === true ? 1 : 0
    return __sum

}

export { createGrid }