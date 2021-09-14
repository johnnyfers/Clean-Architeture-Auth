import { Router, Request, Response } from 'express';
import { CreateUserController } from '../../../../modules/account/controllers/CreateUserController';

import { Auth } from '../middleware/Auth';

const usersRoutes = Router();

const createUserController = new CreateUserController()

usersRoutes.post('/', createUserController.handle)

usersRoutes.get('/profile', Auth ,(req: Request, res: Response) => {
    return res.send('logged')
} )

export { usersRoutes }