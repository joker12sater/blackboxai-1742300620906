import React, { useState } from 'react';

const AdminDashboard = () => {
  // Mock data - In real app, this would come from an API
  const [activeTab, setActiveTab] = useState('users');

  const stats = {
    totalUsers: 150,
    totalBusinesses: 85,
    totalTransactions: 1250,
    revenue: 750000
  };

  const users = [
    { id: 1, name: 'George Momanyi', email: 'georg@example.com', businesses: 2, status: 'active' },
    { id: 2, name: 'Jane Ogechi', email: 'ogechi@example.com', businesses: 1, status: 'inactive' },
    { id: 3, name: 'Mike James', email: 'mike@example.com', businesses: 3, status: 'active' }
  ];

  const businesses = [
    { id: 1, name: 'Tech Solutions', owner: 'George', type: 'Technology', status: 'active' },
    { id: 2, name: 'Food Corner', owner: 'Jane S', type: 'Food & Beverage', status: 'pending' },
    { id: 3, name: 'Digital Services', owner: 'Mike ', type: 'Services', status: 'active' }
  ];

  const transactions = [
    { id: 1, date: '2024-01-15', business: 'Tech Solutions', amount: 5000, status: 'completed' },
    { id: 2, date: '2024-01-14', business: 'Food Corner', amount: 3000, status: 'pending' },
    { id: 3, date: '2024-01-13', business: 'Digital Services', amount: 7500, status: 'completed' }
  ];

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      marginBottom: '2rem'
    },
    title: {
      fontSize: '1.8rem',
      color: '#333',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#666',
      fontSize: '1rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    statCard: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    statLabel: {
      color: '#666',
      fontSize: '0.9rem',
      marginBottom: '0.5rem'
    },
    statValue: {
      fontSize: '1.8rem',
      color: '#333',
      fontWeight: '600'
    },
    tabs: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem'
    },
    tab: {
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: '#f8f9fa',
      color: '#666',
      border: 'none',
      fontSize: '1rem'
    },
    activeTab: {
      backgroundColor: '#007bff',
      color: 'white'
    },
    table: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    th: {
      textAlign: 'left',
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      color: '#333',
      fontWeight: '600',
      borderBottom: '2px solid #eee'
    },
    td: {
      padding: '1rem',
      borderBottom: '1px solid #eee',
      color: '#666'
    },
    status: {
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.85rem',
      fontWeight: '500'
    },
    actionButton: {
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.9rem',
      transition: 'background-color 0.3s ease'
    }
  };

  const getStatusStyle = (status) => {
    switch(status.toLowerCase()) {
      case 'active':
      case 'completed':
        return {
          backgroundColor: '#d4edda',
          color: '#155724'
        };
      case 'inactive':
        return {
          backgroundColor: '#f8d7da',
          color: '#721c24'
        };
      case 'pending':
        return {
          backgroundColor: '#fff3cd',
          color: '#856404'
        };
      default:
        return {
          backgroundColor: '#f8f9fa',
          color: '#666'
        };
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'users':
        return (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Businesses</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.businesses}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.status,
                      ...getStatusStyle(user.status)
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button 
                      style={{
                        ...styles.actionButton,
                        backgroundColor: '#007bff',
                        color: 'white',
                        marginRight: '0.5rem'
                      }}
                      onClick={() => console.log('Edit user:', user.id)}
                    >
                      Edit
                    </button>
                    <button 
                      style={{
                        ...styles.actionButton,
                        backgroundColor: '#dc3545',
                        color: 'white'
                      }}
                      onClick={() => console.log('Delete user:', user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'businesses':
        return (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Business Name</th>
                <th style={styles.th}>Owner</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map(business => (
                <tr key={business.id}>
                  <td style={styles.td}>{business.name}</td>
                  <td style={styles.td}>{business.owner}</td>
                  <td style={styles.td}>{business.type}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.status,
                      ...getStatusStyle(business.status)
                    }}>
                      {business.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button 
                      style={{
                        ...styles.actionButton,
                        backgroundColor: '#28a745',
                        color: 'white',
                        marginRight: '0.5rem'
                      }}
                      onClick={() => console.log('Approve business:', business.id)}
                    >
                      Approve
                    </button>
                    <button 
                      style={{
                        ...styles.actionButton,
                        backgroundColor: '#dc3545',
                        color: 'white'
                      }}
                      onClick={() => console.log('Reject business:', business.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'transactions':
        return (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Business</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td style={styles.td}>{transaction.date}</td>
                  <td style={styles.td}>{transaction.business}</td>
                  <td style={styles.td}>KES {transaction.amount.toLocaleString()}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.status,
                      ...getStatusStyle(transaction.status)
                    }}>
                      {transaction.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button 
                      style={{
                        ...styles.actionButton,
                        backgroundColor: '#17a2b8',
                        color: 'white'
                      }}
                      onClick={() => console.log('View transaction:', transaction.id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <p style={styles.subtitle}>Manage users, businesses, and transactions</p>
      </header>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Users</div>
          <div style={styles.statValue}>{stats.totalUsers}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Businesses</div>
          <div style={styles.statValue}>{stats.totalBusinesses}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Transactions</div>
          <div style={styles.statValue}>{stats.totalTransactions}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Revenue</div>
          <div style={styles.statValue}>KES {stats.revenue.toLocaleString()}</div>
        </div>
      </div>

      <div style={styles.tabs}>
        {['users', 'businesses', 'transactions'].map(tab => (
          <button
            key={tab}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
};

export default AdminDashboard;