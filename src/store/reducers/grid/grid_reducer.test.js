import { gridReducer } from "./";
import * as types from "../../actions/grid/types";
import { handleLife as mockLife } from "../../actions/grid";
const mock_init_state = {
  cells: [],
  dimensions: {
    width: 1200,
    height: 768,
    cols: 4,
    rows: 4,
    grid_size: 32,
  },
  simulation_speed: 0.1,
  generation: 0,
  population: 0,
  is_simulating: false,
  is_toggling: false,
  is_generating: false,
};

describe("grid reducer", () => {
  //INIT ----

  it("returns inital state", () => {
    expect(gridReducer(mock_init_state, {})).toEqual(mock_init_state);
  });

  // CREATE ----
  it("can handle CREATE_CELLS", () => {
    expect(
      gridReducer(mock_init_state, {
        type: types.CREATE_CELLS_START,
      }).cells
    ).toEqual([
      [
        {
          id: "0-0",
          isAlive: false,
          x: 0,
          y: 0,
        },
        {
          id: "0-1",
          isAlive: false,
          x: 0,
          y: 1,
        },
        {
          id: "0-2",
          isAlive: false,
          x: 0,
          y: 2,
        },
        {
          id: "0-3",
          isAlive: false,
          x: 0,
          y: 3,
        },
      ],
      [
        {
          id: "1-0",
          isAlive: false,
          x: 1,
          y: 0,
        },
        {
          id: "1-1",
          isAlive: false,
          x: 1,
          y: 1,
        },
        {
          id: "1-2",
          isAlive: false,
          x: 1,
          y: 2,
        },
        {
          id: "1-3",
          isAlive: false,
          x: 1,
          y: 3,
        },
      ],
      [
        {
          id: "2-0",
          isAlive: false,
          x: 2,
          y: 0,
        },
        {
          id: "2-1",
          isAlive: false,
          x: 2,
          y: 1,
        },
        {
          id: "2-2",
          isAlive: false,
          x: 2,
          y: 2,
        },
        {
          id: "2-3",
          isAlive: false,
          x: 2,
          y: 3,
        },
      ],
      [
        {
          id: "3-0",
          isAlive: false,
          x: 3,
          y: 0,
        },
        {
          id: "3-1",
          isAlive: false,
          x: 3,
          y: 1,
        },
        {
          id: "3-2",
          isAlive: false,
          x: 3,
          y: 2,
        },
        {
          id: "3-3",
          isAlive: false,
          x: 3,
          y: 3,
        },
      ],
    ]);
  });

  // TOGGLE ----
  it("can handle TOGGLE_CELL", () => {
    const state_with_cells = {
      cells: [
        [
          {
            id: "0-0",
            isAlive: false,
            x: 0,
            y: 0,
          },
          {
            id: "0-1",
            isAlive: false,
            x: 0,
            y: 1,
          },
          {
            id: "0-2",
            isAlive: false,
            x: 0,
            y: 2,
          },
          {
            id: "0-3",
            isAlive: false,
            x: 0,
            y: 3,
          },
        ],
        [
          {
            id: "1-0",
            isAlive: false,
            x: 1,
            y: 0,
          },
          {
            id: "1-1",
            isAlive: false,
            x: 1,
            y: 1,
          },
          {
            id: "1-2",
            isAlive: false,
            x: 1,
            y: 2,
          },
          {
            id: "1-3",
            isAlive: false,
            x: 1,
            y: 3,
          },
        ],
        [
          {
            id: "2-0",
            isAlive: false,
            x: 2,
            y: 0,
          },
          {
            id: "2-1",
            isAlive: false,
            x: 2,
            y: 1,
          },
          {
            id: "2-2",
            isAlive: false,
            x: 2,
            y: 2,
          },
          {
            id: "2-3",
            isAlive: false,
            x: 2,
            y: 3,
          },
        ],
        [
          {
            id: "3-0",
            isAlive: false,
            x: 3,
            y: 0,
          },
          {
            id: "3-1",
            isAlive: false,
            x: 3,
            y: 1,
          },
          {
            id: "3-2",
            isAlive: false,
            x: 3,
            y: 2,
          },
          {
            id: "3-3",
            isAlive: false,
            x: 3,
            y: 3,
          },
        ],
      ],
      dimensions: {
        width: 1200,
        height: 768,
        cols: 4,
        rows: 4,
        grid_size: 32,
      },
      simulation_speed: 0.1,
      generation: 0,
      population: 0,
      is_simulating: false,
      is_toggling: false,
      is_generating: false,
    };
    // using a reducer with some cells
    // toggle the cell with id "0,0"
    expect(
      gridReducer(state_with_cells, {
        type: types.TOGGLE_CELL,
        payload: "0-0",
      }).cells
      // expect the cells to equal this
    ).toEqual([
      [
        {
          id: "0-0",
          isAlive: true,
          x: 0,
          y: 0,
        },
        {
          id: "0-1",
          isAlive: false,
          x: 0,
          y: 1,
        },
        {
          id: "0-2",
          isAlive: false,
          x: 0,
          y: 2,
        },
        {
          id: "0-3",
          isAlive: false,
          x: 0,
          y: 3,
        },
      ],
      [
        {
          id: "1-0",
          isAlive: false,
          x: 1,
          y: 0,
        },
        {
          id: "1-1",
          isAlive: false,
          x: 1,
          y: 1,
        },
        {
          id: "1-2",
          isAlive: false,
          x: 1,
          y: 2,
        },
        {
          id: "1-3",
          isAlive: false,
          x: 1,
          y: 3,
        },
      ],
      [
        {
          id: "2-0",
          isAlive: false,
          x: 2,
          y: 0,
        },
        {
          id: "2-1",
          isAlive: false,
          x: 2,
          y: 1,
        },
        {
          id: "2-2",
          isAlive: false,
          x: 2,
          y: 2,
        },
        {
          id: "2-3",
          isAlive: false,
          x: 2,
          y: 3,
        },
      ],
      [
        {
          id: "3-0",
          isAlive: false,
          x: 3,
          y: 0,
        },
        {
          id: "3-1",
          isAlive: false,
          x: 3,
          y: 1,
        },
        {
          id: "3-2",
          isAlive: false,
          x: 3,
          y: 2,
        },
        {
          id: "3-3",
          isAlive: false,
          x: 3,
          y: 3,
        },
      ],
    ]);
    // toggle the cell with id "2,1"
    expect(
      gridReducer(state_with_cells, {
        type: types.TOGGLE_CELL,
        payload: "2-1",
      }).cells
      // expect the cells to equal this  2-1 and 0-0 should be true
    ).toEqual([
      [
        {
          id: "0-0",
          isAlive: true,
          x: 0,
          y: 0,
        },
        {
          id: "0-1",
          isAlive: false,
          x: 0,
          y: 1,
        },
        {
          id: "0-2",
          isAlive: false,
          x: 0,
          y: 2,
        },
        {
          id: "0-3",
          isAlive: false,
          x: 0,
          y: 3,
        },
      ],
      [
        {
          id: "1-0",
          isAlive: false,
          x: 1,
          y: 0,
        },
        {
          id: "1-1",
          isAlive: false,
          x: 1,
          y: 1,
        },
        {
          id: "1-2",
          isAlive: false,
          x: 1,
          y: 2,
        },
        {
          id: "1-3",
          isAlive: false,
          x: 1,
          y: 3,
        },
      ],
      [
        {
          id: "2-0",
          isAlive: false,
          x: 2,
          y: 0,
        },
        {
          id: "2-1",
          isAlive: true,
          x: 2,
          y: 1,
        },
        {
          id: "2-2",
          isAlive: false,
          x: 2,
          y: 2,
        },
        {
          id: "2-3",
          isAlive: false,
          x: 2,
          y: 3,
        },
      ],
      [
        {
          id: "3-0",
          isAlive: false,
          x: 3,
          y: 0,
        },
        {
          id: "3-1",
          isAlive: false,
          x: 3,
          y: 1,
        },
        {
          id: "3-2",
          isAlive: false,
          x: 3,
          y: 2,
        },
        {
          id: "3-3",
          isAlive: false,
          x: 3,
          y: 3,
        },
      ],
    ]);
    // toggle the cell with id "2,1"
    expect(
      gridReducer(state_with_cells, {
        type: types.TOGGLE_CELL,
        payload: "2-1",
      }).cells
      // expect the cells to equal this  2-1 should be false and 0-0 should be true
    ).toEqual([
      [
        {
          id: "0-0",
          isAlive: true,
          x: 0,
          y: 0,
        },
        {
          id: "0-1",
          isAlive: false,
          x: 0,
          y: 1,
        },
        {
          id: "0-2",
          isAlive: false,
          x: 0,
          y: 2,
        },
        {
          id: "0-3",
          isAlive: false,
          x: 0,
          y: 3,
        },
      ],
      [
        {
          id: "1-0",
          isAlive: false,
          x: 1,
          y: 0,
        },
        {
          id: "1-1",
          isAlive: false,
          x: 1,
          y: 1,
        },
        {
          id: "1-2",
          isAlive: false,
          x: 1,
          y: 2,
        },
        {
          id: "1-3",
          isAlive: false,
          x: 1,
          y: 3,
        },
      ],
      [
        {
          id: "2-0",
          isAlive: false,
          x: 2,
          y: 0,
        },
        {
          id: "2-1",
          isAlive: false,
          x: 2,
          y: 1,
        },
        {
          id: "2-2",
          isAlive: false,
          x: 2,
          y: 2,
        },
        {
          id: "2-3",
          isAlive: false,
          x: 2,
          y: 3,
        },
      ],
      [
        {
          id: "3-0",
          isAlive: false,
          x: 3,
          y: 0,
        },
        {
          id: "3-1",
          isAlive: false,
          x: 3,
          y: 1,
        },
        {
          id: "3-2",
          isAlive: false,
          x: 3,
          y: 2,
        },
        {
          id: "3-3",
          isAlive: false,
          x: 3,
          y: 3,
        },
      ],
    ]);
  });
  // can Run Game of Life Algoritm..
  it("can handle HANDLE_LIFE -- Zero Cells", () => {
    // TRY WITH ZERO CELLS ALIVE
    const state_with_cells = {
      cells: [
        [
          {
            id: "0-0",
            isAlive: false,
            x: 0,
            y: 0,
          },
          {
            id: "0-1",
            isAlive: false,
            x: 0,
            y: 1,
          },
          {
            id: "0-2",
            isAlive: false,
            x: 0,
            y: 2,
          },
          {
            id: "0-3",
            isAlive: false,
            x: 0,
            y: 3,
          },
        ],
        [
          {
            id: "1-0",
            isAlive: false,
            x: 1,
            y: 0,
          },
          {
            id: "1-1",
            isAlive: false,
            x: 1,
            y: 1,
          },
          {
            id: "1-2",
            isAlive: false,
            x: 1,
            y: 2,
          },
          {
            id: "1-3",
            isAlive: false,
            x: 1,
            y: 3,
          },
        ],
        [
          {
            id: "2-0",
            isAlive: false,
            x: 2,
            y: 0,
          },
          {
            id: "2-1",
            isAlive: false,
            x: 2,
            y: 1,
          },
          {
            id: "2-2",
            isAlive: false,
            x: 2,
            y: 2,
          },
          {
            id: "2-3",
            isAlive: false,
            x: 2,
            y: 3,
          },
        ],
        [
          {
            id: "3-0",
            isAlive: false,
            x: 3,
            y: 0,
          },
          {
            id: "3-1",
            isAlive: false,
            x: 3,
            y: 1,
          },
          {
            id: "3-2",
            isAlive: false,
            x: 3,
            y: 2,
          },
          {
            id: "3-3",
            isAlive: false,
            x: 3,
            y: 3,
          },
        ],
      ],
      dimensions: {
        width: 1200,
        height: 768,
        cols: 4,
        rows: 4,
        grid_size: 32,
      },
      simulation_speed: 0.1,
      generation: 0,
      population: 0,
      is_simulating: false,
      is_toggling: false,
      is_generating: false,
    };
    const next_gen = mockLife(
      state_with_cells.cells,
      state_with_cells.dimensions.cols,
      state_with_cells.dimensions.rows
    ).payload.next_generation;
    // SHOULD RESULT IN ALL CELLS DEAD...
    expect(
      gridReducer(state_with_cells, {
        type: types.CREATE_NEXT_GENERATION_START,
        payload: { population: 0, next_generation: next_gen },
      }).cells
    ).toEqual([
      [
        { id: "0-0", isAlive: false, x: 0, y: 0 },
        { id: "0-1", isAlive: false, x: 0, y: 1 },
        { id: "0-2", isAlive: false, x: 0, y: 2 },
        { id: "0-3", isAlive: false, x: 0, y: 3 },
      ],
      [
        { id: "1-0", isAlive: false, x: 1, y: 0 },
        { id: "1-1", isAlive: false, x: 1, y: 1 },
        { id: "1-2", isAlive: false, x: 1, y: 2 },
        { id: "1-3", isAlive: false, x: 1, y: 3 },
      ],
      [
        { id: "2-0", isAlive: false, x: 2, y: 0 },
        { id: "2-1", isAlive: false, x: 2, y: 1 },
        { id: "2-2", isAlive: false, x: 2, y: 2 },
        { id: "2-3", isAlive: false, x: 2, y: 3 },
      ],
      [
        { id: "3-0", isAlive: false, x: 3, y: 0 },
        { id: "3-1", isAlive: false, x: 3, y: 1 },
        { id: "3-2", isAlive: false, x: 3, y: 2 },
        { id: "3-3", isAlive: false, x: 3, y: 3 },
      ],
    ]);
  });
  
  it("can handle HANDLE_LIFE --  Cells SMALL SQUARE", () => {
    // TRY WITH ZERO CELLS ALIVE
    const state_with_cells = {
      cells: [
        [
          {
            id: "0-0",
            isAlive: false,
            x: 0,
            y: 0,
          },
          {
            id: "0-1",
            isAlive: false,
            x: 0,
            y: 1,
          },
          {
            id: "0-2",
            isAlive: false,
            x: 0,
            y: 2,
          },
          {
            id: "0-3",
            isAlive: false,
            x: 0,
            y: 3,
          },
        ],
        [
          {
            id: "1-0",
            isAlive: false,
            x: 1,
            y: 0,
          },
          {
            id: "1-1",
            isAlive: true,
            x: 1,
            y: 1,
          },
          {
            id: "1-2",
            isAlive: true,
            x: 1,
            y: 2,
          },
          {
            id: "1-3",
            isAlive: false,
            x: 1,
            y: 3,
          },
        ],
        [
          {
            id: "2-0",
            isAlive: false,
            x: 2,
            y: 0,
          },
          {
            id: "2-1",
            isAlive: true,
            x: 2,
            y: 1,
          },
          {
            id: "2-2",
            isAlive: true,
            x: 2,
            y: 2,
          },
          {
            id: "2-3",
            isAlive: false,
            x: 2,
            y: 3,
          },
        ],
        [
          {
            id: "3-0",
            isAlive: false,
            x: 3,
            y: 0,
          },
          {
            id: "3-1",
            isAlive: false,
            x: 3,
            y: 1,
          },
          {
            id: "3-2",
            isAlive: false,
            x: 3,
            y: 2,
          },
          {
            id: "3-3",
            isAlive: false,
            x: 3,
            y: 3,
          },
        ],
      ],
      dimensions: {
        width: 1200,
        height: 768,
        cols: 4,
        rows: 4,
        grid_size: 32,
      },
      simulation_speed: 0.1,
      generation: 0,
      population: 0,
      is_simulating: false,
      is_toggling: false,
      is_generating: false,
    };
    // Since the Square is stable it shouldn't change
    const next_gen = mockLife(
        state_with_cells.cells,
        state_with_cells.dimensions.cols,
        state_with_cells.dimensions.rows
      ).payload.next_generation;
    expect(
      gridReducer(state_with_cells, {
        type: types.CREATE_NEXT_GENERATION_START,
        payload: { population: 0, next_generation: next_gen },
      }).cells
    ).toEqual([
      [
        { id: "0-0", isAlive: false, x: 0, y: 0 },
        { id: "0-1", isAlive: false, x: 0, y: 1 },
        { id: "0-2", isAlive: false, x: 0, y: 2 },
        { id: "0-3", isAlive: false, x: 0, y: 3 },
      ],
      [
        { id: "1-0", isAlive: false, x: 1, y: 0 },
        { id: "1-1", isAlive: true, x: 1, y: 1 },
        { id: "1-2", isAlive: true, x: 1, y: 2 },
        { id: "1-3", isAlive: false, x: 1, y: 3 },
      ],
      [
        { id: "2-0", isAlive: false, x: 2, y: 0 },
        { id: "2-1", isAlive: true, x: 2, y: 1 },
        { id: "2-2", isAlive: true, x: 2, y: 2 },
        { id: "2-3", isAlive: false, x: 2, y: 3 },
      ],
      [
        { id: "3-0", isAlive: false, x: 3, y: 0 },
        { id: "3-1", isAlive: false, x: 3, y: 1 },
        { id: "3-2", isAlive: false, x: 3, y: 2 },
        { id: "3-3", isAlive: false, x: 3, y: 3 },
      ],
    ]);
    // asert that this is true by trying again..
    const next_gen_2 =  mockLife(
        state_with_cells.cells,
        state_with_cells.dimensions.cols,
        state_with_cells.dimensions.rows
      ).payload.next_generation;
    expect(
      gridReducer(state_with_cells, {
        type: types.CREATE_NEXT_GENERATION_START,
        payload: { population: 0, next_generation: next_gen_2 },
      }).cells
    ).toEqual([
      [
        { id: "0-0", isAlive: false, x: 0, y: 0 },
        { id: "0-1", isAlive: false, x: 0, y: 1 },
        { id: "0-2", isAlive: false, x: 0, y: 2 },
        { id: "0-3", isAlive: false, x: 0, y: 3 },
      ],
      [
        { id: "1-0", isAlive: false, x: 1, y: 0 },
        { id: "1-1", isAlive: true, x: 1, y: 1 },
        { id: "1-2", isAlive: true, x: 1, y: 2 },
        { id: "1-3", isAlive: false, x: 1, y: 3 },
      ],
      [
        { id: "2-0", isAlive: false, x: 2, y: 0 },
        { id: "2-1", isAlive: true, x: 2, y: 1 },
        { id: "2-2", isAlive: true, x: 2, y: 2 },
        { id: "2-3", isAlive: false, x: 2, y: 3 },
      ],
      [
        { id: "3-0", isAlive: false, x: 3, y: 0 },
        { id: "3-1", isAlive: false, x: 3, y: 1 },
        { id: "3-2", isAlive: false, x: 3, y: 2 },
        { id: "3-3", isAlive: false, x: 3, y: 3 },
      ],
    ]);
  });

  it("can handle HANDLE_LIFE --  Cells A LONELY CELL SHOULD DIE", () => {
    // TRY WITH ZERO CELLS ALIVE
    const state_with_cells = {
      cells: [
        [
          {
            id: "0-0",
            isAlive: false,
            x: 0,
            y: 0,
          },
          {
            id: "0-1",
            isAlive: false,
            x: 0,
            y: 1,
          },
          {
            id: "0-2",
            isAlive: false,
            x: 0,
            y: 2,
          },
          {
            id: "0-3",
            isAlive: false,
            x: 0,
            y: 3,
          },
        ],
        [
          {
            id: "1-0",
            isAlive: false,
            x: 1,
            y: 0,
          },
          {
            id: "1-1",
            isAlive: true,
            x: 1,
            y: 1,
          },
          {
            id: "1-2",
            isAlive: false,
            x: 1,
            y: 2,
          },
          {
            id: "1-3",
            isAlive: false,
            x: 1,
            y: 3,
          },
        ],
        [
          {
            id: "2-0",
            isAlive: false,
            x: 2,
            y: 0,
          },
          {
            id: "2-1",
            isAlive: false,
            x: 2,
            y: 1,
          },
          {
            id: "2-2",
            isAlive: false,
            x: 2,
            y: 2,
          },
          {
            id: "2-3",
            isAlive: false,
            x: 2,
            y: 3,
          },
        ],
        [
          {
            id: "3-0",
            isAlive: false,
            x: 3,
            y: 0,
          },
          {
            id: "3-1",
            isAlive: false,
            x: 3,
            y: 1,
          },
          {
            id: "3-2",
            isAlive: false,
            x: 3,
            y: 2,
          },
          {
            id: "3-3",
            isAlive: false,
            x: 3,
            y: 3,
          },
        ],
      ],
      dimensions: {
        width: 1200,
        height: 768,
        cols: 4,
        rows: 4,
        grid_size: 32,
      },
      simulation_speed: 0.1,
      generation: 0,
      population: 0,
      is_simulating: false,
      is_toggling: false,
      is_generating: false,
    };
    // Since the Cell is surrounded by 0 CELLS it should DIE
    const next_gen = mockLife(
        state_with_cells.cells,
        state_with_cells.dimensions.cols,
        state_with_cells.dimensions.rows
      ).payload.next_generation;

    expect(
      gridReducer(state_with_cells, {
        type: types.CREATE_NEXT_GENERATION_START,
        payload: { population: 0, next_generation: next_gen },
      }).cells
    ).toEqual([
      [
        { id: "0-0", isAlive: false, x: 0, y: 0 },
        { id: "0-1", isAlive: false, x: 0, y: 1 },
        { id: "0-2", isAlive: false, x: 0, y: 2 },
        { id: "0-3", isAlive: false, x: 0, y: 3 },
      ],
      [
        { id: "1-0", isAlive: false, x: 1, y: 0 },
        { id: "1-1", isAlive: false, x: 1, y: 1 },
        { id: "1-2", isAlive: false, x: 1, y: 2 },
        { id: "1-3", isAlive: false, x: 1, y: 3 },
      ],
      [
        { id: "2-0", isAlive: false, x: 2, y: 0 },
        { id: "2-1", isAlive: false, x: 2, y: 1 },
        { id: "2-2", isAlive: false, x: 2, y: 2 },
        { id: "2-3", isAlive: false, x: 2, y: 3 },
      ],
      [
        { id: "3-0", isAlive: false, x: 3, y: 0 },
        { id: "3-1", isAlive: false, x: 3, y: 1 },
        { id: "3-2", isAlive: false, x: 3, y: 2 },
        { id: "3-3", isAlive: false, x: 3, y: 3 },
      ],
    ]);
   
  });
});
