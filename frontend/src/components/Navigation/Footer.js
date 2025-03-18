import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: 'white',
      padding: '2rem 0',
      marginTop: 'auto',
      boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem'
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    title: {
      color: '#333',
      fontSize: '1.2rem',
      marginBottom: '0.5rem'
    },
    link: {
      color: '#666',
      textDecoration: 'none',
      fontSize: '0.9rem',
      transition: 'color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    socialLinks: {
      display: 'flex',
      gap: '1rem',
      marginTop: '0.5rem'
    },
    socialIcon: {
      color: '#007bff',
      fontSize: '1.5rem',
      transition: 'color 0.3s ease'
    },
    copyright: {
      textAlign: 'center',
      color: '#666',
      fontSize: '0.9rem',
      marginTop: '2rem',
      padding: '1rem 0',
      borderTop: '1px solid #eee'
    },
    contact: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#666',
      fontSize: '0.9rem'
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.title}>About Us</h3>
          <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Whispernet Heritage provides comprehensive business management solutions
            with secure payment integration and real-time analytics.
          </p>
          <div style={styles.socialLinks}>
            <a href="#" style={styles.socialIcon} title="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" style={styles.socialIcon} title="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" style={styles.socialIcon} title="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" style={styles.socialIcon} title="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.title}>Quick Links</h3>
          <a href="/business/register" style={styles.link}>
            <i className="fas fa-store"></i>
            Register Business
          </a>
          <a href="/payments" style={styles.link}>
            <i className="fas fa-credit-card"></i>
            Make Payment
          </a>
          <a href="/dashboard" style={styles.link}>
            <i className="fas fa-chart-line"></i>
            Dashboard
          </a>
          <a href="/auth/login" style={styles.link}>
            <i className="fas fa-sign-in-alt"></i>
            Login
          </a>
        </div>

        <div style={styles.section}>
          <h3 style={styles.title}>Contact Us</h3>
          <div style={styles.contact}>
            <div style={styles.contactItem}>
              <i className="fas fa-phone"></i>
              +254 700 000000
            </div>
            <div style={styles.contactItem}>
              <i className="fas fa-envelope"></i>
              info@whispernetheritage.com
            </div>
            <div style={styles.contactItem}>
              <i className="fas fa-map-marker-alt"></i>
              Nairobi, Kenya
            </div>
          </div>
        </div>
      </div>

      <div style={styles.copyright}>
        <p>© {new Date().getFullYear()} Whispernet Heritage. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;