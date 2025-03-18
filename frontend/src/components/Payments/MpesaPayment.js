import React, { useState } from 'react';

const MpesaPayment = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    amount: '',
    description: ''
  });

  const [paymentStatus, setPaymentStatus] = useState({
    status: '', // 'pending', 'success', 'failed'
    message: ''
  });

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    title: {
      color: '#333',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#666',
      fontSize: '1rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
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
      backgroundColor: '#28a745',
      color: 'white',
      padding: '1rem',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginTop: '1rem'
    },
    statusContainer: {
      padding: '1rem',
      borderRadius: '4px',
      marginTop: '1rem',
      textAlign: 'center'
    },
    infoBox: {
      backgroundColor: '#e9ecef',
      padding: '1rem',
      borderRadius: '4px',
      marginTop: '2rem'
    },
    infoTitle: {
      fontSize: '0.9rem',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    infoText: {
      fontSize: '0.85rem',
      color: '#666',
      lineHeight: '1.4'
    },
    mpesaLogo: {
      width: '120px',
      height: 'auto',
      margin: '0 auto 1rem',
      display: 'block'
    }
  };

  const getStatusStyles = (status) => {
    switch(status) {
      case 'pending':
        return {
          backgroundColor: '#fff3cd',
          color: '#856404'
        };
      case 'success':
        return {
          backgroundColor: '#d4edda',
          color: '#155724'
        };
      case 'failed':
        return {
          backgroundColor: '#f8d7da',
          color: '#721c24'
        };
      default:
        return {};
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simulate payment processing
    setPaymentStatus({
      status: 'pending',
      message: 'Processing your payment...'
    });

    // Here you would typically make an API call to your backend
    // For demo, we'll simulate a response after 2 seconds
    setTimeout(() => {
      setPaymentStatus({
        status: 'success',
        message: 'Payment initiated successfully! Please check your phone for the M-Pesa prompt.'
      });
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png" 
          alt="M-Pesa Logo"
          style={styles.mpesaLogo}
        />
        <h2 style={styles.title}>M-Pesa Payment</h2>
        <p style={styles.subtitle}>Fast and secure mobile payments</p>
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
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
            placeholder="Enter M-Pesa registered number"
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="amount">Amount (KES)</label>
          <input
            style={styles.input}
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
            placeholder="Enter amount"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="description">Payment Description</label>
          <input
            style={styles.input}
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter payment description (optional)"
          />
        </div>

        <button 
          style={styles.button}
          type="submit"
          onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
        >
          Pay with M-Pesa
        </button>
      </form>

      {paymentStatus.status && (
        <div style={{
          ...styles.statusContainer,
          ...getStatusStyles(paymentStatus.status)
        }}>
          {paymentStatus.message}
        </div>
      )}

      <div style={styles.infoBox}>
        <h4 style={styles.infoTitle}>How to Pay</h4>
        <p style={styles.infoText}>
          1. Enter your M-Pesa registered phone number<br />
          2. Enter the amount you wish to pay<br />
          3. Click "Pay with M-Pesa"<br />
          4. Wait for the M-Pesa prompt on your phone<br />
          5. Enter your M-Pesa PIN to complete the payment
        </p>
      </div>
    </div>
  );
};

export default MpesaPayment;