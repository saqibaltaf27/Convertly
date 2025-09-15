import React, { useState, useRef } from "react";

export default function WordToExcel() {
  const [items, setItems] = useState([]); // { id, file, name, sizeKB, progress, status, downloadUrl, error }
  const [isConverting, setIsConverting] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  // Helpers
  const addFiles = (fileList) => {
    const incoming = Array.from(fileList).filter((f) =>
      ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(f.type) || f.name.endsWith(".docx")
    );

    if (!incoming.length) return alert("Please select .doc or .docx files");

    const mapped = incoming.map((file, idx) => ({
      id: `${Date.now()}-${idx}-${file.name}`,
      file,
      name: file.name,
      sizeKB: (file.size / 1024).toFixed(2),
      progress: 0,
      status: "ready", // ready | uploading | done | error
      downloadUrl: null,
      error: null,
    }));

    setItems((prev) => [...prev, ...mapped]);
  };

  const updateItem = (id, patch) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));

  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  const clearAll = () => setItems([]);

  // Drag & drop handlers
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  // Convert a single file (parallel)
  const convertSingle = async (item) => {
    updateItem(item.id, { status: "uploading", progress: 8, error: null });

    const form = new FormData();
    form.append("file", item.file);

    try {
      const res = await fetch("http://localhost:5000/word-to-excel", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Server responded ${res.status}`);
      }

      const data = await res.json();

      updateItem(item.id, {
        progress: 100,
        status: "done",
        downloadUrl: "http://localhost:5000" + (data.download_url || ""),
      });
    } catch (err) {
      console.error("Conversion error:", err);
      updateItem(item.id, {
        status: "error",
        progress: 0,
        error: typeof err === "string" ? err : err.message || "Conversion failed",
      });
    }
  };

  // Convert all files in parallel
  const convertAll = async () => {
    if (!items.length) return alert("Please add Word files to convert.");
    setIsConverting(true);

    await Promise.all(items.map((it) => convertSingle(it)));

    setIsConverting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">Word → Excel</h1>
        <p className="text-gray-600 mb-8">
          Drag & drop multiple Word files (.doc, .docx) or click to select. Each file will be converted
          and a download link will appear when ready.
        </p>

        {/* Upload area */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          aria-label="Drop Word files here"
          className={`border-2 rounded-2xl p-8 mb-6 cursor-pointer transition
            ${dragging ? "border-blue-500 bg-white" : "border-dashed border-gray-300 bg-white/90"}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".doc,.docx"
            multiple
            onChange={(e) => addFiles(e.target.files)}
            className="hidden"
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 4v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="3" y="12" width="18" height="7" rx="2" stroke="currentColor" strokeWidth="1.2" />
              </svg>

              <div className="text-left">
                <div className="font-medium text-gray-800">
                  {dragging ? "Drop files to upload" : "Drag & drop Word files here"}
                </div>
                <div className="text-sm text-gray-500">
                  Click to browse — supports .doc and .docx — multiple files allowed
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => inputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                aria-label="Browse files"
              >
                Browse files
              </button>

              {items.length > 0 && (
                <button
                  onClick={clearAll}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Files list */}
        <div className="space-y-4 mb-6">
          {items.length === 0 && (
            <div className="text-center text-sm text-gray-500">No files selected yet.</div>
          )}

          {items.map((it) => (
            <div key={it.id} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-md border">
                <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M7 7h10v10H7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="truncate">
                    <div className="font-medium text-gray-800 truncate">{it.name}</div>
                    <div className="text-xs text-gray-500">{it.sizeKB} KB</div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {it.status === "done" && it.downloadUrl && (
                      <a
                        href={it.downloadUrl}
                        download
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                      >
                        Download
                      </a>
                    )}

                    {it.status === "error" && (
                      <span className="text-sm text-red-600">Failed</span>
                    )}

                    <button
                      onClick={() => removeItem(it.id)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                      aria-label={`Remove ${it.name}`}
                      title="Remove file"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Progress bar & status */}
                <div className="mt-3">
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all ${it.status === "done" ? "bg-green-600" : "bg-blue-600"}`}
                      style={{ width: `${it.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-gray-500">
                      {it.status === "ready" && "Ready"}
                      {it.status === "uploading" && "Converting..."}
                      {it.status === "done" && "Completed"}
                      {it.status === "error" && `Error: ${it.error}`}
                    </div>
                    <div className="text-xs text-gray-500">{it.progress}%</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={convertAll}
            disabled={isConverting || !items.length}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              isConverting || !items.length
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isConverting ? "Converting..." : "Convert All"}
          </button>

          <button
            onClick={() => items.forEach((it) => it.downloadUrl && window.open(it.downloadUrl))}
            disabled={!items.some((it) => it.downloadUrl)}
            className={`px-4 py-2 rounded-md transition ${
              items.some((it) => it.downloadUrl)
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            title="Open all ready downloads"
          >
            Open all downloads
          </button>
        </div>
      </div>
    </div>
  );
}
