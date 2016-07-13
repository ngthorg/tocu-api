/* eslint new-cap: 0, no-shadow: 0, no-param-reassign: 0, max-len:0 */

import bcrypt from 'bcrypt';
import {
  parallel,
} from 'async';

import {
  randomAvatar,
} from '../services';

export default function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
    },
    userName: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [0, 60],
          msg: 'Please don\'t input too long',
        },
      },
    },
    password: {
      type: DataTypes.STRING(255),
    },
    mobilePhone: {
      type: DataTypes.STRING(20),
      unique: true,
      validate: {
        is: {
          args: /^(091|094|0123|0125|0127|0129|090|093|0122|0126|0128|0121|0120|098|097|096|0169|0168|0167|0166|0165|0164|0163|0162|092|0186|0188|0199|099|095)\d{7}$/,
          msg: 'Số điện thoại không đúng định dạng',
        },
      },
    },
    isVerifyMobilePhone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    isVerifyEmail: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    avatarUrl: {
      type: DataTypes.STRING(1000),
    },
    level: {
      type: DataTypes.INTEGER,
    },
    address: DataTypes.STRING(1000),
    district: DataTypes.STRING,
    province: DataTypes.STRING,
    facebookId: {
      type: DataTypes.STRING,
    },
    facebookProfile: {
      type: DataTypes.JSONB,
    },
    note: {
      type: DataTypes.TEXT,
    },
  }, {
    classMethods: {
      associate() {
        // User.belongsTo(models.Customer);
        // User.belongsTo(models.FacebookProfile);
      },
    },
    hooks: {
      beforeCreate(user, options, callback) {
        return parallel({
          hashPassword(cb) {
            return bcrypt.genSalt(10, (err, salt) => {
              if (err) {
                return cb(err);
              }

              return bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                  cb(err);
                }

                cb(null, hash);
              });
            });
          },
          randomAvatar(cb) {
            const avatarUrl = user.avatarUrl ? user.avatarUrl : randomAvatar();
            cb(null, avatarUrl);
          },
        }, (err, results) => {
          if (err) {
            // console.error(err);
          }

          user.password = results.hashPassword;
          user.avatarUrl = results.randomAvatar;

          return callback(null, user);
        });
      },
      beforeUpdate(user, options, callback) {
        user.updatedAt = sequelize.fn('now');

        return callback(null, user);
      },
    },
  });

  return User;
}
