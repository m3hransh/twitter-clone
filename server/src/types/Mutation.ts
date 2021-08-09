import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { objectType, stringArg, nonNull, arg, intArg } from 'nexus';
import { Context } from '../context';
import { APP_SECRET, getUserId } from '../utils';

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        const hashedPassword = await hash(args.password, 10);
        const user = await context.prisma.user.create({
          data: {
            name: args.name,
            email: args.email,
            password: hashedPassword,
          },
        });
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        };
      },
    });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { email, password }, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error(`No user found for email: ${email}`);
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new Error('Invalid password');
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        };
      },
    });

    t.field('createProfile', {
      type: 'Profile',
      args: {
        data: nonNull(
          arg({
            type: 'ProfileCreateInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        const userId = getUserId(context);
        if (!userId) throw new Error('Could not authenticate user.');
        return context.prisma.profile.create({
          data: {
            bio: args.data.bio,
            location: args.data.location,
            website: args.data.website,
            avatar: args.data.avatar,
            user: { connect: { id: Number(userId) } },
          },
        });
      },
    });

    t.field('updateProfile', {
      type: 'Profile',
      args: {
        data: nonNull(
          arg({
            type: 'ProfileUpdateInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        const userId = getUserId(context);
        if (!userId) throw new Error('Could not authenticate user.');
        const { id, ...data } = args.data;
        return context.prisma.profile.update({
          data: {
            ...data,
          },
          where: {
            id: Number(id),
          },
        });
      },
    });

    // t.field('togglePublishPost', {
    //   type: 'Post',
    //   args: {
    //     id: nonNull(intArg()),
    //   },
    //   resolve: async (_, args, context: Context) => {
    //     try {
    //       const post = await context.prisma.post.findUnique({
    //         where: { id: args.id || undefined },
    //         select: {
    //           published: true,
    //         },
    //       });
    //       return context.prisma.post.update({
    //         where: { id: args.id || undefined },
    //         data: { published: !post?.published },
    //       });
    //     } catch (e) {
    //       throw new Error(
    //         `Post with ID ${args.id} does not exist in the database.`,
    //       );
    //     }
    //   },
    // });

    // t.field('incrementPostViewCount', {
    //   type: 'Post',
    //   args: {
    //     id: nonNull(intArg()),
    //   },
    //   resolve: (_, args, context: Context) => {
    //     return context.prisma.post.update({
    //       where: { id: args.id || undefined },
    //       data: {
    //         viewCount: {
    //           increment: 1,
    //         },
    //       },
    //     });
    //   },
    // });

    // t.field('deletePost', {
    //   type: 'Post',
    //   args: {
    //     id: nonNull(intArg()),
    //   },
    //   resolve: (_, args, context: Context) => {
    //     return context.prisma.post.delete({
    //       where: { id: args.id },
    //     });
    //   },
    // });
  },
});

export default Mutation;
