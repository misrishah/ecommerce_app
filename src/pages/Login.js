import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import '../App.css';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username or Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setIsLoading(true);
      setLoginMessage('');
      
      try {
        // Try to login with username first
        let user = null;
        
        try {
          user = await loginUser(values.username, values.password);
        } catch (error) {
          // If username login fails, try with email
          try {
            user = await loginUser(values.username, values.password, true); // email login
          } catch (emailError) {
            throw new Error('Invalid credentials');
          }
        }

        if (user) {
          // Store user info in localStorage (you can modify this as needed)
          localStorage.setItem('username', user.username);
          localStorage.setItem('token', 'dummy-auth-token'); // You can generate a proper token
          localStorage.setItem('user', JSON.stringify(user));
          
          setLoginMessage('Login successful! Redirecting...');
          setTimeout(() => {
            navigate('/dashboard', { replace: true });
          }, 1000);
        }
      } catch (error) {
        console.error('Login error:', error);
        setLoginMessage('Invalid username/email or password');
        setErrors({ 
          username: 'Invalid credentials', 
          password: ' ' 
        });
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="container">
      <h2>Login</h2>
      
      {loginMessage && (
        <div className={`message ${loginMessage.includes('successful') ? 'success' : 'error'}`}>
          {loginMessage}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username or Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          disabled={isLoading}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="error">{formik.errors.username}</div>
        ) : null}
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          disabled={isLoading}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
        
        <button type="submit" disabled={formik.isSubmitting || isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;