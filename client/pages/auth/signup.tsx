import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

interface SignupFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

const initialValues: SignupFormValues = {
  email: '',
  password: '',
  passwordConfirm: '',
};

const emailAddresses = ['test@gmail.com', 'test2@gmail.com', 'test3@gmail.com'];

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .lowercase()
    .email('Enter a valid email')
    .notOneOf(emailAddresses, 'Email already taken!')
    .required('Email is required'),
  password: Yup.string()
    .matches(
      lowercaseRegex,
      'Password has to contain at least one lowercase character'
    )
    .matches(
      uppercaseRegex,
      'Password has to contain at least one uppercase character'
    )
    .matches(numericRegex, 'Password has to contain at least one number')
    .min(8, 'Password has to be at least 8 characters long')
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Required!'),
});

const Signup = () => {
  const { doRequest, loading, errors } = useRequest();

  const onSubmitHandler = async ({ email, password }: SignupFormValues) => {
    doRequest({
      url: '/api/users/signup',
      method: 'post',
      body: {
        email,
        password,
      },
      onSuccess: () => Router.push('/'),
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      validationSchema={SignupSchema}
    >
      {({ isValid, dirty }) => (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <h1 className="text-3xl mb-5">Sign Up</h1>
          <Form>
            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600"
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                placeholder="Email Address"
              />
              <p className="text-red-600 text-xs italic">
                <ErrorMessage name="email" />
              </p>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-600 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-600 mb-3"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
              <p className="text-red-600 text-xs italic">
                <ErrorMessage name="password" />
              </p>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-600 text-sm font-bold mb-2"
                htmlFor="passwordConfirm"
              >
                Confirm Password
              </label>
              <Field
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-600 mb-3"
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                placeholder="Confirm Password"
              />
              <p className="text-red-600 text-xs italic">
                <ErrorMessage name="passwordConfirm" />
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                disabled={!isValid || !dirty}
              >
                Sign Up
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </Form>
          <hr />
          {loading ? 'LOADING' : 'NOT LOADING'}
          <pre>{JSON.stringify(errors, null, 4)}</pre>
        </div>
      )}
    </Formik>
  );
};

export default Signup;
