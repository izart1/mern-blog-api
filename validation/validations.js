import { body } from 'express-validator';

export const registerValidator = [
  body('email', 'Не верный формат почты').isEmail(),
  body('password', 'Пароль минимум 8 символов').isLength({ min: 8 }),
  body('fullName', 'Укажите имя (минимум 3 символа)').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на аватрку').optional().isURL(),
];

export const loginValidator = [
  body('email', 'Не верный формат почты').isEmail(),
  body('password', 'Пароль минимум 8 символов').isLength({ min: 8 }),
];

export const postCreateValidator = [
  body('title', 'Введите название статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 5 }).isString(),
  body('tags', 'Введите тэги').optional().isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
  body('likes').optional().isString(),
];
