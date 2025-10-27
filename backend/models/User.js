import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  rol: {
    type: String,
    enum: ['ADMIN', 'MEDICO', 'ENFERMERO', 'RECEPCIONISTA'],
    default: 'ENFERMERO'
  },
  cedula: {
    type: String,
    required: true,
    unique: true
  },
  telefono: {
    type: String,
    default: ''
  },
  especialidad: {
    type: String,
    default: ''
  },
  activo: {
    type: Boolean,
    default: true
  },
  ultimoAcceso: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Middleware para hashear la contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Índices
userSchema.index({ email: 1 });
userSchema.index({ cedula: 1 });
userSchema.index({ rol: 1 });

export default mongoose.model('User', userSchema);