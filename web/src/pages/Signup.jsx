import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css'; // We'll add some CSS to center everything

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Customer'); // Default is Customer
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/signup', {
        username, password, user_type: userType, address, locality
      });
      setSuccess('Sign-up successful!');
      setError('');
      navigate('/login'); // Redirect to login after successful sign-up
    } catch (err) {
      setError('Sign-up failed');
      setSuccess('');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>User Type:</label>
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="Customer">Customer</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Deliverer">Deliverer</option>
          </select>
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Locality:</label>
          <input
            type="text"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <button onClick={() => navigate('/login')}>Login</button></p>
    </div>
  );
};

export default SignUp;
