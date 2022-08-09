const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const moment = require('moment');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
// const ApiError = require('../exceptions/api-error')
const PasswordModel = require('../models/password-model');
const path = require('path');
const fs = require('fs');

class UserService {
  async registration(name, surname, lastname, email, password, role = 'USER') {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      name,
      surname,
      lastname,
      email,
      password: hashPassword,
      activationLink,
      role,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`,
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new Error('Неверный логин или пароль');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refreshPassword(email, password) {
    const activationLink = uuid.v4();
    const user = await UserModel.findOne({ email });
    const passwordData = await PasswordModel.create({ user: user._id, activationLink, password });
    await mailService.sendRefreshPassword(
      email,
      `${process.env.API_URL}/api/refreshPassword/${activationLink}`,
    );
  }

  async changePassword(activationLink) {
    const passwordData = await PasswordModel.findOne({ activationLink });
    const user = await UserModel.findOne({ _id: passwordData.user });
    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден');
    }
    const hashPassword = await bcrypt.hash(passwordData.password, 3);
    user.password = hashPassword;
    user.save();
    await PasswordModel.deleteOne({ activationLink });
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async uploadAvatar(img, userId) {
    const fileName = uuid.v4() + '.jpg';
    img.mv(path.resolve(__dirname, '..', 'static', fileName));
    const user = await UserModel.findById(userId);
    user.img = fileName;
    await user.save();
    return user;
  }

  async deleteAvatar(userId) {
    const user = await UserModel.findById(userId);
    fs.unlinkSync(path.resolve(__dirname, '..', 'static', user.img));
    user.img = null;
    await user.save();
    return user;
  }

  async updateAge(userId, dateReq) {
    const user = await UserModel.findById(userId);
    let date = dateReq.split('-');
    let [year, month, day] = date;
    let now = moment();
    let dateOfBirth = moment([year, month, day]);
    let differenceDate = now.diff(dateOfBirth, 'year');
    let age = Number(differenceDate);
    user.age = age;
    await user.save();
    return user;
  }

  async updateHeight(userId, height) {
    const user = await UserModel.findById(userId);
    user.height = Number(height);
    await user.save();
    return user;
  }

  async updateWeight(userId, weight) {
    const user = await UserModel.findById(userId);
    user.weight = Number(weight);
    await user.save();
    return user;
  }
}

module.exports = new UserService();
