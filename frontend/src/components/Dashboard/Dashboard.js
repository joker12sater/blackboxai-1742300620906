import React from 'react';

const Dashboard = () => {
  // Mock data - In real app, this would come from an API
  const userData = {
    name: 'John Doe',
    businessCount: 2,
    totalTransactions: 15,
    balance: 25000
  };

  const recentTransactions = [
    { id: 1, date: '2024-01-15', type: 'Payment', amount: 5000, status: 'completed' },
    { id: 2, date: '2024-01-14', type: 'Refund', amount: -1000, status: 'completed' },
    { id: 3, date: '2024-01-13', type: 'Payment', amount: 3000, status: 'pending' }
  ];

  const businesses = [
    { id: 1, name: 'Tech Solutions Ltd', type: 'Technology', status: 'active' },
    { id: 2, name: 'Food Corner', type: 'Food & Beverage', status: 'pending' }
  ];

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem'
    },
    welcome: {
      fontSize: '1.5rem',
      color: '#333',
      margin: 0
    },
    date: {
      color: '#666',
      fontSize: '0.9rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    cardTitle: {
      fontSize: '0.9rem',
      color: '#666',
      marginBottom: '0.5rem'
    },
    cardValue: {
      fontSize: '1.8rem',
      color: '#333',
      fontWeight: '600'
    },
    section: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    sectionTitle: {
      fontSize: '1.2rem',
      color: '#333',
      marginBottom: '1rem'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      textAlign: 'left',
      padding: '0.75rem',
      borderBottom: '2px solid #eee',
      color: '#666',
      fontSize: '0.9rem'
    },
    td: {
      padding: '0.75rem',
      borderBottom: '1px solid #eee',
      color: '#333'
    },
    status: {
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.85rem',
      fontWeight: '500'
    },
    businessGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1rem'
    },
    businessCard: {
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      padding: '1rem',
      border: '1px solid #eee'
    },
    businessName: {
      fontSize: '1.1rem',
      color: '#333',
      marginBottom: '0.5rem'
    },
    businessType: {
      color: '#666',
      fontSize: '0.9rem'
    }
  };

  const getStatusStyle = (status) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return {
          backgroundColor: '#d4edda',
          color: '#155724'
        };
      case 'pending':
        return {
          backgroundColor: '#fff3cd',
          color: '#856404'
        };
      case 'active':
        return {
          backgroundColor: '#cce5ff',
          color: '#004085'
        };
      default:
        return {
          backgroundColor: '#f8f9fa',
          color: '#666'
        };
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.welcome}>Welcome back, {userData.name}</h1>
          <span style={styles.date}>{new Date().toLocaleDateString()}</span>
        </div>
      </header>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Total Businesses</div>
          <div style={styles.cardValue}>{userData.businessCount}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Total Transactions</div>
          <div style={styles.cardValue}>{userData.totalTransactions}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Current Balance</div>
          <div style={styles.cardValue}>KES {userData.balance.toLocaleString()}</div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Recent Transactions</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td style={styles.td}>{transaction.date}</td>
                <td style={styles.td}>{transaction.type}</td>
                <td style={styles.td}>
                  KES {transaction.amount.toLocaleString()}
                </td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.status,
                    ...getStatusStyle(transaction.status)
                  }}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Your Businesses</h2>
        <div style={styles.businessGrid}>
          {businesses.map(business => (
            <div key={business.id} style={styles.businessCard}>
              <div style={styles.businessName}>{business.name}</div>
              <div style={styles.businessType}>{business.type}</div>
              <div style={{marginTop: '0.5rem'}}>
                <span style={{
                  ...styles.status,
                  ...getStatusStyle(business.status)
                }}>
                  {business.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;