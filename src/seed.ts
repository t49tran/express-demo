// tslint:disable-next-line:no-submodule-imports no-var-requires
require('module-alias/register');

import { userSeeder } from 'src/seeders/user';
import { createConnection } from 'typeorm';

const seeding = async () => {
  await createConnection();
  console.log("Start seeding users");

  await userSeeder();

  console.log("End seeding users");
  process.exit();
}

seeding();