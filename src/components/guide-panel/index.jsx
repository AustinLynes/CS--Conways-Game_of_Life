import React from "react";

const GuidePanel = (props) => {
  const { guide_open } = props;

  return (
    <div className={`guide ${guide_open ? "" : "close"}`}>
      <div className="rules">
        <h3>Rules</h3>
        <span className="highlight minus">Death</span>
        <p>
          A Cell Who is Alive, and has 1 or less neighboring cells who are
          alive. dies. as if from lonleiness
        </p>
        <p>
          A Cell Who is Alive, and has more than 3 neighboring cells who are
          alive. dies. as if from
        </p>
        <span className="highlight plus">Birth</span>
        <p>
          A Cell Who is Dead, and has exactly 3 neighboring cells who are alive.
          becomes alive. as if from reproduction
        </p>
        <span className="highlight neutral">Stasis </span>
        <p>
          A Cell Who is Alive, and has 2 or 3 neighboring cells who are alive.
          lives on to the next generation
        </p>
      </div>
      <div className="blur"></div>
    </div>
  );
};
export default GuidePanel;
