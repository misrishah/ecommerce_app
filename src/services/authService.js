import api from './api';

// Login function - supports both username and email
export const loginUser = async (usernameOrEmail, password, isEmail = false) => {
  try {
    let response;
    
    if (isEmail) {
      // Search by email
      response = await api.get('/users', {
        params: {
          email: usernameOrEmail,
          password: password
        }
      });
    } else {
      // First try username
      response = await api.get('/users', {
        params: {
          username: usernameOrEmail,
          password: password
        }
      });
      
      // If no results found, try email
      if (response.data.length === 0) {
        response = await api.get('/users', {
          params: {
            email: usernameOrEmail,
            password: password
          }
        });
      }
    }

    // If user found, return the first one
    if (response.data.length > 0) {
      return response.data[0];
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Invalid credentials');
  }
};

// Register function
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Check if username exists
export const checkUsernameExists = async (username) => {
  try {
    const response = await api.get('/users', {
      params: { username: username }
    });
    return response.data.length > 0;
  } catch (error) {
    console.error('Error checking username:', error);
    return false;
  }
};

// Check if email exists
export const checkEmailExists = async (email) => {
  try {
    const response = await api.get('/users', {
      params: { email: email }
    });
    return response.data.length > 0;
  } catch (error) {
    console.error('Error checking email:', error);
    return false;
  }
};

// Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

// Update user
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Logout function (clears localStorage)
export const logoutUser = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};