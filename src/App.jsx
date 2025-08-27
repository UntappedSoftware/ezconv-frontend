import { useState } from "react";
export default function App() {
  const [url, setUrl] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [file, setFile] = useState(null);
  const handleConvert = async () => {
    const res = await fetch("http://localhost:8000/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, start_time: Number(start), end_time: Number(end) })
    });
    const data = await res.json();
    setFile(data.path);
  };
  return (
    <div>
      <h1>EzConv Local</h1>
      <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="YouTube URL" />
      <input type="number" placeholder="Start Time (sec)" value={start} onChange={e=>setStart(e.target.value)} />
      <input type="number" placeholder="End Time (sec)" value={end} onChange={e=>setEnd(e.target.value)} />
      <button onClick={handleConvert}>Convert</button>
      {file && <a href={file} download>Download MP3</a>}
    </div>
  );
}