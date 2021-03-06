import { gql, useMutation, useQuery } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ChangeEvent, useRef } from 'react';
import { FC, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Me, ME_QUERY } from '../pages/Profile';
import Modal from './Modal';

const UPDATE_PROFILE_MUTATION = gql`
  mutation updateProfile(
    $id: Int!
    $bio: String
    $location: String
    $website: String
    $avatar: String
  ) {
    updateProfile(
      data: {
        id: $id
        bio: $bio
        location: $location
        website: $website
        avatar: $avatar
      }
    ) {
      id
    }
  }
`;

interface ProfileValues {
  id: number;
  bio: string;
  location: string;
  website: string;
  avatar: string;
}
interface Props {
  className?: string;
  chidlren?: React.ReactNode;
}

const UpdateProfile: FC<Props> = ({ className }) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const { loading, error, data } = useQuery<Me>(ME_QUERY);
  const [updateProfile] = useMutation<any, ProfileValues>(
    UPDATE_PROFILE_MUTATION,
    {
      refetchQueries: [{ query: ME_QUERY }],
    },
  );
  const [modalIsOpen, setIsOpen] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const initialValues: ProfileValues = {
    id: data!.me.profile.id,
    bio: data!.me.profile.bio,
    location: data!.me.profile.location,
    website: data!.me.profile.website,
    avatar: data!.me.profile.avatar,
  };
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const data = new FormData();
    if (files) {
      data.append('file', files[0]);
      data.append('upload_preset', 'twitter');
      setImageLoading(true);
      const res = await fetch(
        process.env.REACT_APP_CLOUDINARY_ENDPOINT as string,
        {
          method: 'POST',
          body: data,
        },
      );
      const file = await res.json();
      setImage(file.secure_url);
      setImageLoading(false);
    }
  };

  return (
    <>
      <button className={className} onClick={openModal}>
        Edit profile
      </button>
      <Modal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        title="Edit Profile"
      >
        <input
          type="file"
          name="file"
          placeholder="upload file"
          onChange={uploadImage}
          ref={inputFile}
          className="hidden"
        />
        {imageLoading ? (
          <h3>Loadding...</h3>
        ) : (
          <>
            {image ? (
              <span onClick={() => inputFile.current?.click()}>
                <img
                  src={image}
                  className="w-36 rounded-full"
                  alt="avatar"
                />
              </span>
            ) : data?.me.profile.avatar ? (
              <span onClick={() => inputFile.current?.click()}>
                <img
                  src={data.me.profile.avatar}
                  className="w-36 rounded-full"
                  alt="avatar"
                />
              </span>
            ) : (
              <FaUser
                onClick={() => inputFile.current?.click()}
                className="inline w-14 h-14"
              />
            )}
          </>
        )}
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={async (values: ProfileValues, { setSubmitting }) => {
            setSubmitting(true);
            await updateProfile({
              variables: { ...values, avatar: image },
            });
            setSubmitting(false);
            closeModal();
          }}
        >
          <Form className="w-full flex flex-col space-y-5 mt-3">
            <Field
              name="bio"
              type="text"
              as="textarea"
              placeholder="Bio"
            />
            <ErrorMessage name="bio" component={'div'} />
            <Field
              name="location"
              type="loaction"
              placeholder="Location"
            />
            <ErrorMessage name="location" component={'div'} />
            <Field name="website" type="website" placeholder="Website" />
            <ErrorMessage name="website" component={'div'} />
            <button
              className="bg-primary rounded-3xl p-2 text-white font-bold"
              type="submit"
            >
              Update Profile
            </button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default UpdateProfile;
