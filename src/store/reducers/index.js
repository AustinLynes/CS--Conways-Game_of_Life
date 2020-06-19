import { CREATE_CELLS_FINISHED, CREATE_CELLS_START, TOGGLE_CELL, TOGGLE_CELL_END, SAVE, CREATE_NEXT_GENERATION_START, CREATE_NEXT_GENERATION_END } from "../actions"

// GLOBALS
const __GRID_WIDTH__ = 1280
const __GRID_HEIGHT__ = 912
const ___CELL_SIZE__ = 16
const __GRID_ROWS__ = __GRID_HEIGHT__ / ___CELL_SIZE__
const __GRID_COLS__ = __GRID_WIDTH__ / ___CELL_SIZE__

const init = {
    cells: [],
    is_generating: false,
    is_toggling: false,
    generation: 0,
    population: 0,
    dimensions: {
        width: __GRID_WIDTH__,
        height: __GRID_HEIGHT__,
        grid_size: ___CELL_SIZE__,
        cols: __GRID_COLS__,
        rows: __GRID_ROWS__
    }
}

export function gridReducer(state = init, action) {
    switch (action.type) {
        // GENERATION
        case CREATE_CELLS_START:
            return {
                ...state,
                is_generating: true
            }
        case CREATE_CELLS_FINISHED:
            var _cells = []
            for (let x = 0; x < state.dimensions.cols; x++) {
                _cells.push([])
                for (let y = 0; y < state.dimensions.rows; y++)
                    _cells[x].push({ id: `${x}-${y}`, x: x, y: y, isAlive: false })
            }

            return {
                ...state,
                cells: _cells,
                is_generating: false
            }
        // EDITOR ---
        case TOGGLE_CELL:
            var count = 0
            const updateCells = () => {
                const l_cells = state.cells
                for (let x = 0; x < state.dimensions.cols; x++) {
                    for (let y = 0; y < state.dimensions.rows; y++) {
                        if (l_cells[x][y].id === action.payload) {
                            l_cells[x][y].isAlive = !state.cells[x][y].isAlive
                            if (l_cells[x][y].isAlive) {
                                count += 1
                            }
                            else {
                                count -= 1
                            }
                        }
                    }
                }
                return l_cells
            }
            return {
                ...state,
                cells: updateCells(),
                is_toggling: true,
                population: state.population += count
            }
        case TOGGLE_CELL_END:
            return {
                ...state,
                is_toggling: false
            }

        case CREATE_NEXT_GENERATION_START:
            const countNeighbors = (x, y) => {
                var sum = 0
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        let col = (x + i + state.dimensions.cols) % state.dimensions.cols
                        let row = (y + j + state.dimensions.rows) % state.dimensions.rows
                        sum += state.cells[col][row].isAlive === true ? 1 : 0
                    }
                }

                sum -= state.cells[x][y].isAlive === true ? 1 : 0
                return sum
            }

            var count = 0
            var handle_life = () => {
                var next_generaton = action.payload
                for (let x = 0; x < state.dimensions.cols; x++) {
                    for (let y = 0; y < state.dimensions.rows; y++) {
                        const neighbors = countNeighbors(x, y)
                        const prev_state = state.cells[x][y].isAlive
                        if(prev_state === false && neighbors === 3){
                            next_generaton[x][y].isAlive = true
                        }else if(prev_state === true && (neighbors < 2 || neighbors > 3)){
                            next_generaton[x][y].isAlive = false
                        }else{
                            next_generaton[x][y].isAlive = prev_state
                        }
                    }
                }
                return next_generaton
            }
            return {
                ...state,
                cells: handle_life(),
                is_generating: true,
                generation: state.generation + 1,
                population: state.population + count
            }
        case CREATE_NEXT_GENERATION_END:
            return {
                ...state,
                is_generating: false

            }
        case "CLEAR":
            
        case SAVE:
            window.localStorage.setItem("cell_matrix", JSON.stringify(state.cells))
            return state
        default:
            return state
    }
}