/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const RegisterForm = function () {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, 'Your name must be 2 characters or more')
      .max(15, 'Your name must be 15 characters or less')
      .required('Your name is required'),
    lastName: Yup.string()
      .min(2, 'Your last name must be 2 characters or more')
      .max(15, 'Your last name must be 15 characters or less')
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
    password: Yup.string()
      .min(6, 'Password must be 6 characters or more')
      .max(15, 'Password must be 15 characters or less')
      .required('Password is required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required'),
    acceptTerms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
  });

  return (
    <div className="form">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirm: '',
          acceptTerms: false,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setLoading(true);
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          };
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, requestOptions);
            if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
            }
            setMessage('User created successfully');
          } catch (error) {
            setMessage(error.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" type="text" placeholder="Name" />
              {errors.firstName && touched.firstName && (
                <div className="error">{errors.firstName}</div>
              )}
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" type="text" placeholder="Last Name" />
              {errors.lastName && touched.lastName && (
                <div className="error">{errors.lastName}</div>
              )}
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" placeholder="Email" />
              {errors.email && touched.email && (
                <div className="error">{errors.email}</div>
              )}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" placeholder="Password" />
              {errors.password && touched.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            <div>
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <Field name="passwordConfirm" type="password" placeholder="Confirm Password" />
              {errors.passwordConfirm && touched.passwordConfirm && (
                <div className="error">{errors.passwordConfirm}</div>
              )}
            </div>

            <div>
              <label htmlFor="acceptTerms">
                <Field name="acceptTerms" type="checkbox" />
                I accept the terms and conditions
              </label>
              {errors.acceptTerms && touched.acceptTerms && (
                <div className="error">{errors.acceptTerms}</div>
              )}
            </div>

            {!loading ? (
              <div>
                <button type="submit">Submit</button>
              </div>
            ) : (
              <div>
                <p>Loading...</p>
              </div>
            )}
          </Form>
        )}
      </Formik>
      <p>{message}</p>
    </div>
  );
};
export default RegisterForm;
