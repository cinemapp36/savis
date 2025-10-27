import express from 'express';
import {
  createTriageEvaluation,
  getTriageEvaluationById,
  getAllTriageEvaluations,
  updateTriageStatus,
  getTriageStats
} from '../controllers/triageController.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Rutas públicas (para el sistema de triage)
router.post('/', createTriageEvaluation);

// Rutas protegidas
router.get('/', authenticateToken, getAllTriageEvaluations);
router.get('/stats', authenticateToken, authorizeRoles('ADMIN', 'MEDICO'), getTriageStats);
router.get('/:id', authenticateToken, getTriageEvaluationById);
router.put('/:id/status', authenticateToken, authorizeRoles('ADMIN', 'MEDICO', 'ENFERMERO'), updateTriageStatus);

export default router;