import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IEntry, Entry } from '../../../models';

type Data = { message: string } | IEntry[] | IEntry;

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getEntry(req, res);
    case 'PUT':
      return updateEntry(req, res);
    case 'DELETE':
      return deleteEntry(req, res);
    default:
      res.status(400).json({ message: 'Http method error' });
  }
}

//GET
const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    db.connect();
    const entry = await Entry.findById(id);
    db.disconnect();

    //Si no existe
    if (!entry)
      return res
        .status(400)
        .json({ message: 'There is no entry with ID: ' + id });

    return res.status(200).json(entry);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: 'There was an error with the request' });
  }
};
//UPDATE
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
//DELETE
const deleteEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  console.log('desde delete: ', id);

  db.connect();
  const entry = await Entry.findByIdAndRemove(id); //Si no encuentra el documento devuelve null
  db.disconnect();

  if (!entry) return res.status(400).json({ message: 'There was an error' });

  return res.status(200).json({ message: 'Entry deleted succesfully', entry });
};
