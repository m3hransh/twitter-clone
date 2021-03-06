import { useMutation, gql } from '@apollo/client';
import { FC } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import TwitterLogo from '../assets/twitter-logo.png';
import ErrorMessage from '../components/ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation signup($name: String, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

interface SignupValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email Required'),
  password: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Password Required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Password must match',
  ),
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Name Required'),
});

const Signup: FC = () => {
  const history = useHistory();
  const [signup] = useMutation(SIGNUP_MUTATION);

  const initialValues: SignupValues = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  };

  return (
    <div className="mx-auto max-w-lg w-3/4 flex flex-col items-center text-center mt-16">
      <img src={TwitterLogo} alt="logo" className="w-12" />
      <h1 className="text-xl font-bold">Sign up </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await signup({
            variables: values,
          });
          console.log(response);
          localStorage.setItem('token', response.data.signup.token);
          setSubmitting(false);
          history.push('/');
        }}
      >
        {({ errors, touched }) => (
          <Form className="w-full flex flex-col space-y-1 mt-3">
            <Field
              name="email"
              type="text"
              placeholder="Email"
              className={
                errors.email && touched.email && `border-2 border-red-600`
              }
            />
            <ErrorMessage error={errors.email} touched={touched.email} />
            <Field
              name="name"
              type="text"
              placeholder="Name"
              className={
                errors.name && touched.name && `border-2 border-red-600`
              }
            />
            <ErrorMessage error={errors.name} touched={touched.name} />
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className={
                errors.password &&
                touched.password &&
                `border-2 border-red-600`
              }
            />
            <ErrorMessage
              error={errors.password}
              touched={touched.password}
            />
            <Field
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className={
                errors.confirmPassword &&
                touched.confirmPassword &&
                `border-2 border-red-600`
              }
            />
            <ErrorMessage
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
            <button
              className="bg-primary rounded-3xl p-2 text-white font-bold"
              type="submit"
            >
              Sign up
            </button>
          </Form>
        )}
      </Formik>
      <div className="mt-14">
        <h4 className="font-bold">Already have an account?</h4>
        <Link className="text-main font-medium" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
