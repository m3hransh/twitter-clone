export { default as Mutation } from './Mutation';
export { default as Post } from './Post';
export { default as Query } from './Query';
export { default as User } from './User';

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

export const PostOrderByUpdatedAtInput = inputObjectType({
  name: 'PostOrderByUpdatedAtInput',
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

export const PostCreateInput = inputObjectType({
  name: 'PostCreateInput',
  definition(t) {
    t.nonNull.string('title');
    t.string('content');
  },
});

export const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('email');
    t.string('name');
    t.list.nonNull.field('posts', { type: 'PostCreateInput' });
  },
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token');
    t.field('user', { type: 'User' });
  },
});
