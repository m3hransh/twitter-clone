import { gql, useMutation } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { FC } from 'react';
import { useState } from 'react';
import { ME_QUERY } from '../pages/Profile';
import Modal from './Modal';
import * as Yup from 'yup';

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
}

interface TweetValues {
  content: string;
}

const Tweet: FC<TweetProps> = ({ className }) => {
  const [createTweet] = useMutation(CREATE_TWEET_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
  });

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const initialValues: TweetValues = {
    content: '',
  };

  const validationSchema = Yup.object({
    content: Yup.string()
      .required()
      .min(1, 'Must be more than 1 character')
      .max(256, 'Must be less than 256 characters'),
  });
  return (
    <>
      <button className={className} onClick={openModal}>
        Tweet
      </button>
      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values: TweetValues, { setSubmitting }) => {
            setSubmitting(true);
            await createTweet({
              variables: values,
            });
            setSubmitting(false);
            closeModal();
          }}
        >
          <Form className="w-full flex flex-col items-baseline space-y-5 mt-3">
            <Field
              name="content"
              type="text"
              as="textarea"
              placeholder="What's happening?"
              className="border-0 w-full"
            />
            <ErrorMessage name="content" component={'div'} />
            <button
              className="bg-primary rounded-3xl p-2 px-5 text-secondary 
              font-bold ml-auto"
              type="submit"
            >
              Tweet
            </button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default Tweet;
