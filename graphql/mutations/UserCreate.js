import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';

import {
  connectionArgs,
  cursorForObjectInConnection,
  mutationWithClientMutationId,
  connectionFromPromisedArray,
} from 'graphql-relay';

import loaders from '../loaders';

import {
  UserEdge,
  UserConnection,
} from '../connections/user';

import {
  User,
} from '../../models';

function getCursor(dataList, item) {
  for (const i of dataList) {
    if (i.id === item.id) {
      return cursorForObjectInConnection(dataList, i);
    }
  }
  return null;
}

const UserCreateMutation = mutationWithClientMutationId({
  name: 'UserCreate',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    userName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    mobilePhone: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    level: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    address: {
      type: new GraphQLNonNull(GraphQLString),
    },
    district: {
      type: new GraphQLNonNull(GraphQLString),
    },
    province: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    userEdge: {
      type: UserEdge,
      resolve(user) {
        return loaders.users.load('allUsers')
        .then(users => ({
          cursor: getCursor(users, user),
          node: user,
        }));
      },
    },
    users: {
      type: UserConnection,
      args: {
        ...connectionArgs,
      },
      resolve() {
        return connectionFromPromisedArray;
      },
    },
  },
  mutateAndGetPayload(inputObj) {
    // Clear users load
    loaders.users.clear('allUsers');
    console.log(inputObj);
    return User.create(inputObj)
    .then(result => result);
  },
});

export default UserCreateMutation;
