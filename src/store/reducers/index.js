import { CREATE_CELLS_FINISHED, CREATE_CELLS_START, TOGGLE_CELL, TOGGLE_CELL_END, SAVE, CREATE_NEXT_GENERATION_START, CREATE_NEXT_GENERATION_END } from "../actions"

const init = {
    cells: JSON.parse(window.localStorage.getItem("cell_matrix")) || [],
    is_generating: false,
    is_toggling: false,
    generation: 0,
    population: 0
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
            return {
                ...state,
                cells: action.payload,
                is_generating: false
            }
        // EDITOR ---
        case TOGGLE_CELL:
            var count = 0
            const updateCells = () =>
                state.cells.filter((rows) =>
                    rows.filter((_cell) => {
                        if (_cell.id === action.payload) {
                            _cell.isAlive = !_cell.isAlive
                            if (_cell.isAlive) {
                                count += 1
                            } else {
                                count -= 1
                            }
                        } else {
                            _cell.isAlive = _cell.isAlive

                        }
                    }))

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
            const countNeighbors = (cells, x, y, cols, rows) => {
                var sum = 0
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        // if (cells[i + x][j + x].props.isAlive) {
                        //     __sum += 1
                        // }
                        let col = (x + i + cols) % cols
                        let row = (y + j + rows) % rows
                        sum += cells[col][row].isAlive === true ? 1 : 0
                    }
                }

                sum -= cells[x][y].isAlive === true ? 1 : 0
                // DISPATCH --- count neighbors end
                return sum
            }

            var next_generaton = action.payload
            var count = 0
            var generate = () => {

                state.cells.filter((rows, x) =>
                    rows.filter((_cell, y) => {
                        //----- count neighbors -----
                        const neighbors = countNeighbors(state.cells, x, y, 25, 25)
                        //---- apply rules ----
                        if (_cell.isAlive === false && neighbors === 3) {
                            next_generaton[x][y].isAlive = true
                            count += 1
                        } else if (_cell.isAlive === true && (neighbors < 2 || neighbors > 3)) {
                            next_generaton[x][y].isAlive = false
                            count -= 1
                        } else {
                            next_generaton[x][y].isAlive = _cell.isAlive
                        }
                    }))

                return next_generaton
            }
            return {
                ...state,
                cells: generate(),
                is_generating: true,
                generation: state.generation += 1,
                population: state.population + count
            }
        case CREATE_NEXT_GENERATION_END:
            return {
                ...state,
                is_generating: false

            }
        case SAVE:
            window.localStorage.setItem("cell_matrix", JSON.stringify(state.cells))
            return state
        default:
            return state
    }
}