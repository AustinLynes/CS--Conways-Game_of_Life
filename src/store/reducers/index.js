import {
  CREATE_CELLS_START,
  TOGGLE_CELL,
  TOGGLE_CELL_END,
  SAVE,
  CREATE_NEXT_GENERATION_START,
  CREATE_NEXT_GENERATION_END,
  STOP_SIMULATION,
  START_SIMULATION,
} from "../actions";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";
import { act } from "react-dom/test-utils";

// GLOBALS
const __GRID_WIDTH__ = 1280;
const __GRID_HEIGHT__ = 768;
const ___CELL_SIZE__ = 32;
const __GRID_ROWS__ = Math.ceil(__GRID_HEIGHT__ / ___CELL_SIZE__);
const __GRID_COLS__ = Math.ceil(__GRID_WIDTH__ / ___CELL_SIZE__);

const init = {
  cells: [],
  is_simulating: false,
  is_generating: false,
  is_toggling: false,
  generation: 0,
  population: 0,
  dimensions: {
    width: __GRID_WIDTH__,
    height: __GRID_HEIGHT__,
    grid_size: ___CELL_SIZE__,
    cols: __GRID_COLS__,
    rows: __GRID_ROWS__,
  },
};

export function gridReducer(state = init, action) {
  switch (action.type) {
    case CREATE_CELLS_START:
      var _cells = [];
      for (let x = 0; x < state.dimensions.cols; x++) {
        _cells.push([]);
        for (let y = 0; y < state.dimensions.rows; y++)
          _cells[x].push({ id: `${x}-${y}`, x: x, y: y, isAlive: false });
      }

      return {
        ...state,
        cells: _cells,
        is_generating: false,
      };

    // EDITOR ---
    case TOGGLE_CELL:
      var count = 0;
      const updateCells = () => {
        const l_cells = state.cells;
        for (let x = 0; x < state.dimensions.cols; x++) {
          for (let y = 0; y < state.dimensions.rows; y++) {
            if (l_cells[x][y].id === action.payload) {
              l_cells[x][y].isAlive = !state.cells[x][y].isAlive;
              if (l_cells[x][y].isAlive) {
                count += 1;
              } else {
                count -= 1;
              }
            }
          }
        }
        return l_cells;
      };
      console.log("toggling");
      return {
        ...state,
        cells: updateCells(),
        is_toggling: true,
        population: (state.population += count),
      };
    case TOGGLE_CELL_END:
      return {
        ...state,
        is_toggling: false,
      };
    case START_SIMULATION:
      return {
        ...state,
        is_simulating: true,
      };
    case STOP_SIMULATION:
      return {
        ...state,
        is_simulating: false,
        is_generating: false,
        population: 0,
        generation: 0,
      };
    case CREATE_NEXT_GENERATION_START:
      return {
        ...state,
        cells: action.payload.next_generation,
        is_generating:true,
        generation: state.generation + 1,
        population: action.payload.population_count,
      };
    case CREATE_NEXT_GENERATION_END:
      return {
        ...state, 
        is_generating:false
      }
    case SAVE:
      window.localStorage.setItem("cell_matrix", JSON.stringify(state.cells));
      return state;
    default:
      return state;
  }
}
