//*Interfaces
interface SeedData {
  entries: SeedEntry[];
}
interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}
export const seedData: SeedData = {
  entries: [
    {
      description: 'Pending-Example1',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'In-Progress Example2',
      status: 'in-progress',
      createdAt: Date.now() - 100000,
    },
    {
      description: 'Finished-Example3',
      status: 'finished',
      createdAt: Date.now() - 1000000,
    },
  ],
};
