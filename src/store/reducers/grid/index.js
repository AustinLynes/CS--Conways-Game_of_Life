import {
  CREATE_CELLS_START,
  TOGGLE_CELL,
  TOGGLE_CELL_END,
  CREATE_NEXT_GENERATION_START,
  CREATE_NEXT_GENERATION_END,
  STOP_SIMULATION,
  START_SIMULATION,
  UPDATE_SIMULATION_SPEED,
  CREATE_RANDOM_GENERATION_END,
  UPDATE_GRID_SIZE,
  CREATE_RANDOM_GENERATION,
} from "../../actions/grid";

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
  simulation_speed: .1,
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
    case UPDATE_SIMULATION_SPEED:
      return {
        ...state,
        simulation_speed: action.payload,
      };
    case UPDATE_GRID_SIZE:
      return {
        ...state,
        dimensions: {
          ...state.dimensions,
          grid_size: action.payload,
          cols: Math.floor(state.dimensions.width / action.payload),
          rows: Math.floor(state.dimensions.height / action.payload),
        },
      };
    case CREATE_RANDOM_GENERATION:
      return {
        ...state,
        // cells: action.payload,
        is_generating:true
      };
      case CREATE_RANDOM_GENERATION_END:
        return {
          ...state,
          cells: action.payload.cells,
          population: action.payload.population,
          is_generating:false
        };
    case CREATE_NEXT_GENERATION_START:
      return {
        ...state,
        cells: action.payload.next_generation,
        is_generating: true,
        generation: state.generation + 1,
        population: action.payload.population_count,
      };
    case CREATE_NEXT_GENERATION_END:
      return {
        ...state,
        is_generating: false,
      };
    default:
      return state;
  }
}
