import React, { useState } from "react";

const GenratedForm = ({
  setFormJson,
  formJson,
  setFormData,
  formData,
  errors,
  setErrors,
}) => {
  const handleInputChange = (label, value) => {
    setFormData({
      ...formData,
      [label]: value,
    });

    if (errors[label]) {
      setErrors({
        ...errors,
        [label]: "",
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    formJson.forEach((item) => {
      if (item.required && !formData[item.label]) {
        isValid = false;
        newErrors[item.label] = `${item.label} is required`;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const exportFormConfig = (json) => {
    const dataStr = JSON.stringify(json, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "form-config.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const submitForm = () => {
    if (!validateForm()) {
      return;
    }

    exportFormConfig(formData);
  };

  const handleRemoveField = (id, label) => {
    setFormJson((prev) => prev.filter((item) => item.id !== id));

    setFormData((prev) => {
      const updatedFormData = { ...prev };
      delete updatedFormData[label];
      return updatedFormData;
    });

    setErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors[label];
      return updatedErrors;
    });
  };

  return (
    <div className="form-section">
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {formJson.map((item) => (
          <div
            key={item.id}
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="req-label">{item?.label}</span>
              <div
                className="cross"
                onClick={() => handleRemoveField(item?.id, item?.label)}
              >
                &times;
              </div>
            </div>

            {item?.type === "text" && (
              <div>
                <input
                  style={{
                    padding: "12px 8px",
                    outline: "none",
                    width: "100%",
                  }}
                  type="text"
                  placeholder={`Enter ${item.label}`}
                  value={formData[item.label] || ""}
                  onChange={(e) =>
                    handleInputChange(item.label, e.target.value)
                  }
                  required={item.required}
                />
                {errors[item.label] && (
                  <p style={{ color: "red" }}>{errors[item.label]}</p>
                )}
              </div>
            )}

            {item?.type === "dropdown" && (
              <div>
                <select
                  style={{
                    padding: "12px 8px",
                    outline: "none",
                    width: "100%",
                  }}
                  value={formData[item.label] || ""}
                  onChange={(e) =>
                    handleInputChange(item.label, e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {item?.options?.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors[item.label] && (
                  <p style={{ color: "red" }}>{errors[item.label]}</p>
                )}
              </div>
            )}

            {item?.type === "checkbox" && (
              <div>
                {item?.options?.map((option, i) => (
                  <div className="checkbox-box">
                    <input
                      type="checkbox"
                      checked={formData[item?.label]?.includes(option) || false}
                      onChange={(e) => {
                        const newValue = formData[item.label] || [];
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            [item?.label]: [...newValue, option],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            [item.label]: newValue.filter(
                              (val) => val !== option
                            ),
                          });
                        }
                      }}
                    />
                    <label
                      className="checkbox-opt"
                      key={i}
                      style={{ display: "block" }}
                    >
                      {option}
                    </label>
                  </div>
                ))}
                {errors[item.label] && (
                  <p style={{ color: "red" }}>{errors[item.label]}</p>
                )}
              </div>
            )}

            {item?.type === "radio" && (
              <div style={{ display: "flex", gap: "16px" }}>
                {item?.options?.map((option, i) => (
                  <div style={{ display: "flex" }}>
                    <label key={i} className="label">
                      <input
                        style={{ marginRight: "8px", accentColor: "black" }}
                        type="radio"
                        name={item?.label}
                        value={option}
                        checked={formData[item.label] === option}
                        onChange={() => handleInputChange(item.label, option)}
                      />
                      {option}
                    </label>
                  </div>
                ))}
                {errors[item.label] && (
                  <p style={{ color: "red" }}>{errors[item.label]}</p>
                )}
              </div>
            )}

            {item?.type === "textarea" && (
              <div>
                <textarea
                  style={{
                    padding: "12px 8px",
                    outline: "none",
                    width: "100%",
                  }}
                  type="text"
                  rows={10}
                  placeholder={`Enter ${item.label}`}
                  value={formData[item.label] || ""}
                  onChange={(e) =>
                    handleInputChange(item.label, e.target.value)
                  }
                />
                {errors[item.label] && (
                  <p style={{ color: "red" }}>{errors[item.label]}</p>
                )}
              </div>
            )}
          </div>
        ))}
        {formJson.length > 0 && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className="export-btn"
              onClick={() => {
                exportFormConfig(formJson);
              }}
            >
              Export Form Config
            </button>
            <button className="create-btn" onClick={submitForm}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenratedForm;
