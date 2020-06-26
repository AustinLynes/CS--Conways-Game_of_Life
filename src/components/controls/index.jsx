import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faTrash, faStop } from "@fortawesome/free-solid-svg-icons";
import {
  createCells,
  startSimulation,
  stopSimulation,
  pauseSimulation,
} from "../../store/actions/grid";

const Controls = (props) => {

  const {
    dimensions,
    startSimulation,
    is_simulating,
    stopSimulation,
    createCells,
    pauseSimulation
  } = props;

  return (
    <div className="controls">
      <button
        className={`play-btn ${is_simulating ? "active" : " "}`}
        onClick={startSimulation}
      > 
      
        <FontAwesomeIcon data-tip="Start Simulation" icon={faPlay} />
      </button>
      <button className="pause-btn" onClick={stopSimulation}>
        <FontAwesomeIcon icon={faPause} />    
      </button>
      <button className="pause-btn" onClick={pauseSimulation}>
        <FontAwesomeIcon icon={faStop} />
      </button>

      <button
        className="trash-btn"
        onClick={() => {
          stopSimulation();
          createCells(dimensions.cols, dimensions.rows);
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};
const __props = (store) => {
  return {
    dimensions: store.grid.dimensions,
    is_simulating: store.grid.is_simulating,
  };
};
const __actions_list = {
  createCells,
  startSimulation,
  stopSimulation,
  pauseSimulation
};

//REDUX  ------------------------

export default connect(__props, __actions_list)(Controls);
