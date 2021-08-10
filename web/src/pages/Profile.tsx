import { gql, useQuery } from '@apollo/client';
import { FC } from 'react';
import CreateProfile from '../components/CreateProfile';
import UpdateProfile from '../components/UpdateProfile';

export const ME_QUERY = gql`
  query me {
    me {
      id
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
  const { loading, error, data } = useQuery<Me>(ME_QUERY);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h3>{error.message}</h3>;
  return (
    <div className=" max-w-2xl flex flex-col items-center  mt-16">
      <h1>Profile</h1>
      {data?.me.profile.id ? <UpdateProfile /> : <CreateProfile />}
      <p>{data?.me.profile.bio}</p>
      <p>{data?.me.profile.location}</p>
      <p>{data?.me.profile.website}</p>
    </div>
  );
};

export default Profile;
