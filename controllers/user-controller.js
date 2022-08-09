const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const UserModel = require('../models/user-model');
const UserDto = require('../dtos/user-dto');
// const ApiError = require('../exceptions/api-error')

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new Error('Ошибка при валидации'));
      }
      const { name, surname, lastname, email, password, role } = req.body;
      const userData = await userService.registration(
        name,
        surname,
        lastname,
        email,
        password,
        role,
      );
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async refreshPassword(req, res, next) {
    try {
      const { email, password } = req.body;
      await userService.refreshPassword(email, password);
      res.json({ message: 'Check your email!' });
    } catch (e) {
      next(e);
    }
  }

  async changePassword(req, res, next) {
    try {
      const link = req.params.link;
      await userService.changePassword(link);
      res.redirect(`${process.env.CLIENT_URL}/login`);
    } catch (e) {
      next(e);
    }
  }

  async uploadAvatar(req, res, next) {
    try {
      const { img } = req.files;
      const userId = req.user.id;
      const user = await userService.uploadAvatar(img, userId);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async deleteAvatar(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await userService.deleteAvatar(userId);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { date, height, weight } = req.body;
      const id = req.user.id;
      if (date) {
        await userService.updateAge(id, date);
      }
      if (height) {
        await userService.updateHeight(id, height);
      }
      if (weight) {
        await userService.updateWeight(id, weight);
      }
      const user = await UserModel.findById(id);
      const userDto = new UserDto(user);
      res.json(userDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
