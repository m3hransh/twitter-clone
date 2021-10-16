import { FC } from 'react';
import AllTweets from '../components/AllTweets';
import Layout from '../components/Layout';
import Tweet from '../components/Tweet';

const Home: FC = () => {
  return (
    <Layout>
      <div className="text-xl font-bold p-4">Home</div>
      <div className="h-0 border-2 border-t-0 border-opacity-95 border-gray-200 bg-gray-900" />
      <Tweet />
      <div className="h-0 border-2 border-t-0 border-opacity-95 border-gray-200 bg-gray-900" />
      {/* Tweets */}
      <AllTweets />
    </Layout>
  );
};

export default Home;
