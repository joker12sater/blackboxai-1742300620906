import React, { useState } from 'react';

const BusinessRegistration = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    registrationNumber: '',
    address: '',
    phoneNumber: '',
    email: '',
    description: ''
  });

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    form: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1.5rem',
    },
    fullWidth: {
      gridColumn: '1 / -1'
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
    select: {
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      backgroundColor: 'white',
      cursor: 'pointer'
    },
    textarea: {
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      minHeight: '100px',
      resize: 'vertical'
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
      gridColumn: '1 / -1'
    },
    title: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '1.5rem',
      gridColumn: '1 / -1'
    },
    header: {
      marginBottom: '2rem'
    },
    subtitle: {
      color: '#666',
      textAlign: 'center',
      marginTop: '0.5rem',
      fontSize: '1rem'
    }
  };

  const businessTypes = [
    'Retail',
    'Manufacturing',
    'Services',
    'Technology',
    'Food & Beverage',
    'Healthcare',
    'Education',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle business registration logic here
    console.log('Business Registration:', formData);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Business Registration</h2>
        <p style={styles.subtitle}>Register your business with Whispernet Heritage</p>
      </div>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="businessName">Business Name</label>
          <input
            style={styles.input}
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            placeholder="Enter business name"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="businessType">Business Type</label>
          <select
            style={styles.select}
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            required
          >
            <option value="">Select business type</option>
            {businessTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="registrationNumber">Registration Number</label>
          <input
            style={styles.input}
            type="text"
            id="registrationNumber"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
            placeholder="Enter registration number"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="phoneNumber">Phone Number</label>
          <input
            style={styles.input}
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="email">Business Email</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter business email"
          />
        </div>

        <div style={{...styles.inputGroup, ...styles.fullWidth}}>
          <label style={styles.label} htmlFor="address">Business Address</label>
          <input
            style={styles.input}
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter business address"
          />
        </div>

        <div style={{...styles.inputGroup, ...styles.fullWidth}}>
          <label style={styles.label} htmlFor="description">Business Description</label>
          <textarea
            style={styles.textarea}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your business"
          />
        </div>

        <button 
          style={styles.button}
          type="submit"
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Register Business
        </button>
      </form>
    </div>
  );
};

export default BusinessRegistration;