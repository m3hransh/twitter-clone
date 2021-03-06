import { FC, useState } from 'react';
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
import Modal from './Modal';
import Tweet from './Tweet';

const LeftNav: FC = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="ml-auto flex h-screen flex-col pt-4 p-2 lg:text-lg ">
      <div className="flex flex-col space-y-4 items-center lg:items-start">
        <Link to="/users">
          <img src={favicon} alt="logo" className="w-10 h-10" />
        </Link>
        <Link to="/" className="rounded-3xl p-2 hover:bg-accent">
          <h2>
            <FaHome className="inline mr-3" />
            <span className="hidden lg:inline-block">Home</span>
          </h2>
        </Link>
        <Link to="/profile" className="rounded-3xl p-2 hover:bg-accent">
          <h2>
            <FaUser className="inline mr-3" />
            <span className="hidden lg:inline-block">Profile</span>
          </h2>
        </Link>
        <Link to="#" className="rounded-3xl p-2 hover:bg-accent">
          <h2>
            <FaEnvelope className="inline mr-3" />
            <span className="hidden lg:inline-block">Messages</span>
          </h2>
        </Link>
        <Link to="#" className="rounded-3xl p-2 hover:bg-accent">
          <h2>
            <FaBell className="inline mr-3" />
            <span className="hidden lg:inline-block">Notifications</span>
          </h2>
        </Link>
        <Link to="/users" className="rounded-3xl p-2 hover:bg-accent">
          <h2>
            <FaEllipsisH className="inline mr-3" />
            <span className="hidden lg:inline-block">More</span>
          </h2>
        </Link>
      </div>
      <button
        className="bg-primary mt-4 border-0 border-primary rounded-3xl 
      py-2 w-11/12 text-white text-lg font-bold hover:bg-secondary
      hidden lg:block 
      "
        onClick={openModal}
      >
        Tweet
      </button>
      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
        <Tweet onTweet={closeModal} />
      </Modal>
      <Logout className="mt-auto mb-4" />
    </div>
  );
};
export default LeftNav;
