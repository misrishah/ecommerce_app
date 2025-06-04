import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
import api from '../services/api';
import '../App.css';

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      setIsLoading(true);
      setSubmitMessage('');
      
      try {
        // Check if username already exists
        const existingUsers = await api.get('/users', {
          params: { username: values.username }
        });

        if (existingUsers.data.length > 0) {
          setFieldError('username', 'Username already taken');
          setIsLoading(false);
          setSubmitting(false);
          return;
        }

        // Check if email already exists
        const existingEmails = await api.get('/users', {
          params: { email: values.email }
        });

        if (existingEmails.data.length > 0) {
          setFieldError('email', 'Email already registered');
          setIsLoading(false);
          setSubmitting(false);
          return;
        }

        // Prepare user data (remove confirmPassword)
        const { confirmPassword, ...userData } = values;
        const newUser = {
          ...userData,
          createdAt: new Date().toISOString()
        };

        // Register the user
        await registerUser(newUser);
        
        setSubmitMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);

      } catch (error) {
        console.error('Registration error:', error);
        if (error.response?.status === 400) {
          setSubmitMessage('Registration failed. Please check your information.');
        } else {
          setSubmitMessage('An unexpected error occurred. Please try again.');
        }
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="container">
      <h2>Register</h2>
      
      {submitMessage && (
        <div className={`message ${submitMessage.includes('successful') ? 'success' : 'error'}`}>
          {submitMessage}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          disabled={isLoading}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <div className="error">{formik.errors.firstName}</div>
        )}

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          disabled={isLoading}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <div className="error">{formik.errors.lastName}</div>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          disabled={isLoading}
        />
        {formik.touched.username && formik.errors.username && (
          <div className="error">{formik.errors.username}</div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          disabled={isLoading}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          disabled={isLoading}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          disabled={isLoading}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="error">{formik.errors.confirmPassword}</div>
        )}

        <button type="submit" disabled={formik.isSubmitting || isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;