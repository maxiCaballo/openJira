import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../database';
import { seedData } from '../../database/seed-data';
import { Entry } from '../../models';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.NODE_ENV === 'production') {
    return res
      .status(401)
      .json({ message: `you don't have access to this service` });
  }
  await db.connect();
  //En este scope podemos hacer un CRUD o cualquier interacción con la base de datos.
  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries);

  await db.disconnect();

  res.status(200).json({ message: 'process created successfully' });
}
