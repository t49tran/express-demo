import { User } from 'src/entity/User';
import { Connection, getConnection } from 'typeorm';
import { logger } from './logger';
import bcrypt, { compareSync } from 'bcrypt';
import { secrets } from './secret';

export type UserService = {
  getAllUsers: () => Promise<User[]>;
  authenticateUser: (username: string, password: string) => Promise<User>;
  findUser: (userId: number) => Promise<User | undefined>;
  deleteUser: (userId: number) => Promise<User | undefined>;
  createUser: (userData: any) => Promise<any>;
  updateUser: (userId: number, userData: any) => Promise<any>;
};

export const userService = (dbConnection: Connection): UserService => {
  const { PASSWORD_SALT = '' } = secrets;

  // Function to get all user
  const getAllUsers = async () => {
    try {
      const users = await dbConnection
        .getRepository(User)
        .createQueryBuilder('user')
        .getMany();

      return users;
    } catch (error) {
      logger.error('Error getting users', error);

      throw error;
    }
  };

  // Function to retrieve single user
  const findUser = async (userId: number) => {
    try {
      const user = await dbConnection.getRepository(User).findOne(userId);

      return user;
    } catch (error) {
      logger.error('Error getting users', error);

      throw error;
    }
  };

  // Function to retrieve single user
  const deleteUser = async (userId: number) => {
    const user = await dbConnection.getRepository(User).findOne(userId);

    if (!user) {
      throw new Error('Could not find user');
    }

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id: 1 })
      .execute();

    return user;
  };

  const createUser = async ({ firstName, lastName, email, password }: any) => {
    const user = new User();

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.role = 'user';

    if (password) {
      user.password = bcrypt.hashSync(password, PASSWORD_SALT);
    }

    await user.save();

    return user.toJSON();
  };

  const updateUser = async (
    userId: number,
    { firstName, lastName, email, password }: any
  ) => {
    const user = await dbConnection.getRepository(User).findOne(userId);

    if (!user) {
      throw Error('User not found');
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    if (password) {
      user.password = bcrypt.hashSync(password, PASSWORD_SALT);
    }

    await user.save();

    return user.toJSON();
  };

  // Function to authenticate user
  const authenticateUser = async (username: string, password: string) => {
    const hashedPassword = bcrypt.hashSync(password, PASSWORD_SALT);

    const user = await dbConnection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', {
        username,
        hashedPassword
      })
      .getOne();

    if (!user) {
      throw Error('Could not authenticate user');
    }

    const isPasswordMatched = compareSync(password, user.password);

    if (!isPasswordMatched) {
      throw Error('Could not authenticate user');
    }

    return user;
  };

  return {
    getAllUsers,
    authenticateUser,
    findUser,
    deleteUser,
    createUser,
    updateUser
  };
};
