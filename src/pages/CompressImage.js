import React, { useRef, useState } from "react";

/**
 * CompressImage component
 * - Drag & drop or click to pick multiple image files
 * - Shows list of files with progress, status, and download button per file
 * - Compresses files individually and updates each file's state
 */
export default function CompressImage() {
  const [items, setItems] = useState([]); // { id, file, preview, sizeKB, progress, status, downloadUrl, error }
  const [isCompressing, setIsCompressing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (!incoming.length) return alert("Please select image files");

    const mapped = incoming.map((file, idx) => ({
      id: `${Date.now()}-${idx}-${file.name}`,
      file,
      preview: URL.createObjectURL(file),
      sizeKB: (file.size / 1024).toFixed(2),
      progress: 0,
      status: "ready", // ready | compressing | done | error
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

  const compressSingle = async (item) => {
    updateItem(item.id, { status: "compressing", progress: 20, error: null });

    const form = new FormData();
    form.append("file", item.file);

    try {
      const res = await fetch("http://localhost:5000/image-compress", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (res.ok) {
        updateItem(item.id, {
          status: "done",
          progress: 100,
          downloadUrl: "http://localhost:5000" + data.download_url,
        });
      } else {
        throw new Error(data.error || "Compression failed");
      }
    } catch (err) {
      console.error(err);
      updateItem(item.id, {
        status: "error",
        progress: 0,
        error: typeof err === "string" ? err : err.message || "Compression failed",
      });
    }
  };

  const compressAll = async () => {
    if (!items.length) return alert("Please add images.");
    setIsCompressing(true);

    await Promise.all(items.map((it) => compressSingle(it)));

    setIsCompressing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">Compress Images</h1>
        <p className="text-gray-600 mb-8">
          Upload multiple images and compress them all at once — fast & secure.
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
          className={`border-2 rounded-2xl p-8 mb-6 cursor-pointer transition
            ${dragging ? "border-blue-500 bg-white" : "border-dashed border-gray-300 bg-white/90"}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => addFiles(e.target.files)}
            className="hidden"
          />
          <div className="text-center text-gray-500">
            {dragging ? "Drop images to upload" : "Drag & drop images here or click to browse"}
          </div>
        </div>

        {/* Files list */}
        <div className="space-y-4 mb-6 text-left">
          {items.length === 0 && <div className="text-center text-sm text-gray-500">No images selected yet.</div>}
          {items.map((it) => (
            <div key={it.id} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
              <img
                src={it.preview}
                alt="preview"
                className="w-16 h-16 object-cover rounded-md border"
              />
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
                  {it.status === "compressing" && <div className="mt-2 text-xs text-blue-600">Compressing...</div>}
                  {it.status === "error" && <div className="mt-2 text-xs text-red-600">{it.error}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={compressAll}
            disabled={isCompressing || !items.length}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              isCompressing || !items.length
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isCompressing ? "Compressing..." : "Compress All"}
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
