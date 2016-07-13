import {
  GraphQLString,
  GraphQLObjectType,
}
from 'graphql';

const AccountKitPhoneType = new GraphQLObjectType({
  name: 'AccountKitPhone',
  fields: {
    number: {
      type: GraphQLString,
    },
    country_prefix: {
      type: GraphQLString,
    },
    national_number: {
      type: GraphQLString,
    },
  },
});


const AccountKitType = new GraphQLObjectType({
  name: 'AccountKit',
  description: 'AccountKit response info',
  fields: {
    id: {
      type: GraphQLString,
    },
    phone: {
      type: AccountKitPhoneType,
    },
    email: {
      type: GraphQLString,
    },
  },
});


export default AccountKitType;
