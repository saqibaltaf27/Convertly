import React from "react";

export default function ConversionPage({
  title,
  description,
  accept,
  onFileChange,
  onConvert,
  file,
  isLoading,
  progress,
  extraInput,
  downloadUrl,
  downloadLabel,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">{title}</h1>
        <p className="text-gray-600 mb-10">{description}</p>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          {!isLoading ? (
            <>
              <p className="text-gray-500 mb-4">📁 Upload your file here</p>
              <input
                type="file"
                accept={accept}
                onChange={onFileChange}
                className="block mx-auto mb-6"
              />

              {file && (
                <div className="mb-4 text-gray-700">
                  <p><strong>File:</strong> {file.name}</p>
                  <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
                </div>
              )}

              {extraInput}

              <button
                onClick={onConvert}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
                disabled={!file}
              >
                Convert & Download
              </button>
            </>
          ) : (
            <div>
              <div className="text-blue-600 font-semibold mb-4">Processing...</div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p>{progress}%</p>
            </div>
          )}

          {downloadUrl && (
            <a
              href={downloadUrl}
              download
              className="mt-6 inline-block px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
            >
              {downloadLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
