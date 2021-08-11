import { gql, useQuery } from '@apollo/client';
import { FC } from 'react';
import { FaArrowLeft, FaLink, FaUser } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import CreateProfile from '../components/CreateProfile';
import LeftNav from '../components/LeftNav';
import UpdateProfile from '../components/UpdateProfile';

export const ME_QUERY = gql`
  query me {
    me {
      id
      name
      profile {
        id
        bio
        location
        website
        avatar
      }
    }
  }
`;

export interface Me {
  me: {
    id: number;
    name: string;
    profile: {
      id: number;
      bio: string;
      location: string;
      website: string;
      avatar: string;
    };
  };
}

const Profile: FC = () => {
  const history = useHistory();
  const { loading, error, data } = useQuery<Me>(ME_QUERY);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h3>{error.message}</h3>;
  return (
    <div className="flex flex-col md:grid sm:grid-cols-layout">
      {/* Left */}
      <div className="sticky">
        <LeftNav />
      </div>
      {/* Profile */}
      <div className="sm:border-r-2 sm:border-l-2 border-b-8">
        {/* Profile Info */}
        <div>
          {/* Profile head  */}
          <div className=" p-2 flex space-x-2 items-baseline">
            <FaArrowLeft
              onClick={() => history.goBack()}
              className="inline text-primary"
            />
            {/* NickName */}
            <h3 className="text-xl font-bold">{data?.me.name}</h3>
          </div>
          {/* Profile Body */}
          <div className="px-4">
            <div className="mt-5">
              {data?.me.profile.avatar ? (
                <img
                  src={data.me.profile.avatar}
                  className="w-36 rounded-full"
                  alt="avatar"
                />
              ) : (
                <FaUser className="inline w-14 h-14" />
              )}
            </div>
            {/* Make Profile */}
            <div className="felx">
              {data?.me.profile ? (
                <UpdateProfile className="ml-auto" />
              ) : (
                <CreateProfile className="ml-auto" />
              )}
            </div>
            <h3 className="text-xl font-bold">{data?.me.name}</h3>
            {data?.me.profile ? (
              <p className="mt-3 space-x-2">
                <FaLink className="inline" />
                <Link
                  to={{ pathname: `http://${data.me.profile.website}` }}
                  target="_blank"
                >
                  {data.me.profile.website}
                </Link>
              </p>
            ) : null}
            {/* Followers  */}
            <div className="flex mt-3 space-x-3">
              <p>200 following</p>
              <p>200 followers</p>
            </div>
          </div>
        </div>
      </div>
      {/* right */}
      <div>Right</div>
    </div>
  );
};

export default Profile;
