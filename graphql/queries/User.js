import {
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionFromPromisedArray,
}
from 'graphql-relay';

import redis from 'redis';

import {
  UserConnection,
} from '../connections/user';

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.log(`Error ${err}`);
});

// import EmailType from '../custom-types/email';

// import loaders from '../loaders';


function isAuthenticatedPromise(accessToken) {
  return new Promise((resolve, reject) => {
    if (!accessToken) return reject(new Error('Không có accessToken'));

    return redisClient.get(accessToken, (err, reply) => {
      if (err) return reject(err);
      else if (!reply) return reject(new Error('Không tồn tại nhé'));

      return resolve(null, JSON.parse(reply));
    });
  });
}

export default {
  type: UserConnection,
  args: {
    userName: {
      type: GraphQLString,
    },
    mobilePhone: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    ...connectionArgs,
  },
  async resolve(_, args, { loaders }) {
    const checkAccessToken = await isAuthenticatedPromise(_.access_token);
    console.log(checkAccessToken);

    let loaderKey;
    if (args.email || args.mobilePhone || args.userName) {
      loaderKey = {};

      const argObj = {
        email: args.email,
        mobilePhone: args.mobilePhone,
        userName: args.userName,
      };

      // Loại bỏ các props rỗng
      Object.keys(argObj).forEach(key => {
        if (typeof argObj[key] !== 'undefined' && argObj[key] !== null) {
          loaderKey[key] = argObj[key];
        }
      });

      loaderKey = JSON.stringify(loaderKey);
    } else {
      loaderKey = 'allUsers';
    }

    return connectionFromPromisedArray(loaders.users.load(loaderKey), args);
  },
};
