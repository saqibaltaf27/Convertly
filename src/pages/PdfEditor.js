import React, { useRef, useState } from "react";

/**
 * PdfEditor component
 * - Drag & drop or click to pick PDF files
 * - Supports rotate, split, and merge actions
 * - Shows list of files with progress, status, and download button per file
 * - Converts files in parallel and updates each file's state individually
 */
export default function PdfEditor() {
  const [action, setAction] = useState("rotate");
  const [items, setItems] = useState([]); // { id, file, name, sizeKB, progress, status, downloadUrl, error }
  const [angle, setAngle] = useState(90);
  const [pages, setPages] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  // Helpers
  const addFiles = (fileList) => {
    const incoming = Array.from(fileList).filter((f) => f.name.toLowerCase().endsWith(".pdf"));

    if (!incoming.length) return alert("Please select PDF files");

    const mapped = incoming.map((file, idx) => ({
      id: `${Date.now()}-${idx}-${file.name}`,
      file,
      name: file.name,
      sizeKB: (file.size / 1024).toFixed(2),
      progress: 0,
      status: "ready",
      downloadUrl: null,
      error: null,
    }));

    setItems((prev) => {
      if (action === "merge") return [...prev, ...mapped]; // allow multiple for merge
      return mapped.slice(0, 1); // only single file for rotate/split
    });
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

  // Process single file
  const processSingle = async (item) => {
    updateItem(item.id, { status: "processing", progress: 8, error: null });

    const form = new FormData();
    form.append("file", item.file);
    form.append("action", action);
    if (action === "rotate") form.append("angle", angle);
    if (action === "split") form.append("pages", pages);

    try {
      const res = await fetch("https://convertly-production.up.railway.app/pdf-editor", { method: "POST", body: form });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Server responded ${res.status}`);
      }

      const data = await res.json();

      updateItem(item.id, {
        progress: 100,
        status: "done",
        downloadUrl: "https://convertly-production.up.railway.app" + (data.download_url || ""),
      });
    } catch (err) {
      console.error("PDF processing error:", err);
      updateItem(item.id, {
        status: "error",
        progress: 0,
        error: typeof err === "string" ? err : err.message || "Processing failed",
      });
    }
  };

  // Process all files
  const processAll = async () => {
    if (!items.length) return alert("Please add PDF files.");
    if (action === "merge" && items.length < 2) return alert("Select at least two files to merge.");

    setIsProcessing(true);
    await Promise.all(items.map((it) => processSingle(it)));
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">PDF Editor</h1>
        <p className="text-gray-600 mb-8">
          Drag & drop or click to select PDF files. You can rotate, split, or merge PDFs. Each file will be processed and a download link will appear when ready.
        </p>

        {/* Action selector */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Select Action</label>
          <select
            value={action}
            onChange={(e) => {
              setAction(e.target.value);
              clearAll();
            }}
            className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="rotate">Rotate PDF</option>
            <option value="split">Split PDF</option>
            <option value="merge">Merge PDFs</option>
          </select>
        </div>

        {/* Upload area */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={`border-2 rounded-2xl p-8 mb-6 cursor-pointer transition
            ${dragging ? "border-blue-500 bg-white" : "border-dashed border-gray-300 bg-white/90"}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            multiple={action === "merge"}
            onChange={(e) => addFiles(e.target.files)}
            className="hidden"
          />
          <div className="text-center text-gray-500">
            {dragging ? "Drop files to upload" : `Click or drag ${action === "merge" ? "PDFs" : "a PDF"} here`}
          </div>
        </div>

        {/* Action-specific inputs */}
        {action === "rotate" && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Rotation Angle</label>
            <input
              type="number"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              placeholder="90, 180, 270"
              className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        {action === "split" && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Pages to Keep</label>
            <input
              type="text"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="e.g. 1,3-5"
              className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Files list */}
        <div className="space-y-4 mb-6">
          {items.length === 0 && <div className="text-center text-sm text-gray-500">No files selected yet.</div>}
          {items.map((it) => (
            <div key={it.id} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-md border">
                <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none">
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
                    {it.status === "error" && <span className="text-sm text-red-600">Failed</span>}
                    <button
                      onClick={() => removeItem(it.id)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all ${it.status === "done" ? "bg-green-600" : "bg-blue-600"}`}
                      style={{ width: `${it.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <div>
                      {it.status === "ready" && "Ready"}
                      {it.status === "processing" && "Processing..."}
                      {it.status === "done" && "Completed"}
                      {it.status === "error" && `Error: ${it.error}`}
                    </div>
                    <div>{it.progress}%</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={processAll}
            disabled={isProcessing || !items.length || (action === "merge" && items.length < 2)}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              isProcessing || !items.length || (action === "merge" && items.length < 2)
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isProcessing ? "Processing..." : "Submit"}
          </button>

          <button
            onClick={() => items.forEach((it) => it.downloadUrl && window.open(it.downloadUrl))}
            disabled={!items.some((it) => it.downloadUrl)}
            className={`px-4 py-2 rounded-md transition ${
              items.some((it) => it.downloadUrl)
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Open all downloads
          </button>

          {items.length > 0 && (
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
