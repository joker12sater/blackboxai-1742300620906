import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.9rem',
      color: '#333',
      fontWeight: '500'
    },
    input: {
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      outline: 'none'
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '0.75rem',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginTop: '0.5rem'
    },
    title: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '1.5rem'
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
      textAlign: 'center',
      fontSize: '0.9rem',
      marginTop: '1rem',
      display: 'block'
    },
    error: {
      color: '#dc3545',
      fontSize: '0.85rem',
      marginTop: '0.25rem'
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Handle registration logic here
    console.log('Registration attempt:', formData);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create New Account</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="fullName">Full Name</label>
          <input
            style={styles.input}
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="password">Password</label>
          <input
            style={styles.input}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Create a password"
            minLength="8"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="confirmPassword">Confirm Password</label>
          <input
            style={styles.input}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />
        </div>
        <button 
          style={styles.button}
          type="submit"
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Register
        </button>
      </form>
      <a href="/login" style={styles.link}>Already have an account? Login here</a>
    </div>
  );
};

export default Register;