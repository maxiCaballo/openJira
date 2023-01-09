import { Entry, IEntry } from '../../../models';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';

type Data = { message: string } | IEntry[] | IEntry;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);
    case 'POST':
      return createEntry(req, res);
    default:
      return res.status(400).json({ message: 'Endpoint not exists' });
  }
}

//Methods:
//GET
const getEntries = async (res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const entries = await Entry.find().sort({ createdAt: 'ascending' });
    await db.disconnect();
    return res.status(200).json(entries);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(400).json({ message: 'Error to get entries' });
  }
};
//POST
const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = '' } = req.body;
  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });

  try {
    await db.connect();
    await newEntry.save(); //El id lo genera mongo automaticamente
    await db.disconnect();

    //Retorna una nueva entrada con el _id de mongo
    return res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnect();
    console.log(error);

    return res
      .status(400)
      .json({ message: 'There was an error, check the console on the server' });
  }
};
