import { gql, useMutation } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { ME_QUERY } from '../pages/Profile';

const CREATE_PROFILE_MUTATION = gql`
  mutation createProfile(
    $bio: String
    $location: String
    $website: String
    $avatar: String
  ) {
    createProfile(
      data: {
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
  bio: string;
  location: string;
  website: string;
  avatar: string;
}
interface Props {
  className?: string;
  children?: React.ReactNode;
}
const CreateProfile: FC<Props> = ({ className }) => {
  const [createProfile] = useMutation<any, ProfileValues>(
    CREATE_PROFILE_MUTATION,
    {
      refetchQueries: [{ query: ME_QUERY }],
    },
  );
  const [modalIsOpen, setIsOpen] = useState(false);

  const initialValues: ProfileValues = {
    bio: '',
    location: '',
    website: '',
    avatar: '',
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button className={className} onClick={openModal}>
        Create Profile
      </button>
      {modalIsOpen ? (
        <>
          <div
            className="justify-center items-center flex 
            overflow-x-hidden overflow-y-auto fixed 
            inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-3/4 my-6 mx-auto max-w-sm">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg 
                relative flex flex-col w-full bg-white 
                outline-none focus:outline-none"
              >
                {/*header*/}
                <div
                  className="flex items-start justify-between 
                  p-2 border-b border-solid border-blueGray-200 
                  rounded-t"
                >
                  {/* <h3 className="text-3xl font-semibold">Modal Title</h3> */}
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={async (
                      values: ProfileValues,
                      { setSubmitting },
                    ) => {
                      setSubmitting(true);
                      await createProfile({
                        variables: values,
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
                      <Field
                        name="website"
                        type="website"
                        placeholder="Website"
                      />
                      <ErrorMessage name="website" component={'div'} />
                      <button
                        className="bg-primary rounded-3xl p-2 text-white font-bold"
                        type="submit"
                      >
                        Create Profile
                      </button>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default CreateProfile;
