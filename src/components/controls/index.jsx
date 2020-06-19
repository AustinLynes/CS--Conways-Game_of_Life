import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  createCells,
  startSimulation,
  stopSimulation,
} from "../../store/actions";

const Controls = (props) => {
  const {
    dimensions,
    startSimulation,
    is_simulating,
    stopSimulation,
    createCells,
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
    dimensions: store.dimensions,
    is_simulating: store.is_simulating,
  };
};
const __actions_list = {
  createCells,
  startSimulation,
  stopSimulation,
};

//REDUX  ------------------------

export default connect(__props, __actions_list)(Controls);
