import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';

import {
  nodeField,
} from './relay/RelayNode';
import UserQueries from './queries/User';

import UserCreateMutation from './mutations/UserCreate';
import AccountKitSendCodeMutation from './mutations/AccountKitSendCode';

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: {
    node: nodeField,
    users: UserQueries,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: UserCreateMutation,
    AccountKitSendCode: AccountKitSendCodeMutation,
  },
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default Schema;
