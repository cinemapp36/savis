import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, CheckCircle, User, Calendar, Heart } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

interface EvaluationRecord {
  patientData: PatientData;
  vitalSigns: VitalSigns;
  triageResult: string;
  evaluationDate: string;
}

function Resultado() {
  const navigate = useNavigate();
  const [evaluationRecord, setEvaluationRecord] = useState<EvaluationRecord | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    // Load evaluation record from localStorage
    const savedEvaluation = localStorage.getItem('lastEvaluation');
    if (savedEvaluation) {
      setEvaluationRecord(JSON.parse(savedEvaluation));
    } else {
      // If no evaluation data, redirect to registration
      navigate('/');
    }
  }, [navigate]);

  const getTriageInfo = (triage: string) => {
    switch (triage) {
      case 'I':
        return {
          level: 'I',
          name: 'RESUCITACIÓN',
          color: 'text-red-700',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          priority: 'CRÍTICO - Atención inmediata',
          time: 'Inmediato'
        };
      case 'II':
        return {
          level: 'II',
          name: 'EMERGENCIA',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          priority: 'MUY URGENTE - Atención en 10 minutos',
          time: '10 minutos'
        };
      case 'III':
        return {
          level: 'III',
          name: 'URGENCIA',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          priority: 'URGENTE - Atención en 60 minutos',
          time: '60 minutos'
        };
      case 'IV':
        return {
          level: 'IV',
          name: 'URGENCIA MENOR',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          priority: 'MENOS URGENTE - Atención en 120 minutos',
          time: '120 minutos'
        };
      case 'V':
        return {
          level: 'V',
          name: 'NO URGENTE',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          priority: 'NO URGENTE - Atención en 240 minutos',
          time: '240 minutos'
        };
      default:
        return {
          level: '?',
          name: 'DESCONOCIDO',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          priority: 'Sin clasificar',
          time: 'N/A'
        };
    }
  };

  const generatePDF = async () => {
    if (!evaluationRecord) return;

    setIsGeneratingPDF(true);
    
    try {
      const element = document.getElementById('evaluation-summary');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `Triage_${evaluationRecord.patientData.nombre.replace(/\s+/g, '_')}_${evaluationRecord.patientData.identificacion}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor intente nuevamente.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleNewPatient = () => {
    // Clear localStorage and navigate to registration
    localStorage.removeItem('patientData');
    localStorage.removeItem('lastEvaluation');
    navigate('/');
  };

  const handleBackToVitalSigns = () => {
    navigate('/signos');
  };

  if (!evaluationRecord) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Cargando resultado de evaluación...</p>
        </div>
      </div>
    );
  }

  const triageInfo = getTriageInfo(evaluationRecord.triageResult);

  return (
    <div>
      <div className="border-l-4 border-green-600 pl-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800 uppercase">Resultado Final del Triage</h2>
        <p className="text-sm text-gray-600 mt-1">
          Evaluación completada - {evaluationRecord.evaluationDate}
        </p>
      </div>

      {/* Success Confirmation */}
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
        <CheckCircle className="w-6 h-6 text-green-600" />
        <div>
          <p className="font-semibold text-green-800">Registro guardado correctamente</p>
          <p className="text-sm text-green-600">La evaluación del paciente ha sido procesada exitosamente</p>
        </div>
      </div>

      <div id="evaluation-summary" className="bg-white p-6">
        {/* Triage Result Card */}
        <div className={`p-6 rounded-lg border-2 ${triageInfo.borderColor} ${triageInfo.bgColor} mb-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">CLASIFICACIÓN TRIAGE</h3>
              <p className="text-lg font-semibold text-gray-700">{triageInfo.priority}</p>
              <p className="text-sm text-gray-600 mt-1">Tiempo máximo de espera: {triageInfo.time}</p>
            </div>
            <div className="text-center">
              <div className={`text-8xl font-bold ${triageInfo.color} mb-2`}>
                {triageInfo.level}
              </div>
              <div className={`text-lg font-bold ${triageInfo.color}`}>
                {triageInfo.name}
              </div>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-gray-600" />
              <h4 className="text-lg font-bold text-gray-800">DATOS DEL PACIENTE</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Nombre:</span>
                <span className="text-gray-800">{evaluationRecord.patientData.nombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Identificación:</span>
                <span className="text-gray-800">{evaluationRecord.patientData.identificacion}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Edad:</span>
                <span className="text-gray-800">{evaluationRecord.patientData.edad} años</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Sexo:</span>
                <span className="text-gray-800">{evaluationRecord.patientData.sexo}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Tipo de Sangre:</span>
                <span className="text-gray-800">{evaluationRecord.patientData.tipoSangre}</span>
              </div>
              {evaluationRecord.patientData.alergias && (
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Alergias:</span>
                  <span className="text-gray-800">{evaluationRecord.patientData.alergias}</span>
                </div>
              )}
              {evaluationRecord.patientData.enfermedadesBase && (
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Enfermedades Base:</span>
                  <span className="text-gray-800">{evaluationRecord.patientData.enfermedadesBase}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-red-600" />
              <h4 className="text-lg font-bold text-gray-800">SIGNOS VITALES</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Temperatura:</span>
                <span className="text-gray-800">{evaluationRecord.vitalSigns.temperatura}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Presión Arterial:</span>
                <span className="text-gray-800">
                  {evaluationRecord.vitalSigns.presionSistolica}/{evaluationRecord.vitalSigns.presionDiastolica} mmHg
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Frecuencia Cardíaca:</span>
                <span className="text-gray-800">{evaluationRecord.vitalSigns.frecuenciaCardiaca} lpm</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Frecuencia Respiratoria:</span>
                <span className="text-gray-800">{evaluationRecord.vitalSigns.frecuenciaRespiratoria} rpm</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Saturación O₂:</span>
                <span className="text-gray-800">{evaluationRecord.vitalSigns.saturacionO2}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Consultation Details */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h4 className="text-lg font-bold text-gray-800">DETALLES DE LA CONSULTA</h4>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Motivo de Consulta:</span>
              <span className="text-gray-800">{evaluationRecord.patientData.motivoConsulta}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Fecha de Registro:</span>
              <span className="text-gray-800">{evaluationRecord.patientData.fechaHora}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Fecha de Evaluación:</span>
              <span className="text-gray-800">{evaluationRecord.evaluationDate}</span>
            </div>
            {evaluationRecord.patientData.acompanante && (
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Acompañante:</span>
                <span className="text-gray-800">{evaluationRecord.patientData.acompanante}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
        <div className="flex gap-4">
          <button
            onClick={handleBackToVitalSigns}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Volver a Signos Vitales
          </button>
          <button
            onClick={handleNewPatient}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Nuevo Paciente
          </button>
        </div>
        
        <button
          onClick={generatePDF}
          disabled={isGeneratingPDF}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg ${
            isGeneratingPDF
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isGeneratingPDF ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Generando PDF...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Generar PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Resultado;