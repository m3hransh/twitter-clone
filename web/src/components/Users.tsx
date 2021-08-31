import { useQuery, gql } from '@apollo/client';
import { FC } from 'react';
import Loading from './Loading';

const USERS_QUERY = gql`
  query Query {
    allUsers {
      id
      name
    }
  }
`;
interface AllUsers {
  allUsers: {
    id: string;
    name: string;
  }[];
}

const Users: FC = () => {
  const { loading, error, data } = useQuery<AllUsers>(USERS_QUERY);
  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  return (
    <div>
      {data.allUsers.map((user) => (
        <p>{user.name}</p>
      ))}
    </div>
  );
};

export default Users;
