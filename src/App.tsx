import { useState } from 'react';
import { FileText, Activity, Menu, X, Home, Users, Calendar, Settings } from 'lucide-react';

type Tab = 'registro' | 'signos';

interface PatientData {
  identificacion: string;
  nombre: string;
  edad: string;
  sexo: string;
  tipoSangre: string;
  alergias: string;
  enfermedadesBase: string;
  medicamentosActuales: string;
  motivoConsulta: string;
  acompanante: string;
  fechaHora: string;
}

interface VitalSigns {
  temperatura: string;
  presionSistolica: string;
  presionDiastolica: string;
  frecuenciaCardiaca: string;
  frecuenciaRespiratoria: string;
  saturacionO2: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('registro');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [patientData, setPatientData] = useState<PatientData>({
    identificacion: '',
    nombre: '',
    edad: '',
    sexo: '',
    tipoSangre: '',
    alergias: '',
    enfermedadesBase: '',
    medicamentosActuales: '',
    motivoConsulta: '',
    acompanante: '',
    fechaHora: new Date().toLocaleString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  });

  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    temperatura: '',
    presionSistolica: '',
    presionDiastolica: '',
    frecuenciaCardiaca: '',
    frecuenciaRespiratoria: '',
    saturacionO2: ''
  });

  const handlePatientDataChange = (field: keyof PatientData, value: string) => {
    setPatientData(prev => ({ ...prev, [field]: value.toUpperCase() }));
  };

  const handleVitalSignsChange = (field: keyof VitalSigns, value: string) => {
    setVitalSigns(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      patientData.identificacion.trim() !== '' &&
      patientData.nombre.trim() !== '' &&
      patientData.edad.trim() !== '' &&
      patientData.sexo.trim() !== '' &&
      patientData.tipoSangre.trim() !== '' &&
      patientData.motivoConsulta.trim() !== ''
    );
  };

  const handleContinue = () => {
    if (!isFormValid()) {
      alert('Por favor complete todos los campos obligatorios antes de continuar.');
      return;
    }
    setActiveTab('signos');
  };

  const handleBack = () => {
    setActiveTab('registro');
  };

  const handleClear = () => {
    setVitalSigns({
      temperatura: '',
      presionSistolica: '',
      presionDiastolica: '',
      frecuenciaCardiaca: '',
      frecuenciaRespiratoria: '',
      saturacionO2: ''
    });
  };

  const handleEvaluate = () => {
    alert('Paciente evaluado correctamente');
  };

  return (
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
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/20 rounded-lg transition-colors">
              <Home className="w-5 h-5" />
              <span className="font-medium">Inicio</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/20 rounded-lg transition-colors">
              <FileText className="w-5 h-5" />
              <span className="font-medium">Registro del Paciente</span>
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
            {activeTab === 'registro' ? (
              <div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        IDENTIFICACIÓN: <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Cédula o documento"
                        value={patientData.identificacion}
                        onChange={(e) => handlePatientDataChange('identificacion', e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            document.querySelector<HTMLInputElement>('input[name="nombre"]')?.focus();
                          }
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        name="identificacion"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        NOMBRE: <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Nombre completo"
                        value={patientData.nombre}
                        onChange={(e) => handlePatientDataChange('nombre', e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            document.querySelector<HTMLInputElement>('input[name="edad"]')?.focus();
                          }
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        name="nombre"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          EDAD: <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Años"
                          value={patientData.edad}
                          onChange={(e) => handlePatientDataChange('edad', e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              document.querySelector<HTMLSelectElement>('select[name="sexo"]')?.focus();
                            }
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          name="edad"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          SEXO: <span className="text-red-600">*</span>
                        </label>
                        <select
                          value={patientData.sexo}
                          onChange={(e) => handlePatientDataChange('sexo', e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              document.querySelector<HTMLSelectElement>('select[name="tipoSangre"]')?.focus();
                            }
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          name="sexo"
                          required
                        >
                          <option value="">Seleccionar</option>
                          <option value="Masculino">Masculino</option>
                          <option value="Femenino">Femenino</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        TIPO DE SANGRE: <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={patientData.tipoSangre}
                        onChange={(e) => handlePatientDataChange('tipoSangre', e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            document.querySelector<HTMLInputElement>('input[name="alergias"]')?.focus();
                          }
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        name="tipoSangre"
                        required
                      >
                        <option value="">Seleccionar</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ALERGIAS:
                      </label>
                      <input
                        type="text"
                        placeholder="Medicamentos, alimentos, etc."
                        value={patientData.alergias}
                        onChange={(e) => handlePatientDataChange('alergias', e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            document.querySelector<HTMLInputElement>('input[name="enfermedadesBase"]')?.focus();
                          }
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        name="alergias"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ENFERMEDADES BASE:
                      </label>
                      <input
                        type="text"
                        placeholder="Diabetes, hipertensión, etc."
                        value={patientData.enfermedadesBase}
                        onChange={(e) => handlePatientDataChange('enfermedadesBase', e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            document.querySelector<HTMLInputElement>('input[name="medicamentosActuales"]')?.focus();
                          }
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        name="enfermedadesBase"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        MEDICAMENTOS ACTUALES:
                      </label>
                      <input
                        type="text"
                        placeholder="Medicinas que consume regularmente"
                        value={patientData.medicamentosActuales}
                        onChange={(e) => handlePatientDataChange('medicamentosActuales', e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            document.querySelector<HTMLInputElement>('input[name="motivoConsulta"]')?.focus();
                          }
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        name="medicamentosActuales"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        MOTIVO DE CONSULTA: <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Síntomas o razón de la visita"
                        value={patientData.motivoConsulta}
                        onChange={(e) => handlePatientDataChange('motivoConsulta', e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            document.querySelector<HTMLInputElement>('input[name="acompanante"]')?.focus();
                          }
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        name="motivoConsulta"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ACOMPAÑANTE:
                      </label>
                      <input
                        type="text"
                        placeholder="Nombre del acompañante (si aplica)"
                        value={patientData.acompanante}
                        onChange={(e) => handlePatientDataChange('acompanante', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        name="acompanante"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        FECHA/HORA:
                      </label>
                      <input
                        type="text"
                        value={patientData.fechaHora}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <p className="text-sm text-gray-600 mr-4 flex items-center">
                      <span className="text-red-600 mr-1">*</span> Campos obligatorios
                    </p>
                    <button
                      onClick={handleContinue}
                      disabled={!isFormValid()}
                      className={`px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg ${
                        isFormValid()
                          ? 'bg-red-600 text-white hover:bg-red-700 cursor-pointer'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="border-l-4 border-red-600 pl-4 mb-6">
                  <h2 className="text-xl font-bold text-gray-800 uppercase">Signos Vitales</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      TEMPERATURA (°C):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={vitalSigns.temperatura}
                        onChange={(e) => handleVitalSignsChange('temperatura', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <span className="flex items-center px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                        °C
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      PRESIÓN ARTERIAL (MMHG):
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={vitalSigns.presionSistolica}
                        onChange={(e) => handleVitalSignsChange('presionSistolica', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <span className="text-2xl font-bold text-gray-400">/</span>
                      <input
                        type="text"
                        value={vitalSigns.presionDiastolica}
                        onChange={(e) => handleVitalSignsChange('presionDiastolica', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <span className="flex items-center px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                        mmHg
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      FRECUENCIA CARDÍACA (LPM):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={vitalSigns.frecuenciaCardiaca}
                        onChange={(e) => handleVitalSignsChange('frecuenciaCardiaca', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <span className="flex items-center px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                        lpm
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      FRECUENCIA RESPIRATORIA (RPM):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={vitalSigns.frecuenciaRespiratoria}
                        onChange={(e) => handleVitalSignsChange('frecuenciaRespiratoria', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <span className="flex items-center px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                        rpm
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      SATURACIÓN O₂ (%):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={vitalSigns.saturacionO2}
                        onChange={(e) => handleVitalSignsChange('saturacionO2', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <span className="flex items-center px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                        %
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between gap-4 pt-4">
                    <button
                      onClick={handleBack}
                      className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Atrás
                    </button>
                    <div className="flex gap-4">
                      <button
                        onClick={handleClear}
                        className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                      >
                        Limpiar
                      </button>
                      <button
                        onClick={handleEvaluate}
                        className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg"
                      >
                        Evaluar paciente
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
  );
}

export default App;
