export const CREATE_CELLS_START = "CREATE_CELLS_START"
export const CREATE_CELLS_FINISHED = "CREATE_CELLS_FINISHED"

export const createCells = (cols, rows) => dispatch => {
    var _cells = []
    dispatch({ type: CREATE_CELLS_START })
    for (let x = 0; x < cols; x++) {
        _cells.push([])
        for (let y = 0; y < rows; y++) {
            _cells[x].push({ id: `${x}-${y}`, x: x, y: y, isAlive: false })
        }
    }

    dispatch({ type: CREATE_CELLS_FINISHED, payload: _cells })
}
