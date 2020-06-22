import React, { useState } from "react";

import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faTimes } from "@fortawesome/free-solid-svg-icons";
const InformationPanel = (props) => {
  const { cols, rows, population, generation } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`info-panel  ${!isOpen ? "closed" : " "}`}>
      <div className={`info ${!isOpen ? "closed" : " "}`}>
        <span className="label">Grid:</span>
        <span className="number">
          ({cols}, {rows})
        </span>

        <span className="label">Generation:</span>
        <span className="number">{generation}</span>
        <span className="label">Population: </span>
        <span className="number">{population}</span>
      </div>
      <button
        className="info-btn"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <FontAwesomeIcon icon={faTimes}/> : <>Status</>}
      </button>
    </div>
  );
};

//REDUX  ------------------------
const __props = (store) => {
  return {
    population: store.grid.population,
    generation: store.grid.generation,
    cols: store.grid.dimensions.cols,
    rows: store.grid.dimensions.rows,
  };
};
const __actions_list = {};

export default connect(__props, __actions_list)(InformationPanel);
