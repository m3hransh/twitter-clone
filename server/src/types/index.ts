export { default as Mutation } from './Mutation';
export { default as Tweet } from './Tweet';
export { default as Query } from './Query';
export { default as User } from './User';
export { default as Profile } from './Profile';

import {
  objectType,
  inputObjectType,
  asNexusMethod,
  enumType,
} from 'nexus';
import { DateTimeResolver } from 'graphql-scalars';

export const DateTime = asNexusMethod(DateTimeResolver, 'date');

export const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
});

export const TweetOrderByUpdatedAtInput = inputObjectType({
  name: 'TweetOrderByUpdatedAtInput',
  definition(t) {
    t.nonNull.field('updatedAt', { type: 'SortOrder' });
  },
});

export const UserUniqueInput = inputObjectType({
  name: 'UserUniqueInput',
  definition(t) {
    t.int('id');
    t.string('email');
  },
});

export const TweetCreateInput = inputObjectType({
  name: 'TweetCreateInput',
  definition(t) {
    t.string('content');
  },
});

export const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('email');
    t.string('name');
    t.list.nonNull.field('tweets', { type: 'TweetCreateInput' });
  },
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token');
    t.field('user', { type: 'User' });
  },
});
