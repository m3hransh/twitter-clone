import { gql, useQuery } from '@apollo/client';
import { FC } from 'react';
import { FaArrowLeft, FaLink, FaUser } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import CreateProfile from '../components/CreateProfile';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import UpdateProfile from '../components/UpdateProfile';
import { IoPersonCircleOutline } from 'react-icons/io5';

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
  return (
    <Layout>
      {/* Profile Info */}
      {loading ? (
        <Loading />
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <div className="flex flex-col">
          {/* Profile head  */}
          <div className=" p-2 flex space-x-2 items-baseline">
            <div className="p-2 flex justify-center items-center rounded-full w-8 h-8 hover:bg-accent">
              <FaArrowLeft
                onClick={() => history.goBack()}
                className="text-opacity-80 "
              />
            </div>
            {/* NickName */}
            <h3 className="text-xl font-bold">{data?.me.name}</h3>
          </div>
          {/* Profile Body */}
          <div className="bg-accent h-48 w-full"></div>
          <div className="px-4">
            <div className="-mt-16">
              {data?.me.profile && data?.me.profile.avatar ? (
                <img
                  src={data.me.profile.avatar}
                  className="w-36 rounded-full"
                  alt="avatar"
                />
              ) : (
                <IoPersonCircleOutline className="inline w-36 h-36" />
              )}
            </div>
            {/* Make Profile */}
            <div className="felx">
              {data?.me.profile ? (
                <UpdateProfile
                  className="ml-auto bg-white block 
                rounded-3xl py-2 px-3 text-gray-800 border-2 
                border-opacity-90font-bold hover:bg-accent"
                />
              ) : (
                <CreateProfile
                  className="ml-auto bg-white block 
                rounded-3xl py-2 px-3 text-gray-800 border-2 
                border-opacity-90 font-bold hover:bg-accent"
                />
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
      )}
    </Layout>
  );
};

export default Profile;
