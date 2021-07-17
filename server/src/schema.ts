import { permissions } from './permissions';
import { applyMiddleware } from 'graphql-middleware';
import {
  Mutation,
  Post,
  Query,
  User,
  AuthPayload,
  UserCreateInput,
  UserUniqueInput,
  PostCreateInput,
  SortOrder,
  PostOrderByUpdatedAtInput,
  DateTime,
} from './types';
import { makeSchema } from 'nexus';

const schemaWithoutPermissions = makeSchema({
  types: [
    Query,
    Mutation,
    Post,
    User,
    AuthPayload,
    UserUniqueInput,
    UserCreateInput,
    PostCreateInput,
    SortOrder,
    PostOrderByUpdatedAtInput,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});

export const schema = applyMiddleware(
  schemaWithoutPermissions,
  permissions,
);
