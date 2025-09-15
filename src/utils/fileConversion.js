// src/utils/fileConversion.js
export async function handleFileConversion(endpoint, file, downloadName) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`http://localhost:5000/${endpoint}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Server error");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
    alert("✅ Conversion complete! Your file has been downloaded.");
  } catch (err) {
    console.error(err);
    alert("❌ Conversion failed: " + err.message);
  }
}
