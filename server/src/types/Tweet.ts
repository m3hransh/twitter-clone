import { objectType } from 'nexus';
import { Context } from '../context';

const Tweet = objectType({
  name: 'Tweet',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.field('createdAt', { type: 'DateTime' });
    t.nonNull.string('content');
    t.nonNull.int('viewCount');
    t.field('author', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.tweet
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author();
      },
    });
  },
});

export default Tweet;
