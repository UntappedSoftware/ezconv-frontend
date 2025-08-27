import { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const handleConvert = async () => {
    if (!url) {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${backendURL}/convert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Conversion failed");
      }

      const data = await res.json();
      setFile(data.path);
    } catch (err) {
      setError(err.message);
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>EzConv</h1>
      <input
        type="text"
        placeholder="YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "400px", marginBottom: "1rem", padding: "0.5rem" }}
      />
      <br />
      <button
        onClick={handleConvert}
        disabled={loading}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        {loading ? "Converting..." : "Convert"}
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {file && (
        <div style={{ marginTop: "1rem" }}>
          <a href={file} download>
            Download MP3
          </a>
        </div>
      )}
    </div>
  );
}
