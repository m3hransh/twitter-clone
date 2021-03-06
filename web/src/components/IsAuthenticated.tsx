import { FC } from 'react';
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect } from 'react-router';
import Loading from './Loading';

const IS_LOGGED_IN = gql`
  {
    me {
      id
    }
  }
`;

const IsAuthenticated: FC = ({ children }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <Loading />;
  if (error || !data.me) return <Redirect to={{ pathname: '/landing' }} />;

  return <>{children}</>;
};

export default IsAuthenticated;
