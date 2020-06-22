export const CREATE_CELLS_START = "CREATE_CELLS_START";
export const CREATE_CELLS_FINISHED = "CREATE_CELLS_FINISHED";

export const CREATE_RANDOM_GENERATION = "CREATE_RANDOM_GENERATION";
export const CREATE_RANDOM_GENERATION_END = "CREATE_RANDOM_GENERATION_END";

export const TOGGLE_CELL = "TOGGLE_CELL";
export const TOGGLE_CELL_END = "TOGGLE_CELL_END";

export const CREATE_NEXT_GENERATION_START = "CREATE_NEXT_GENERATION_START";
export const CREATE_NEXT_GENERATION_END = "CREATE_NEXT_GENERATION_END";

export const STOP_SIMULATION = "STOP_SIMULATION";
export const START_SIMULATION = "START_SIMULATION";
export const PAUSE_SIMULATION = "PAUSE_SIMULATION";

export const UPDATE_SIMULATION_SPEED = "UPDATE_SIMULATION_SPEED";
export const UPDATE_GRID_SIZE = "UPDATE_GRID_SIZE";

/**
 * @description
 * creates a 2D Grid of Cells
 * @param {number} cols
 * @param {number} rows
 * @example createCells(3,3) =>
 * [row[col, col, col], row[col, col col], row[col, col, col]]
 */
export const createCells = () => (dispatch) => {
  dispatch({ type: CREATE_CELLS_START });
  return { type: CREATE_CELLS_FINISHED };
};

export const randomGeneration = (cols, rows)  => {
  var _cells = [];
  for (let x = 0; x < cols; x++) {
    _cells.push([]);
    for (let y = 0; y < rows; y++)
      _cells[x].push({
        id: `${x}-${y}`,
        x: x,
        y: y,
        isAlive: Math.floor(Math.random() * 10) < 7 ? false : true, // flip a coin. 0 dead, 1 alive
      });
  }

  var count = 0;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (_cells[x][y].isAlive) {
        count += 1;
      }
    }
  }

  console.log(_cells);

  return { type: CREATE_RANDOM_GENERATION_END, payload: {cells: _cells, population: count} };
};

export const toggleCell = (id) => {
  return { type: TOGGLE_CELL, payload: id };
};

export const startSimulation = () => {
  return { type: START_SIMULATION };
};

export const pauseSimulation = () => {
  return { type: PAUSE_SIMULATION };
};

export const stopSimulation = () => {
  return { type: STOP_SIMULATION };
};

const createNextGeneration = (cols, rows) => {
  var _cells = [];
  for (let x = 0; x < cols; x++) {
    _cells.push([]);
    for (let y = 0; y < rows; y++)
      _cells[x].push({ id: `${x}-${y}`, x: x, y: y, isAlive: false });
  }
  return _cells;
};

const countNeighbors = (cur_x, cur_y, prev_generation, cols, rows) => {
  var sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (cur_x + i + cols) % cols;
      let row = (cur_y + j + rows) % rows;
      sum += prev_generation[col][row].isAlive === true ? 1 : 0;
    }
  }

  sum -= prev_generation[cur_x][cur_y].isAlive === true ? 1 : 0;
  return sum;
};
/**
 * @title The Game of Life algorithm
 * @description 
 *  will create a seccond buffer, and apply the rules of life to it before
 *  setting the original state to the next state 
 *  will also count all that are alive in the new array
 * 
 *   payload { next_generation , population }
 * */

export const handleLife = (prev_generation, cols, rows) => {
  var next_generation = createNextGeneration(cols, rows);

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const neighbors = countNeighbors(x, y, prev_generation, cols, rows);
      const prev_state = prev_generation[x][y].isAlive;
      // RULE 1
      if (prev_state === false && neighbors === 3) {
        next_generation[x][y].isAlive = true;
      }
      // RULE 2
      else if (prev_state === true && (neighbors < 2 || neighbors > 3)) {
        next_generation[x][y].isAlive = false;
      }
      // RULE 3
      else {
        next_generation[x][y].isAlive = prev_state;
      }
    }
  }
  var count = 0;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (next_generation[x][y].isAlive) {
        count += 1;
      }
    }
  }
  return {
    type: CREATE_NEXT_GENERATION_START,
    payload: { next_generation, population_count: count },
  };
};
export const finish_life = () => {
  return { type: CREATE_NEXT_GENERATION_END };
};
export const updateGridSize = (val) => {
  return { type: UPDATE_GRID_SIZE, payload: val };
};
export const updateSimSpeed = (val) => {
  return { type: UPDATE_SIMULATION_SPEED, payload: val };
};
