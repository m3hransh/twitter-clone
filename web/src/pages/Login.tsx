import { useMutation, gql } from '@apollo/client';
import { FC } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import TwitterLogo from '../assets/twitter-logo.png';

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

interface LoginValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email Required'),
  password: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Email Required'),
});

const Login: FC = () => {
  const history = useHistory();
  const [login] = useMutation(LOGIN_MUTATION);

  const initialValues: LoginValues = {
    email: '',
    password: '',
  };

  return (
    <div className="mx-auto max-w-lg w-1/2 flex flex-col items-center text-center mt-16">
      <img src={TwitterLogo} alt="logo" className="w-12" />
      <h1 className="text-xl font-bold">Log in to fake Twitter </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await login({
            variables: values,
          });
          console.log(response);
          localStorage.setItem('token', response.data.login.token);
          setSubmitting(false);
          history.push('/users');
        }}
      >
        <Form className="w-full flex flex-col space-y-5 mt-3">
          <Field name="email" type="text" placeholder="Email" />
          <ErrorMessage name="email" component={'div'} />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component={'div'} />
          <button
            className="bg-primary rounded-3xl p-2 text-secondary font-bold"
            type="submit"
          >
            <span className="">Login</span>
          </button>
        </Form>
      </Formik>
      <div className="mt-14">
        <h4 className="font-bold">Don't have an account?</h4>
        <Link className="text-main" to="/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
