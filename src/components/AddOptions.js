import React from "react";

const AddOptions = ({
  currentOption,
  setCurrentOption,
  handleAddOption,
  options,
}) => {
  return (
    <div className="option-container">
      <label
        style={{
          background: "#e1f3f7",
          width: "fit-content",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        Add Options
      </label>
      <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
        <input
          className="text-input"
          type="text"
          placeholder="Enter option"
          value={currentOption}
          onChange={(e) => setCurrentOption(e.target.value)}
        />
        <button className="option-btn" type="button" onClick={handleAddOption}>
          Add
        </button>
      </div>
      <div className="list-box">
        {options.map((option, index) => (
          <p key={index}>{option}</p>
        ))}
      </div>
    </div>
  );
};

export default AddOptions;
