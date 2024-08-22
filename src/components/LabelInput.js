import React from "react";

function LabelInput({ label, setLabel }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "12px",
        gap: "8px",
        marginLeft: "8px",
      }}
    >
      <label
        style={{
          background: "#e1f3f7",
          width: "fit-content",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        Add Label
      </label>
      <input
        style={{ padding: "12px 8px", outline: "none" }}
        type="text"
        placeholder="Enter label"
        value={label}
        onChange={(e) => {
          setLabel(e.target.value);
        }}
      />
    </div>
  );
}

export default LabelInput;
