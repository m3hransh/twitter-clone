import React, { FC } from 'react';
import { gql, useQuery } from '@apollo/client';
import { FaUser } from 'react-icons/fa';
import Loading from '../components/Loading';
import { FaEllipsisH } from 'react-icons/fa';
import {
  IoHeartOutline,
  IoRepeat,
  IoChatboxOutline,
  IoShareOutline,
} from 'react-icons/io5';
import {
  differenceInDays,
  differenceInYears,
  format,
  formatDistanceToNowStrict,
} from 'date-fns';

interface AllTweetsProps {
  className?: string;
  chidlren?: React.ReactNode;
}

export const FEED_QUERY = gql`
  query Feed {
    feed(orderBy: { updatedAt: desc }) {
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
    return formatDistanceToNowStrict(currentDate);
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
            <div
              key={tweet.id}
              className="border-b-2 border-opacity-95 border-gray-200 hover:bg-accent"
            >
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
                    <div className="flex items-center">
                      <span className="font-bold mr-1">
                        {tweet.author.name}{' '}
                      </span>
                      <span className="text-gray-500 text-sm">
                        @{tweet.author.name}
                        {tweet.author.id}
                        {' . '}
                        {dateView(tweet.createdAt)}
                      </span>
                      <FaEllipsisH className="ml-auto text-gray-500 text-sm" />
                    </div>
                    <div>{tweet.content}</div>
                    <div className="flex justify-between text-gray-600 pt-3 mt-auto mr-10 text-xl">
                      <IoChatboxOutline />
                      <IoRepeat />
                      <IoHeartOutline />
                      <IoShareOutline />
                    </div>
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
