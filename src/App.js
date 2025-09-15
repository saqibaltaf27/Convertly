import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";

// Import new dropdown pages
import CompressPdf from "./pages/CompressPdf";
import CompressImage from "./pages/CompressImage";
import WordToExcel from "./pages/WordToExcel";
import ExcelToWord from "./pages/ExcelToWord";
import PdfToWord from "./pages/PdfToWord";
import PdfEditor from "./pages/PdfEditor";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Existing Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        

        {/* New Dropdown Pages */}
        <Route path="/compress-pdf" element={<CompressPdf />} />
        <Route path="/compress-image" element={<CompressImage />} />
        <Route path="/word-to-excel" element={<WordToExcel />} />
        <Route path="/excel-to-word" element={<ExcelToWord />} />
        <Route path="/pdf-to-word" element={<PdfToWord />} />
        <Route path="/pdf-editor" element={<PdfEditor />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
