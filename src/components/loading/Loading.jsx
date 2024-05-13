import React from "react";
import "./Loading.css";
export const Loading = ({ width, height }) => {
  return (
    <div className="sk-folding-cube" style={{ width: width, height: height }}>
      <div className="sk-cube1 sk-cube"></div>
      <div className="sk-cube2 sk-cube"></div>
      <div className="sk-cube4 sk-cube"></div>
      <div className="sk-cube3 sk-cube"></div>
    </div>
  );
};
