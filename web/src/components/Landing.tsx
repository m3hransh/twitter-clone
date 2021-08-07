import { FC } from 'react';
import { FaSearch, FaComment, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import TwitterLogo from '../assets/twitter-logo.png';
const Landing: FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-center h-full">
        {/* left */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-primary text-secondary">
          {/* items-wraper */}
          <div className=" flex flex-col space-y-5 w-3/5">
            <div>
              <FaSearch className="inline mr-3" />
              <span>Follow your interests</span>
            </div>
            <div>
              <FaUser className="inline mr-3" />
              <span>Hear what people are talking about.</span>
            </div>
            <div>
              <FaComment className="inline mr-3" />
              <span>Join the conversation</span>
            </div>
          </div>
        </div>
        {/* center */}
        <div className="w-1/2 flex flex-col items-center justify-center">
          <div className="w-3/5">
            <img src={TwitterLogo} alt="logo" className="w-12" />
            <h1 className="text-xl font-bold my-4">
              See what's happening in
              <br />
              the world right now
            </h1>
            <span> Join twitter Today</span>
            <div className="flex flex-col mt-3 space-y-4">
              <Link
                className="text-center bg-primary rounded-3xl p-2  border-secondary text-secondary border font-bold"
                to="/signup"
              >
                Sign up
              </Link>

              <Link
                className="text-center rounded-3xl p-2 text-primary border-primary border font-bold"
                to="/login"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
