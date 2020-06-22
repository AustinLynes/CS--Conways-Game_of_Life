import React, { useState } from "react";

import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  updateSimSpeed,
  updateGridSize,
  randomGeneration,
} from "../../store/actions/grid";

const OptionsPanel = (props) => {
  const {
    simulation_speed,
    updateSimSpeed,
    grid_size,
    updateGridSize,
    cols,
    rows,
    randomGeneration
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    randomGeneration(cols, rows);
  };
  return (
    <div className={`options-panel ${!isOpen ? "closed" : " "}`}>
      <div className={`info ${!isOpen ? "closed" : " "}`}>
        <button
          className="options-btn"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {!isOpen ? (
            "Options"
          ) : (
            <>
              <FontAwesomeIcon icon={faTimes} />
            </>
          )}
        </button>
        {isOpen ? (
          <div className="options">
            <h3>Simulation Speed:</h3>
            <input
              value={simulation_speed}
              onChange={(e) => {
                updateSimSpeed(e.target.value);
              }}
            />
            <input
              type="range"
              min={0.1}
              max={3}
              step={0.1}
              value={simulation_speed}
              onChange={(e) => {
                updateSimSpeed(e.target.value);
              }}
            />
            <h3>Cell Size:</h3>
            <input
              type="number"
              value={grid_size}
              step={4}
              onChange={(e) => {
                updateGridSize(e.target.value);
              }}
            />
            <input
              type="range"
              min={16}
              max={128}
              step={4}
              value={grid_size}
              onChange={(e) => {
                updateGridSize(e.target.value);
              }}
            />
            <button onClick={handleClick}>Random Generation</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

//REDUX  ------------------------
const __props = (store) => {
  return {
    simulation_speed: store.grid.simulation_speed,
    grid_size: store.grid.dimensions.grid_size,
    cols: store.grid.dimensions.cols,
    rows: store.grid.dimensions.rows,
  };
};
const __actions_list = {
  updateSimSpeed,
  updateGridSize,
  randomGeneration,
};

export default connect(__props, __actions_list)(OptionsPanel);
