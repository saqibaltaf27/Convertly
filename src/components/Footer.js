import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Convertly</h2>
          <p className="text-sm leading-relaxed">
            Simplify your document workflow with powerful tools to edit, compress, and convert files — all in one place.
          </p>

          {/* Social Icons */}
         
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            
          </ul>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Popular Tools</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/compress-pdf" className="hover:text-white transition">Compress PDF</Link></li>
            <li><Link to="/compress-image" className="hover:text-white transition">Compress Image</Link></li>
            <li><Link to="/word-to-excel" className="hover:text-white transition">Word to Excel</Link></li>
            <li><Link to="/excel-to-word" className="hover:text-white transition">Excel to Word</Link></li>
            <li><Link to="/pdf-to-word" className="hover:text-white transition">PDF to Word</Link></li>
            <li><Link to="/pdf-editor" className="hover:text-white transition">PDF Editor</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p className="text-sm mb-2">Islamabad, Pakistan</p>
          <p className="text-sm mb-2">saqibkh1805@gmail.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm flex flex-col md:flex-row justify-between items-center">
        <span>© {new Date().getFullYear()} <span className="font-semibold text-white">Convertly</span> — All Rights Reserved.</span>
        <div className="flex space-x-4 mt-2 md:mt-0">
          
        </div>
      </div>
    </footer>
  );
}
