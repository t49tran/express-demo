import { Request, Response, Router } from 'express';
import * as JWTService from 'src/services/jwt';

const authRoutes = Router();

authRoutes.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .json({
        message: 'Please provide username and password'
      })
      .status(401);
  }

  try {
    const user = await req.userService!.authenticateUser(username, password);
    const token = JWTService.sign(user);

    res.json({ token });
  } catch (error) {
    res
      .json({
        message: 'Invalid username and password'
      })
      .status(401);
  }
});

export { authRoutes };
