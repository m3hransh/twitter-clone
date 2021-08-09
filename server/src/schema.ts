import { permissions } from './permissions';
import { applyMiddleware } from 'graphql-middleware';
import {
  Mutation,
  Tweet,
  Query,
  Profile,
  User,
  AuthPayload,
  UserCreateInput,
  UserUniqueInput,
  ProfileCreateInput,
  ProfileUpdateInput,
  TweetCreateInput,
  SortOrder,
  TweetOrderByUpdatedAtInput,
  DateTime,
} from './types';
import { makeSchema } from 'nexus';

const schemaWithoutPermissions = makeSchema({
  types: [
    Query,
    Mutation,
    Tweet,
    User,
    Profile,
    AuthPayload,
    UserUniqueInput,
    UserCreateInput,
    ProfileCreateInput,
    ProfileUpdateInput,
    TweetCreateInput,
    SortOrder,
    TweetOrderByUpdatedAtInput,
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
