import * as types from "../../actions/grid/types";

// GLOBALS
const __GRID_WIDTH__ = 1200;
const __GRID_HEIGHT__ = 768;
const ___CELL_SIZE__ = 24;
const __GRID_ROWS__ = Math.floor(__GRID_HEIGHT__ / ___CELL_SIZE__);
const __GRID_COLS__ = Math.floor(__GRID_WIDTH__ / ___CELL_SIZE__);

const init = {
  cells: [],
  is_generating: false,
  is_toggling: false,
  is_simulating: false,
  generation: 0,
  population: 0,
  simulation_speed: 0.1,
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
    case types.CREATE_CELLS_START:
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

    case types.TOGGLE_CELL:
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
      return {
        ...state,
        cells: updateCells(),
        is_toggling: true,
        population: (state.population += count),
      };
    case types.TOGGLE_CELL_END:
      return {
        ...state,
        is_toggling: false,
      };
    case types.START_SIMULATION:
      return {
        ...state,
        is_simulating: true,
      };
    case types.STOP_SIMULATION:
      return {
        ...state,
        is_simulating: false,
        is_generating: false,
        population: 0,
        generation: 0,
      };
    case types.UPDATE_SIMULATION_SPEED:
      return {
        ...state,
        simulation_speed: action.payload,
      };
    case types.UPDATE_GRID_SIZE:
      return {
        ...state,
        dimensions: {
          ...state.dimensions,
          grid_size: action.payload,
          cols: Math.floor(state.dimensions.width / action.payload),
          rows: Math.floor(state.dimensions.height / action.payload),
        },
      };
    case types.CREATE_RANDOM_GENERATION:
      return {
        ...state,
        // cells: action.payload,
        is_generating: true,
      };
    case types.CREATE_RANDOM_GENERATION_END:
      return {
        ...state,
        cells: action.payload.cells,
        population: action.payload.population,
        is_generating: false,
      };
    case types.CREATE_NEXT_GENERATION_START:
      return {
        ...state,
        cells: action.payload.next_generation,
        is_generating: true,
        generation: state.generation + 1,
        population: action.payload.population_count,
      };
    case types.CREATE_NEXT_GENERATION_END:
      return {
        ...state,
        is_generating: false,
      };
    default:
      return state;
  }
}
