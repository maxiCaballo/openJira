import axios, { AxiosError } from 'axios';
import { Entry } from '../interfaces';

const entriesApi = axios.create({
  baseURL: '/api',
});

//Gets All
export const entriesApi_getAll = async (): Promise<
  Entry[] | AxiosError | any
> => {
  try {
    return await entriesApi.get('/entries');
  } catch (error) {
    return error;
  }
};
//Post
export const entriesApi_create = async (
  description: string
): Promise<Entry | AxiosError | any> => {
  try {
    return await entriesApi.post('/entries', {
      description,
    });
  } catch (error) {
    console.log(error);

    return error;
  }
};
//Update
export const entriesApi_update = async (
  entry: Entry
): Promise<Entry | AxiosError | any> => {
  try {
    return entriesApi.put(`/entries/${entry._id}`, {
      description: entry.description,
      status: entry.status,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default entriesApi;
