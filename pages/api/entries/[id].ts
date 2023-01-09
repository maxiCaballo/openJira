import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IEntry, Entry } from '../../../models';

type Data = { message: string } | IEntry[] | IEntry;

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: `ERROR id: ${id} is not valid` });
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res);
    default:
      res.status(400).json({ message: 'Http method error' });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();

    const entry = await Entry.findById(id);

    //Si no existe entrada...
    if (!entry) {
      await db.disconnect();
      return res.status(400).json({ message: 'The entry does not exist' });
    }

    //Si exsite entrada...
    //Puede o no enviarme description o status
    const { description = entry.description, status = entry.status } = req.body;

    //*1ra forma de actualizar
    //runValidators: es para que chequee que el status sea los que definimos.
    //new:true es para que me devuelva el elemento actualizado sino me devuelve el viejo.
    const updatedEntry = await Entry.findByIdAndUpdate(
      entry.id,
      { description, status },
      { runValidators: true, new: true }
    );
    await db.disconnect();

    //*2da forma de actualizar - menos bonita pero mas eficiente -
    /*
      entry.description = description;
      entry.status = status;
      await entry.save();
    */

    //El "!" al final es para decirle a typescript que siempre voy a recibir un valor
    res.status(200).json(updatedEntry!);
  } catch (error) {
    db.disconnect();
    console.log(error);

    return res
      .status(400)
      .json({ message: 'There was an error updating the entry ' });
  }
};
