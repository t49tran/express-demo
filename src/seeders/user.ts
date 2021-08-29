import { User } from 'src/entity/User';
import faker from 'faker';
import bcrypt from 'bcrypt';
import { secrets } from 'src/services/secret';
import { getConnection } from 'typeorm';

export const userSeeder = async () => {
  const { PASSWORD_SALT = '' } = secrets;
  const dbConnection = getConnection();

  const users = [...Array(100)].map((_, index) => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    role: 'user',
    email: faker.internet.email(),
    password: bcrypt.hashSync('test1234', PASSWORD_SALT)
  }));

  await dbConnection
    .createQueryBuilder()
    .insert()
    .into(User)
    .values(users as User[])
    .execute();
};
