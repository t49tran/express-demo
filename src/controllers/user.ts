import { Router } from 'express';

const userRoutes = Router();

userRoutes.get('/', async (req, res) => {
  const users = await req.userService!.getAllUsers();

  res.send({
    users
  });
});

userRoutes.get('/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const user = await req.userService!.findUser(userId);

  res.send({
    user
  });
});

userRoutes.post('/', async (req, res) => {
  const userData = req.body.user;

  const user = await req.userService!.createUser(userData);

  res.send({
    user
  });
});

userRoutes.put('/:userId', async (req, res) => {
  const userData = req.body.user;
  const userId = parseInt(req.params.userId, 10);

  const user = await req.userService!.updateUser(userId, userData);

  res.send({
    user
  });
});

userRoutes.delete('/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const user = await req.userService!.deleteUser(userId);

  res.send({
    user
  });
});

export { userRoutes };
