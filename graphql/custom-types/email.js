import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { GraphQLError } from 'graphql/error';

const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
const min = 4;
const max = 254;

const EmailType = new GraphQLScalarType({
  name: 'EmailType',
  serialize: value => value,
  parseValue: value => value,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Query error: Can only parse strings got a: ${ast.kind}`, [ast]);
    }
    if (ast.value.length < min) {
      throw new GraphQLError(`Query error: minimum length of ${min} required: `, [ast]);
    }
    if (ast.value.length > max) {
      throw new GraphQLError(`Query error: maximum length is ${max}: `, [ast]);
    }
    if (!regex.test(ast.value)) {
      throw new GraphQLError(`Query error: Not a valid ${'Email'}: `, [ast]);
    }
    return ast.value;
  },
});

export default EmailType;
