import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';

import {
  mutationWithClientMutationId,
} from 'graphql-relay';

import UserType from '../types/user';
import AccountKitType from '../types/accountKit';

import {
  authWithAccountKit,
} from '../../controllers/AuthController';


const AccountKitSendCodeMutation = mutationWithClientMutationId({
  name: 'AccountKitSendCode',
  inputFields: {
    code: {
      type: new GraphQLNonNull(GraphQLString),
    },
    csrf_nonce: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    me: {
      type: UserType,
      resolve(authedRes) {
        return authedRes.me;
      },
    },
    accountKit: {
      type: AccountKitType,
      resolve(authedRes) {
        return authedRes.accountKit;
      },
    },
    access_token: {
      type: GraphQLString,
      resolve(authedRes) {
        return authedRes.access_token;
      },
    },
    expires_in: {
      type: GraphQLInt,
      resolve(authedRes) {
        return authedRes.expires_in;
      },
    },
  },
  mutateAndGetPayload({ code, csrf_nonce }) {
    return authWithAccountKit(code, csrf_nonce);
  },
});

export default AccountKitSendCodeMutation;
