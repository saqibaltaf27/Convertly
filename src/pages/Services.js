import React, { useState } from 'react';
import axios from 'axios';

// All logic and styling for the services component are contained here
const Services = () => {
    const [file, setFile] = useState(null);
    const [target, setTarget] = useState(500);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const upload = async (endpoint) => {
        if (!file) {
            setStatus('Please select a file first.');
            return;
        }

        setLoading(true);
        setStatus('Uploading and converting...');
        
        try {
            const data = new FormData();
            data.append("file", file);
            if (endpoint === "compress-pdf") {
                data.append("target_kb", target);
            }
            
            const res = await axios.post(`http://localhost:5000/${endpoint}`, data, {
                responseType: "blob"
            });
            
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const a = document.createElement("a");
            a.href = url;
            
            let downloadFileName = "output.pdf";
            if (endpoint === "word-to-excel") {
                downloadFileName = "output.xlsx";
            } else if (endpoint === "excel-to-word") {
                downloadFileName = "output.docx";
            }
            a.download = downloadFileName;
            
            document.body.appendChild(a);
            a.click();
            a.remove();
            
            setStatus('File converted successfully!');
        } catch (error) {
            console.error("Error during file upload:", error);
            if (error.response) {
                const errorMessage = await error.response.data.text();
                setStatus(`Error: ${errorMessage}`);
            } else {
                setStatus('Failed to connect to the server. Is it running?');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 space-y-6 max-w-lg mx-auto bg-white rounded-xl shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-800 text-center">File Converter Services</h2>
            
            <div className="space-y-4">
                <div className="flex flex-col items-center space-y-2">
                    <label htmlFor="file-input" className="w-full text-center text-sm font-medium text-gray-700">Choose a file</label>
                    <input 
                        id="file-input" 
                        type="file" 
                        onChange={e => setFile(e.target.files[0])}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                    />
                    {file && <p className="text-gray-600 text-sm">Selected: {file.name}</p>}
                </div>
                
                <div className="flex flex-col space-y-2">
                    <label htmlFor="target-input" className="text-sm font-medium text-gray-700">Target PDF Size (KB)</label>
                    <div className="flex items-center space-x-2">
                        <input
                            id="target-input"
                            type="number" 
                            value={target} 
                            onChange={e => setTarget(e.target.value)} 
                            className="w-24 border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="text-gray-600">KB</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                        onClick={() => upload("compress-pdf")} 
                        className="w-full py-2 px-4 rounded-md text-white font-semibold transition-colors duration-200 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        Compress PDF
                    </button>
                    <button 
                        onClick={() => upload("word-to-excel")} 
                        className="w-full py-2 px-4 rounded-md text-white font-semibold transition-colors duration-200 bg-green-600 hover:bg-green-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        Word → Excel
                    </button>
                    <button 
                        onClick={() => upload("excel-to-word")} 
                        className="w-full py-2 px-4 rounded-md text-white font-semibold transition-colors duration-200 bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        Excel → Word
                    </button>
                </div>
            </div>

            {status && (
                <div className="mt-4 p-3 text-center text-sm font-medium rounded-lg" role="alert">
                    <p className={status.startsWith('Error') ? 'text-red-600' : 'text-green-600'}>{status}</p>
                </div>
            )}
        </div>
    );
};

// Main App component
const App = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Services />
        </div>
    );
};

export default App;
