import { gql, useMutation, useQuery } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { FC } from 'react';
import { ME_QUERY } from '../pages/Profile';
import * as Yup from 'yup';
import { FaUser } from 'react-icons/fa';
import Loading from './Loading';
import { FEED_QUERY } from './AllTweets';

const CREATE_TWEET_MUTATION = gql`
  mutation createTweet($content: String) {
    createTweet(data: { content: $content }) {
      id
    }
  }
`;

interface TweetProps {
  className?: string;
  chidlren?: React.ReactNode;
  onTweet?: () => void;
  user?: {
    id: number;
    name: string;
    profile: {
      avatar: string;
    };
  };
}

interface TweetValues {
  content: string;
}

const Tweet: FC<TweetProps> = ({ onTweet, user }) => {
  const { loading, error, data } = useQuery(ME_QUERY);

  const [createTweet] = useMutation(CREATE_TWEET_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }, { query: FEED_QUERY }],
  });

  const initialValues: TweetValues = {
    content: '',
  };
  if (loading) return <Loading />;
  if (error) return <h3>{error.message}</h3>;

  const validationSchema = Yup.object({
    content: Yup.string()
      .min(1, 'Must be more than 1 character')
      .max(256, 'Must be less than 256 characters'),
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values: TweetValues, { setSubmitting }) => {
          setSubmitting(true);
          await createTweet({
            variables: values,
          });
          setSubmitting(false);
          if (onTweet) onTweet();
        }}
      >
        <Form className="w-full flex flex-col p-4 space-y-5 mt-3">
          <div className="flex">
            <div className="flex-grow-0">
              {data.me.profile && data.me.profile.avatar ? (
                <img
                  src={data.me.profile.avatar}
                  className="w-14 rounded-full"
                  alt="avatar"
                />
              ) : (
                <FaUser className="inline w-14 h-14 bg-gray-200 rounded-full" />
              )}
            </div>

            <Field
              name="content"
              type="text"
              as="textarea"
              placeholder="What's happening?"
              className="border-0 h-20 flex-grow focus:outline-none"
            />
          </div>
          <div className="flex">
            <ErrorMessage name="content">
              {(msg) => <div className="text-red-500 ml-20">{msg}</div>}
            </ErrorMessage>
            <button
              className="bg-primary rounded-3xl p-2 px-5 text-white 
              font-bold ml-auto hover:bg-secondary"
              type="submit"
            >
              Tweet
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Tweet;
