import { Router } from 'express';
import {
  registration,
  getUsers,
  login,
  logout,
  activate,
  refresh,
} from '../controllers/User-Controller.js';

const router = new Router();

router.post('/registration', registration);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.get('refresh', refresh);
router.get('/users', getUsers);

export default router;
