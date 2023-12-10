import { mockDB } from './mocks/mock-db';

export default async function () {
  await mockDB.ds.initialize();
  await mockDB.refreshDb();
  await mockDB.ds.destroy();
}
