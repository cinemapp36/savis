import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FileText, Menu, X, Home, Search } from 'lucide-react';
import Inicio from './pages/Inicio';
import Registro from './pages/Registro';
import Signos from './pages/Signos';
import Resultado from './pages/Resultado';
import BuscarPacientes from './pages/BuscarPacientes';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50 flex flex-col">
        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Sidebar Menu */}
        <div className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-teal-600 to-green-600 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <img
                  src="/public/ChatGPT Image 24 oct 2025, 14_05_26.png"
                  alt="SAVISER Logo"
                  className="h-12 w-auto"
                />
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-2">
              <button 
                onClick={() => {
                  window.location.href = '/';
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Inicio</span>
              </button>
              <button 
                onClick={() => {
                  window.location.href = '/registro';
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/20 rounded-lg transition-colors"
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Registro del Paciente</span>
              </button>
              <button 
                onClick={() => {
                  window.location.href = '/buscar';
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5" />
                <span className="font-medium">Buscar Pacientes</span>
              </button>
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm font-semibold mb-1">Sistema SAVISER</p>
                <p className="text-xs opacity-80">Versión 1.0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu button floating on the page */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="fixed top-6 left-6 bg-teal-600 hover:bg-teal-700 rounded-lg p-3 shadow-lg transition-all hover:scale-110 z-30"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>

        <div className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            {/* Content */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/signos" element={<Signos />} />
                <Route path="/resultado" element={<Resultado />} />
                <Route path="/buscar" element={<BuscarPacientes />} />
              </Routes>
            </div>

            <div className="text-center mt-8 text-sm text-gray-600">
              <p className="mb-2 text-xs">Sistema de Registro Clínico v1.0</p>
            </div>
          </div>
        </div>

        {/* Credits Footer */}
        <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-6">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="font-semibold text-lg mb-3">Creado por:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
              <p className="font-medium">Camilo Andrés Payares Payares</p>
              <p className="font-medium">Jesús Adrián Anaya Polo</p>
              <p className="font-medium">Julián David Gómez Esquivel</p>
              <p className="font-medium">Isac Manuel Flores Durango</p>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
