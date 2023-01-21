import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
<<<<<<< HEAD
=======

>>>>>>> 3354b5f (create uploads folder)
import router from './router/index.js';

import {
  registerValidator,
  loginValidator,
  postCreateValidator,
} from './validation/validations.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { UserController, PostController } from './controllers/index.js';

mongoose
  .connect(
    'mongodb+srv://izart:IzRoot710@cluster0.wkjqfjl.mongodb.net/blog-api?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB is OK'))
  .catch(err => console.log('DB is error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
<<<<<<< HEAD
     if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
=======
    if (!fs.existsSync('uploads')) {
      fs.mkdir('uploads');
>>>>>>> 3354b5f (create uploads folder)
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

app.use('/uploads', express.static('uploads'));
<<<<<<< HEAD
const PORT = process.env.PORT || 5555;
=======
const PORT = process.env.PORT || 6804;
>>>>>>> 3354b5f (create uploads folder)

app.post(
  '/auth/register',
  registerValidator,
  handleValidationErrors,
  UserController.register
);
app.post(
  '/auth/login',
  loginValidator,
  handleValidationErrors,
  UserController.login
);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post(
  '/posts',
  checkAuth,
  handleValidationErrors,
  postCreateValidator,
  PostController.create
);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  handleValidationErrors,
  postCreateValidator,
  PostController.update
);

app.patch('/posts/:id/likes', checkAuth, PostController.likes);

app.put(
  '/comments/:id',
  checkAuth,
  handleValidationErrors,
  PostController.comment
);

app.listen(PORT, () => {
  try {
    console.log('Server started at PORT: ', PORT);
  } catch (error) {
    console.log(error);
  }
});
