import { FC } from 'react';
import {
  FaBell,
  FaEllipsisH,
  FaEnvelope,
  FaHome,
  FaUser,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import favicon from '../assets/twitter-logo.png';
import Logout from './Logout';
import Tweet from './Tweet';

const LeftNav: FC = () => {
  return (
    <div className="ml-auto flex h-screen flex-col pt-4 lg:text-lg ">
      <div className="flex flex-col space-y-4 items-start">
        <Link to="/users">
          <img src={favicon} alt="logo" className="w-10 h-10" />
        </Link>
        <Link to="/users" className="rounded-3xl p-2 hover:bg-accent">
          <h2>
            <FaHome className="inline mr-3" />
            <span>Home</span>
          </h2>
        </Link>
        <Link to="/profile" className="rounded-3xl p-2 hover:bg-accent">
          <h2>
            <FaUser className="inline mr-3" />
            <span>Profile</span>
          </h2>
        </Link>
        <Link to="/users" className="rounded-3xl p-2 hover:bg-accent">
          <h2>
            <FaEnvelope className="inline mr-3" />
            <span>Messages</span>
          </h2>
        </Link>
        <Link to="/users" className="rounded-3xl p-2 hover:bg-accent">
          <h2>
            <FaBell className="inline mr-3" />
            <span>Notifications</span>
          </h2>
        </Link>
        <Link to="/users" className="rounded-3xl p-2 hover:bg-accent">
          <h2>
            <FaEllipsisH className="inline mr-3" />
            <span>More</span>
          </h2>
        </Link>
      </div>
      <Tweet
        className="bg-primary mt-4 border-2 border-primary rounded-3xl 
      py-2 w-4/5 text-secondary text-lg font-bold hover:bg-secondary 
      hover:text-primary"
      />
      <Logout className="mt-auto mb-4" />
    </div>
  );
};
export default LeftNav;
