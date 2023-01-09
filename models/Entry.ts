import mongoose, { Model, Schema } from 'mongoose';
import { Entry } from '../interfaces/entry';

//Typescript interface
export interface IEntry extends Entry {}

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'finished'],
      message: '{VALUE} is not an allowed state', //Si hay error en el status envía este mensaje
    },
    default: 'pending', //Si no me manda nada, por defecto lo crea en 'pending'
  },
});

//* Si el modelo ya esta creado lo voy a obtener del models.Entry sinó creo la instancia pasandole el nombre 'Entry' y el entrySchema.
const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;
