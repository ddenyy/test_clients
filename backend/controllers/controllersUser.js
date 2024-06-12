const { NODE_ENV, JWT_SECRET = 'dev-key' } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { developJwt } = require('../utils/config');
const {
  USER_NOT_FOUND,
  INVALID_DATA_CREATE_USER,
  EMAIL_ALREADY_EXISTS,
  INVALID_PAS_OR_EMAIL,
} = require('../utils/constants');
const { default: mongoose } = require('mongoose');


module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch(err) {
    next(err);
  }
}

module.exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    user.remove();
    res.send(200);
  } catch(err) {
    next(err);
  }
}

module.exports.getCyclesFrindsUser = (req, res, next) => {
  const { userId } = req.body
  try {
    const user = User.findById(userId);
    const maxInt = 1e5
    const used = new Set()
    const answer = []

    function dfs(v, p=undefined) {
      if (used.has(v)) {
        console.log("has cycle");
        return v
      }
      used.add(v);
      user.arrayFriends.forEach(u => {
        if (u._id !== p._id) {
          let k = dfs(u, v);
          if (k !== undefined) {
            answer.push(v)
            if (k._id == v._id) {
              return undefined
            }
            return k
          }
        }
      });
    }
    dfs(user)
    res.send(answer);
  } catch(err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError(INVALID_DATA_CREATE_USER));
    }
    if (err.code === 11000) {
      return next(new ConflictError(EMAIL_ALREADY_EXISTS));
    }
    return next(err);
  }
}

module.exports.createUser = (req, res, next) => {
  const {
    name,
    surname,
    patronymic,
    email,
    password,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      surname,
      patronymic,
      email,
      password: hash,
    }))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INVALID_DATA_CREATE_USER));
      }
      if (err.code === 11000) {
        return next(new ConflictError(EMAIL_ALREADY_EXISTS));
      }
      return next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.updateUserData = (req, res, next) => {
  const id = req.params.id;
  const { name, surname, email, patronymic } = req.body;
  User.findByIdAndUpdate(id, { name, surname, email, patronymic }, { runValidators: false, new: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(USER_NOT_FOUND));
      } else if (err.code === 11000) {
        next(new ConflictError(EMAIL_ALREADY_EXISTS));
      } else {
        next(err);
      }
    });
};

module.exports.addFriendToUser = async (req, res, next) => {
  const {user_id, friend_id} = req.params;
  
  try {
    const currentUser = await User.findById(user_id);
    const friend = await User.findById(friend_id);
    currentUser.arrayFriends = currentUser.arrayFriends.filter((item) => item._id !== friend_id);
    currentUser.arrayFriends.push(friend);
    currentUser.save();
    res.send(currentUser)
  } catch(err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(USER_NOT_FOUND));
    } else if (err.code === 11000) {
      next(new ConflictError(EMAIL_ALREADY_EXISTS));
    } else {
      next(err);
    }
  }
}

module.exports.deleteFriendToUser = async (req, res, next) => {
  const {user_id, friend_id} = req.params;
  try {
    const currentUser = await User.findById(user_id);
    currentUser.arrayFriends = currentUser.arrayFriends.filter((item) => item._id !== friend_id);
    currentUser.save();
    res.send(currentUser)
  } catch(err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(USER_NOT_FOUND));
    } else if (err.code === 11000) {
      next(new ConflictError(EMAIL_ALREADY_EXISTS));
    } else {
      next(err);
    }
  }
}


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : developJwt, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => next(new UnauthorizedError(INVALID_PAS_OR_EMAIL)));
};