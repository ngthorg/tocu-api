import {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

import {
  globalIdField,
} from 'graphql-relay';

import {
  nodeInterface,
} from '../relay/RelayNode';
import RelayRegistry from '../relay/RelayRegistry';

import EmailType from '../custom-types/email';

// Resolver
export function userResolver(_, { id }, { loaders }) {
  return loaders.user.load(id);
}

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields: {
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      description: 'Full name of User',
      resolve(user) {
        return user.name;
      },
    },
    userName: {
      type: GraphQLString,
      resolve(user) {
        return user.userName;
      },
    },
    mobilePhone: {
      type: GraphQLString,
      resolve(user) {
        return user.mobilePhone;
      },
    },
    isVerifyMobilePhone: {
      type: GraphQLBoolean,
      resolve(user) {
        return user.isVerifyMobilePhone;
      },
    },
    email: {
      type: EmailType,
      resolve(user) {
        return user.email;
      },
    },
    isVerifyEmail: {
      type: GraphQLBoolean,
      resolve(user) {
        return user.isVerifyEmail;
      },
    },
    avatarUrl: {
      type: GraphQLString,
      resolve(user) {
        return user.avatarUrl;
      },
    },
    level: {
      type: GraphQLInt,
      resolve(user) {
        return user.level;
      },
    },
    address: {
      type: GraphQLString,
      resolve(user) {
        return user.address;
      },
    },
    district: {
      type: GraphQLString,
      resolve(user) {
        return user.district;
      },
    },
    province: {
      type: GraphQLString,
      resolve(user) {
        return user.province;
      },
    },
    facebookId: {
      type: GraphQLString,
      resolve(user) {
        return user.facebookId;
      },
    },
    facebookProfile: {
      type: GraphQLString,
      resolve(user) {
        return user.facebookProfile;
      },
    },
    note: {
      type: GraphQLString,
      resolve(user) {
        return user.note;
      },
    },
  },
  interfaces: [nodeInterface],
});

RelayRegistry.registerResolverForType(UserType, userResolver);
export default RelayRegistry.registerNodeType(UserType);
