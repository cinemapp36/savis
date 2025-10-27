import { useState, useEffect } from 'react';
import { Search, User, Calendar, FileText, Eye, Edit, Trash2 } from 'lucide-react';

interface Patient {
  _id: string;
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
  createdAt: string;
}

function BuscarPacientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Simular datos de pacientes (en producción vendría del backend)
  useEffect(() => {
    const mockPatients: Patient[] = [
      {
        _id: '1',
        identificacion: '12345678',
        nombre: 'MARÍA GARCÍA LÓPEZ',
        edad: '35',
        sexo: 'FEMENINO',
        tipoSangre: 'O+',
        alergias: 'PENICILINA',
        enfermedadesBase: 'HIPERTENSIÓN',
        medicamentosActuales: 'LOSARTÁN 50MG',
        motivoConsulta: 'DOLOR DE CABEZA INTENSO',
        acompanante: 'JUAN GARCÍA',
        fechaHora: '24/10/2024, 14:30',
        createdAt: '2024-10-24T14:30:00Z'
      },
      {
        _id: '2',
        identificacion: '87654321',
        nombre: 'CARLOS RODRÍGUEZ PÉREZ',
        edad: '42',
        sexo: 'MASCULINO',
        tipoSangre: 'A+',
        alergias: '',
        enfermedadesBase: 'DIABETES TIPO 2',
        medicamentosActuales: 'METFORMINA 850MG',
        motivoConsulta: 'CONTROL RUTINARIO',
        acompanante: '',
        fechaHora: '24/10/2024, 15:45',
        createdAt: '2024-10-24T15:45:00Z'
      },
      {
        _id: '3',
        identificacion: '11223344',
        nombre: 'ANA MARTÍNEZ SILVA',
        edad: '28',
        sexo: 'FEMENINO',
        tipoSangre: 'B-',
        alergias: 'ASPIRINA',
        enfermedadesBase: '',
        medicamentosActuales: '',
        motivoConsulta: 'DOLOR ABDOMINAL',
        acompanante: 'PEDRO MARTÍNEZ',
        fechaHora: '24/10/2024, 16:20',
        createdAt: '2024-10-24T16:20:00Z'
      },
      {
        _id: '4',
        identificacion: '55667788',
        nombre: 'JOSÉ HERNÁNDEZ RUIZ',
        edad: '67',
        sexo: 'MASCULINO',
        tipoSangre: 'AB+',
        alergias: 'SULFA',
        enfermedadesBase: 'HIPERTENSIÓN, DIABETES',
        medicamentosActuales: 'ENALAPRIL, GLIBENCLAMIDA',
        motivoConsulta: 'DIFICULTAD RESPIRATORIA',
        acompanante: 'MARÍA HERNÁNDEZ',
        fechaHora: '24/10/2024, 17:10',
        createdAt: '2024-10-24T17:10:00Z'
      }
    ];
    
    setPatients(mockPatients);
    setFilteredPatients(mockPatients);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(patient =>
        patient.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.identificacion.includes(searchTerm)
      );
      setFilteredPatients(filtered);
    }
  }, [searchTerm, patients]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular búsqueda
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleEditPatient = (patient: Patient) => {
    // Implementar edición
    console.log('Editar paciente:', patient);
  };

  const handleDeletePatient = (patient: Patient) => {
    if (window.confirm(`¿Está seguro de eliminar al paciente ${patient.nombre}?`)) {
      setPatients(prev => prev.filter(p => p._id !== patient._id));
      console.log('Eliminar paciente:', patient);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-l-4 border-blue-600 pl-4">
        <h1 className="text-2xl font-bold text-gray-800 uppercase">Buscar Pacientes</h1>
        <p className="text-sm text-gray-600 mt-1">
          Consultar y gestionar pacientes registrados en el sistema
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Buscar por nombre o identificación:
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ingrese nombre o número de identificación"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isLoading
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Resultados de Búsqueda
          </h2>
          <span className="text-sm text-gray-600">
            {filteredPatients.length} paciente(s) encontrado(s)
          </span>
        </div>

        {filteredPatients.length === 0 ? (
          <div className="text-center py-8">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No se encontraron pacientes</p>
            <p className="text-sm text-gray-500">Intente con otros términos de búsqueda</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Identificación</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Nombre</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Edad</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Sexo</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Tipo Sangre</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Fecha Registro</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-800">{patient.identificacion}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{patient.nombre}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{patient.edad}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{patient.sexo}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{patient.tipoSangre}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{patient.fechaHora}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleViewPatient(patient)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditPatient(patient)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePatient(patient)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Patient Details */}
      {showModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                  Detalles del Paciente
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Identificación:</label>
                    <p className="text-gray-800">{selectedPatient.identificacion}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre:</label>
                    <p className="text-gray-800">{selectedPatient.nombre}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Edad:</label>
                    <p className="text-gray-800">{selectedPatient.edad} años</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Sexo:</label>
                    <p className="text-gray-800">{selectedPatient.sexo}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo de Sangre:</label>
                    <p className="text-gray-800">{selectedPatient.tipoSangre}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Acompañante:</label>
                    <p className="text-gray-800">{selectedPatient.acompanante || 'N/A'}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Alergias:</label>
                  <p className="text-gray-800">{selectedPatient.alergias || 'Ninguna'}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Enfermedades Base:</label>
                  <p className="text-gray-800">{selectedPatient.enfermedadesBase || 'Ninguna'}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Medicamentos Actuales:</label>
                  <p className="text-gray-800">{selectedPatient.medicamentosActuales || 'Ninguno'}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Motivo de Consulta:</label>
                  <p className="text-gray-800">{selectedPatient.motivoConsulta}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Registrado: {selectedPatient.fechaHora}</span>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => handleEditPatient(selectedPatient)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Editar Paciente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuscarPacientes;