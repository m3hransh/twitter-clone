import React, { FC } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';

interface TrendElement {
  category: string;
  name: string;
  tweetNumber: number;
}
const trendsItem: TrendElement[] = [
  {
    category: 'Business & finance',
    name: 'China',
    tweetNumber: 429,
  },
  {
    category: 'Business & finance',
    name: 'China',
    tweetNumber: 429,
  },
  {
    category: 'Business & finance',
    name: 'China',
    tweetNumber: 429,
  },
  {
    category: 'Business & finance',
    name: 'China',
    tweetNumber: 429,
  },
];
interface TrendsItemProps {
  className?: string;
  chidlren?: React.ReactNode;
  trendItem: TrendElement;
}
const TrendsItem: FC<TrendsItemProps> = ({ trendItem }) => {
  return (
    <div className="flex">
      <div className="flex flex-col">
        <div className="text-gray-500 text-sm">
          {trendItem.category} Trending
        </div>
        <div className="font-bold">{trendItem.name}</div>
        <div className="text-gray-500 text-sm">
          {trendItem.tweetNumber} Tweets
        </div>
      </div>
      <FaEllipsisH className="ml-auto" />
    </div>
  );
};

interface TrendsProps {
  className?: string;
  chidlren?: React.ReactNode;
}

const Trends: FC<TrendsProps> = () => {
  return (
    <div className="bg-accent rounded-2xl px-4 py-2 flex flex-col gap-4">
      <div className="flex items-center">
        <div className="text-xl font-bold">Trends for you</div>
        <IoSettingsOutline className="w-5 h-5 ml-auto mr-2" />
      </div>
      {trendsItem.map((item: TrendElement) => (
        <TrendsItem trendItem={item} />
      ))}
    </div>
  );
};

export default Trends;
