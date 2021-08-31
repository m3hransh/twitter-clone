import { gql, useQuery } from '@apollo/client';
import { FC } from 'react';
import { FaUser } from 'react-icons/fa';
// import { FaArrowLeft, FaLink, FaUser } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import Tweet from '../components/Tweet';

export const FEED_QUERY = gql`
  query Feed {
    feed {
      id
      content
      createdAt
      viewCount
      author {
        name
        id
        profile {
          avatar
        }
      }
    }
  }
`;

export interface Feed {
  feed: {
    id: number;
    content: string;
    createdAt: string;
    viewCount: number;
    author: {
      id: number;
      name: string;
      profile: {
        avatar: string;
      };
    };
  }[];
}

const Home: FC = () => {
  const { loading, error, data } = useQuery<Feed>(FEED_QUERY);
  const history = useHistory();
  if (loading) return <p>Loadding...</p>;
  if (error) return <h3>{error.message}</h3>;

  return (
    <Layout>
      <div className="text-xl font-bold p-4">Home</div>
      <div className="h-0 border-2 border-t-0 border-opacity-95 border-gray-200 bg-gray-900" />
      <Tweet />
      <div className="h-0 border-2 border-t-0 border-opacity-95 border-gray-200 bg-gray-900" />
      {/* Tweets */}
      <div className="flex flex-col">
        {data?.feed.map((tweet) => (
          <div className="border-b-2 border-opacity-95 border-gray-200 hover:bg-accent h-48">
            <div className="flex">
              <div className="flex-grow-0">
                {tweet.author.profile.avatar ? (
                  <img
                    src={tweet.author.profile.avatar}
                    className="w-14 rounded-full"
                    alt="avatar"
                  />
                ) : (
                  <FaUser className="inline w-14 h-14 bg-gray-200 rounded-full" />
                )}
              </div>
              <div className="flex-grow">{tweet.content}</div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
