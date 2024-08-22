import React, { useState } from "react";
import LabelInput from "../LabelInput";
import RequiredInput from "../RequiredInput";
import AddOptions from "../AddOptions";

const FormFields = ({ setFormJson, formJson, setFormData, setErrors }) => {
  const [selectedType, setSelectedType] = useState("");
  const [label, setLabel] = useState("");
  const [options, setOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleCreateField = () => {
    const newField = {
      id: Date.now().toString(),
      type: selectedType,
      label: label,
      required: isRequired,
      ...((selectedType === "dropdown" ||
        selectedType === "checkbox" ||
        selectedType === "radio") && {
        options,
      }),
    };

    if (label) {
      if (
        (selectedType === "dropdown" ||
          selectedType === "checkbox" ||
          selectedType === "radio") &&
        options.length === 0
      )
        return;
      setFormJson([...formJson, newField]);
    }

    setLabel("");
    setOptions([]);
    setCurrentOption("");
    setIsRequired(false);
  };

  const handleAddOption = () => {
    if (currentOption.trim() !== "") {
      setOptions([...options, currentOption]);
      setCurrentOption("");
    }
  };

  return (
    <div className="form-fields">
      <h2 style={{ padding: "12px" }}>Create your own custom form</h2>

      {/* Text Input */}
      <div className="input-type">
        <label className="label">
          <input
            type="radio"
            value="text"
            checked={selectedType === "text"}
            onChange={handleTypeChange}
            style={{ marginRight: "8px", accentColor: "black" }}
          />
          Text Input
        </label>
        {selectedType === "text" && (
          <div>
            <LabelInput label={label} setLabel={setLabel} />
            <RequiredInput
              isRequired={isRequired}
              setIsRequired={setIsRequired}
            />
            <button className="create-btn" onClick={handleCreateField}>
              Create
            </button>
          </div>
        )}
      </div>

      {/* DropDown */}
      <div className="input-type">
        <label className="label">
          <input
            type="radio"
            value="dropdown"
            checked={selectedType === "dropdown"}
            onChange={handleTypeChange}
            style={{ marginRight: "8px", accentColor: "black" }}
          />
          Dropdown
        </label>
        {selectedType === "dropdown" && (
          <div>
            <LabelInput label={label} setLabel={setLabel} />

            <AddOptions
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              handleAddOption={handleAddOption}
              options={options}
            />
            <RequiredInput
              isRequired={isRequired}
              setIsRequired={setIsRequired}
            />
            <button className="create-btn" onClick={handleCreateField}>
              Create
            </button>
          </div>
        )}
      </div>

      {/* Checkbox */}
      <div className="input-type">
        <label className="label">
          <input
            type="radio"
            value="checkbox"
            checked={selectedType === "checkbox"}
            onChange={handleTypeChange}
            style={{ marginRight: "8px", accentColor: "black" }}
          />
          Checkbox
        </label>
        {selectedType === "checkbox" && (
          <div>
            <LabelInput label={label} setLabel={setLabel} />
            <AddOptions
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              handleAddOption={handleAddOption}
              options={options}
            />
            <RequiredInput
              isRequired={isRequired}
              setIsRequired={setIsRequired}
            />
            <button className="create-btn" onClick={handleCreateField}>
              Create
            </button>
          </div>
        )}
      </div>

      {/* Radio Button */}
      <div className="input-type">
        <label className="label">
          <input
            type="radio"
            value="radio"
            checked={selectedType === "radio"}
            onChange={handleTypeChange}
            style={{ marginRight: "8px", accentColor: "black" }}
          />
          Radio Button
        </label>
        {selectedType === "radio" && (
          <div>
            <LabelInput label={label} setLabel={setLabel} />
            <AddOptions
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              handleAddOption={handleAddOption}
              options={options}
            />
            <RequiredInput
              isRequired={isRequired}
              setIsRequired={setIsRequired}
            />
            <button className="create-btn" onClick={handleCreateField}>
              Create
            </button>
          </div>
        )}
      </div>

      {/* Textarea */}
      <div className="input-type">
        <label className="label">
          <input
            type="radio"
            value="textarea"
            checked={selectedType === "textarea"}
            onChange={handleTypeChange}
            style={{ marginRight: "8px", accentColor: "black" }}
          />
          Text Area
        </label>
        {selectedType === "textarea" && (
          <div>
            <LabelInput label={label} setLabel={setLabel} />
            <RequiredInput
              isRequired={isRequired}
              setIsRequired={setIsRequired}
            />
            <button className="create-btn" onClick={handleCreateField}>
              Create
            </button>
          </div>
        )}
      </div>

      {/* Clear Form Button */}
      <button
        className="create-btn"
        onClick={() => {
          setFormJson([]);
          setFormData({});
          setErrors({});
          setSelectedType("");
          setOptions([]);
        }}
      >
        Clear Form
      </button>
    </div>
  );
};

export default FormFields;
