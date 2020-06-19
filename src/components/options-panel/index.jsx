import React from "react";

import { connect } from "react-redux";

const OptionsPanel = (props) => {
  const {population, generation} = props;
  return (
    <div className="options">
      <p>current generation: {generation}</p>
      <p>current population: <span className={`${population > 100?"status-30":population > 100? "status-100" :" "}`}>{population}</span></p>
    </div>
  );
};

//REDUX  ------------------------
const __props = (store) => {
  return {
    population: store.population,
    generation: store.generation,
  };
};
const __actions_list = {};

export default connect(__props, __actions_list)(OptionsPanel);
