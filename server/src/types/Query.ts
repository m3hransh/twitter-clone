import { objectType, intArg, stringArg, arg, nonNull } from 'nexus';
import { Context } from '../context';
import { getUserId } from '../utils';

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allUsers', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany();
      },
    });

    t.nullable.field('me', {
      type: 'User',
      resolve: (parent, args, context: Context) => {
        const userId = getUserId(context);
        return context.prisma.user.findUnique({
          where: {
            id: Number(userId),
          },
        });
      },
    });

    t.nullable.field('tweetById', {
      type: 'Tweet',
      args: {
        id: intArg(),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.tweet.findUnique({
          where: { id: args.id || undefined },
        });
      },
    });

    // t.nonNull.list.nonNull.field('feed', {
    //   type: 'tweet',
    //   args: {
    //     searchString: stringArg(),
    //     skip: intArg(),
    //     take: intArg(),
    //     orderBy: arg({
    //       type: 'PostOrderByUpdatedAtInput',
    //     }),
    //   },
    //   resolve: (_parent, args, context: Context) => {
    //     const or = args.searchString
    //       ? {
    //           OR: [
    //             { content: { contains: args.searchString } },
    //           ],
    //         }
    //       : {};

    //     return context.prisma.post.findMany({
    //       where: {
    //         content: {contains: args.searchString}
    //       },
    //       take: args.take || undefined,
    //       skip: args.skip || undefined,
    //       orderBy: args.orderBy || undefined,
    //     });
    //   },
    // });
  },
});

export default Query;
