import React from "react";
import { connect } from "react-redux";

import InformationPanel from "./components/info-panel";
import Controls from "./components/controls";
import ReactTooltip from "react-tooltip";
import GuidePanel from "./components/guide-panel";
import { togglePanel } from "./store/actions/application";
import Canvas from "./components/canvas";
import OptionsPanel from "./components/options-panel";

const App = (store) => {
  // EDITOR SETTINGS
  const { guide_open, togglePanel } = store;
  const toggleRules = (e) => {
    e.preventDefault();
    togglePanel();
  };

  return (
    <div className="App">
      <GuidePanel guide_open={guide_open} togglePanel={togglePanel} />
      <OptionsPanel />
      <Controls />

      <button className="rules-btn" onClick={toggleRules}>
        Rules
      </button>
      <Canvas />

      <InformationPanel />

      <ReactTooltip place="bottom" />
    </div>
  );
};

//REDUX  ------------------------

const __props = (store) => {
  return {
    guide_open: store.app.guide_open,
  };
};

const __actions_list = {
  togglePanel,
};

export default connect(__props, __actions_list)(App);
