import { useState } from "react";
import { toast } from "react-toastify";


export default function ImportLeads() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/configurations/leads/import-csv/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();


      if (response.ok) {
              toast.success(data.message); 
            } else {
              toast.error(data.message);
            }
    } catch (error) {
      console.error("Import error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="import-box">
  <label className="file-input">
    Choose CSV File
    <input
      type="file"
      accept=".csv"
      onChange={(e) => setFile(e.target.files[0])}
      hidden
    />
  </label>

  <button
    onClick={handleImport}
    disabled={loading}
    className="settings-btn import-btn"
  >
    {loading ? "Importing..." : "Import CSV"}
  </button>
</div>

  );
}
