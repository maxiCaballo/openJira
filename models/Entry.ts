import mongoose, { Model, Schema } from 'mongoose';
import { Entry } from '../interfaces/entry';

//Typescript interface
interface IEntry extends Entry {}

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'finished'],
      message: '{VALUE} is not an allowed state',
    },
  },
});

//* Si el modelo ya esta creado lo voy a obtener del models.Entry sinó lo creo la instancia pasandole el nombre 'Entry' y el entrySchema.
const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;
