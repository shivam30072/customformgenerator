import React from "react";

const RequiredInput = ({ isRequired, setIsRequired }) => {
  return (
    <div className="required">
      <input
        type="checkbox"
        checked={isRequired}
        onChange={(e) => setIsRequired(e.target.checked)}
      />
      <label className="req-label">Required</label>
    </div>
  );
};

export default RequiredInput;
