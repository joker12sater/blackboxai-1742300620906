import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './components/Navigation/NavBar';
import Footer from './components/Navigation/Footer';

const App = () => {
  const location = useLocation();

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    },
    main: {
      flex: 1,
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      width: '100%'
    },
    hero: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    title: {
      fontSize: '2.5rem',
      color: '#333',
      marginBottom: '1rem'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#666',
      maxWidth: '600px',
      margin: '0 auto'
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginTop: '3rem'
    },
    feature: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      textAlign: 'center'
    },
    featureIcon: {
      fontSize: '2rem',
      color: '#007bff',
      marginBottom: '1rem'
    },
    featureTitle: {
      fontSize: '1.2rem',
      color: '#333',
      marginBottom: '0.5rem'
    },
    featureDescription: {
      color: '#666',
      fontSize: '0.95rem',
      lineHeight: '1.5'
    }
  };

  // Only show landing page content on the root route
  const isRootRoute = location.pathname === '/';

  return (
    <div style={styles.container}>
      <NavBar />
      <main style={styles.main}>
        {isRootRoute ? (
          <>
            <section style={styles.hero}>
              <h1 style={styles.title}>Welcome to Whispernet Heritage</h1>
              <p style={styles.subtitle}>
                A comprehensive management system for streamlined business operations and secure payments
              </p>
            </section>

            <div style={styles.features}>
              <div style={styles.feature}>
                <i className="fas fa-store" style={styles.featureIcon}></i>
                <h3 style={styles.featureTitle}>Business Management</h3>
                <p style={styles.featureDescription}>
                  Register and manage your businesses with ease. Track performance and growth in real-time.
                </p>
              </div>

              <div style={styles.feature}>
                <i className="fas fa-money-bill-wave" style={styles.featureIcon}></i>
                <h3 style={styles.featureTitle}>Secure Payments</h3>
                <p style={styles.featureDescription}>
                  Process payments securely through M-Pesa integration. Monitor transactions effortlessly.
                </p>
              </div>

              <div style={styles.feature}>
                <i className="fas fa-chart-line" style={styles.featureIcon}></i>
                <h3 style={styles.featureTitle}>Analytics Dashboard</h3>
                <p style={styles.featureDescription}>
                  Get insights into your business performance with detailed analytics and reports.
                </p>
              </div>

              <div style={styles.feature}>
                <i className="fas fa-shield-alt" style={styles.featureIcon}></i>
                <h3 style={styles.featureTitle}>Secure & Reliable</h3>
                <p style={styles.featureDescription}>
                  Built with security in mind. Your data is protected with industry-standard encryption.
                </p>
              </div>
            </div>
          </>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default App;