import React, { FC } from 'react';
import { gql, useQuery } from '@apollo/client';
import { FaUser } from 'react-icons/fa';
import Loading from '../components/Loading';
import {
  differenceInDays,
  differenceInYears,
  format,
  formatDistanceToNow,
} from 'date-fns';

interface AllTweetsProps {
  className?: string;
  chidlren?: React.ReactNode;
}

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
const dateView = (date: string) => {
  let currentDate = new Date(date);
  if (differenceInDays(new Date(), currentDate) < 1)
    return formatDistanceToNow(currentDate);
  else if (differenceInYears(new Date(), currentDate) < 1)
    return format(currentDate, 'LLL d');
  else return format(currentDate, 'LLL d, y');
};
const AllTweets: FC<AllTweetsProps> = () => {
  const { loading, error, data } = useQuery<Feed>(FEED_QUERY);

  return (
    <div>
      <div className="flex flex-col">
        {loading ? (
          <Loading />
        ) : error ? (
          <p>{error.message}</p>
        ) : (
          data?.feed.map((tweet) => (
            <div className="border-b-2 border-opacity-95 border-gray-200 hover:bg-accent h-48">
              <div className="flex gap-2 p-3">
                <div className="flex-grow-0">
                  {tweet.author.profile && tweet.author.profile.avatar ? (
                    <img
                      src={tweet.author.profile.avatar}
                      className="w-14 rounded-full"
                      alt="avatar"
                    />
                  ) : (
                    <FaUser className="inline w-14 h-14 bg-gray-200 rounded-full" />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col">
                    <div className="">
                      <span className="font-bold">
                        {tweet.author.name}{' '}
                      </span>
                      <span className="text-gray-500 text-sm">
                        @{tweet.author.name}
                        {tweet.author.id}
                        {' . '}
                        {dateView(tweet.createdAt)}
                      </span>
                    </div>
                    <div>{tweet.content}</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllTweets;
