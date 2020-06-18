export const SAVE = "SAVE"
export const CREATE_CELLS_START = "CREATE_CELLS_START"
export const CREATE_CELLS_FINISHED = "CREATE_CELLS_FINISHED"
export const TOGGLE_CELL = "TOGGLE_CELL"
export const TOGGLE_CELL_END = "TOGGLE_CELL_END"
export const CREATE_NEXT_GENERATION_START = "CREATE_NEXT_GENERATION_START"
export const CREATE_NEXT_GENERATION_END = "CREATE_NEXT_GENERATION_END"

/** 
 * @description 
 * creates a 2D Grid of Cells
 * @param {number} cols 
 * @param {number} rows
 * @example createCells(3,3) =>
 * [row[col, col, col], row[col, col col], row[col, col, col]]
*/
export const createCells = (cols, rows) => dispatch => {
    var _cells = []
    dispatch({ type: CREATE_CELLS_START })
    for (let x = 0; x < cols; x++) {
        _cells.push([])
        for (let y = 0; y < rows; y++)
            _cells[x].push({ id: `${x}-${y}`, x: x, y: y, isAlive: false })
    }

    dispatch({ type: CREATE_CELLS_FINISHED, payload: _cells })
}
/**
 * @description 
 *  Will Toggle The Given Cells Status To Alive Or Dead
 * @param {array} cells 
 * @param {str} id 
 * @param {fn()} cb 
 */
export const toggleCell = (id) => dispatch => {
    dispatch({ type: TOGGLE_CELL, payload: id })
    dispatch({ type: TOGGLE_CELL_END })
    dispatch({type: SAVE})
}


const createNextGeneration = ()  => {
    var _cells = []
    for (let x = 0; x < 25; x++) {
        _cells.push([])
        for (let y = 0; y < 25; y++)
            _cells[x].push({ id: `${x}-${y}`, x: x, y: y, isAlive: false })
    }
    return _cells
}

/**
 * @title The Game of Life algorithm
 * @description ---tbd
 * 
 * */ 
export const handleLife = (cells) => dispatch => {
    // const { cols, rows } = options

    // var next_generation = createCells(cols, rows) 
    // DISPATCH ----- create generation.  ----- seccond buffer.
    const next_generation = createNextGeneration()
    dispatch({type:CREATE_NEXT_GENERATION_START, payload: next_generation})
    // cells.map(row =>
    //     row.map(_cell => {
    //         // DISPATCH 

    //         // DISPATCH ----- apply rules ----
    //         // const { isAlive, x, y } = _cell.props
    //         // var neighbors = countNeighbors(cells, x, y, cols, rows)

    //         // RULE 1
    //         // if (isAlive && neighbors === 3) {
    //         //     console.log("RULE 1 DEATH MET!")
    //         //     next_generation[x][y].props.setAlive(false)
    //         // }
    //         // // RULE 2
    //         // else if (!isAlive && (neighbors > 2 || neighbors < 3)) {
    //         //     console.log("RULE 2 BIRTH MET!")
    //         //     next_generation[x][y].props.setAlive(true)

    //         // }
    //         // // RULE 3
    //         // else {
    //         //     console.log("RULE 3 STASIS")
    //         //     next_generation[x][y].props.setAlive(isAlive)

    //         // }

    //     }))
    dispatch({type:CREATE_NEXT_GENERATION_END})
    // DISPATCH ---- update generation ---- swap buffer
    // updateCells(next_generation)
    
}


