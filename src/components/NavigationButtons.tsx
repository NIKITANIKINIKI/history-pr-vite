import React from "react";


export const NavigationButtons: React.FC<{
  onPrev: () => void;
  onNext: () => void;
  isBeginning: boolean;
  isEnd: boolean;
}> = ({ onPrev, onNext, isBeginning, isEnd }) => (
  <div className="botton-buttons">
    <button
      className="left-button-swipper"
      onClick={onPrev}
      disabled={isBeginning}
      style={{ visibility: isBeginning ? "hidden" : "visible" }}
    >
      <svg
        className="left-button"
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
      </svg>
    </button>
    <button
      className="right-button-swipper"
      onClick={onNext}
      disabled={isEnd}
      style={{ visibility: isEnd ? "hidden" : "visible" }}
    >
      <svg
        className="right-button"
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
      </svg>
    </button>
  </div>
);
