import * as types from "./types";

/**
 * @description
 * creates a 2D Grid of Cells
 * @param {number} cols
 * @param {number} rows
 * @example createCells(3,3) =>
 * [row[col, col, col], row[col, col col], row[col, col, col]]
 */
export const createCells = () => (dispatch) => {
  
  dispatch({ type: types.CREATE_CELLS });
  return { type: types.CREATE_CELLS_FINISHED };
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

  return { type: types.CREATE_RANDOM_GENERATION_END, payload: {cells: _cells, population: count} };
};

export const toggleCell = (id) => {
  return { type: types.TOGGLE_CELL, payload: id };
};

export const startSimulation = () => {
  return { type: types.START_SIMULATION };
};

export const pauseSimulation = () => {
  return { type: types.PAUSE_SIMULATION };
};

export const stopSimulation = () => {
  return { type: types.STOP_SIMULATION };
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
    type: types.CREATE_NEXT_GENERATION_START,
    payload: { next_generation, population_count: count },
  };
};
export const finish_life = () => {
  return { type: types.CREATE_NEXT_GENERATION_END };
};
export const updateGridSize = (val) => {
  return { type: types.UPDATE_GRID_SIZE, payload: val };
};
export const updateSimSpeed = (val) => {
  return { type: types.UPDATE_SIMULATION_SPEED, payload: val };
};
