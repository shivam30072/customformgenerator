import { useState } from "react";
import "./App.css";
import FormFields from "./components/Sections/FormFields";
import GenratedForm from "./components/Sections/GenratedForm";

function App() {
  const [formJson, setFormJson] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  return (
    <div className="home">
      <FormFields
        setFormJson={setFormJson}
        formJson={formJson}
        setFormData={setFormData}
        setErrors={setErrors}
      />
      <GenratedForm
        setFormJson={setFormJson}
        formJson={formJson}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
      />
      {/* <div>
        <h3>Created Fields (JSON Data)</h3>
        <pre>{JSON.stringify(formJson, null, 2)}</pre>
      </div> */}
    </div>
  );
}

export default App;
