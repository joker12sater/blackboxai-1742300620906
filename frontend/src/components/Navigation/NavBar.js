import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const styles = {
    navbar: {
      backgroundColor: 'white',
      padding: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#007bff',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    nav: {
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center'
    },
    link: {
      color: '#666',
      textDecoration: 'none',
      fontSize: '0.95rem',
      padding: '0.5rem',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    activeLink: {
      color: '#007bff',
      backgroundColor: '#e6f2ff'
    },
    mobileMenu: {
      display: 'none',
      cursor: 'pointer',
      fontSize: '1.5rem',
      color: '#666'
    },
    '@media (max-width: 768px)': {
      nav: {
        display: 'none',
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: '1rem',
        flexDirection: 'column',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      },
      navOpen: {
        display: 'flex'
      },
      mobileMenu: {
        display: 'block'
      }
    }
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/auth/login', label: 'Login', icon: 'fas fa-sign-in-alt' },
    { path: '/business/register', label: 'Register Business', icon: 'fas fa-store' },
    { path: '/payments', label: 'Payments', icon: 'fas fa-credit-card' },
    { path: '/dashboard', label: 'Dashboard', icon: 'fas fa-chart-line' },
    { path: '/admin', label: 'Admin', icon: 'fas fa-user-shield' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const applyMediaStyles = (baseStyles, mediaStyles) => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    return mediaQuery.matches ? { ...baseStyles, ...mediaStyles } : baseStyles;
  };

  return (
    <header style={styles.navbar}>
      <div style={styles.container}>
        <a href="/" style={styles.logo}>
          <i className="fas fa-building"></i>
          Whispernet Heritage
        </a>

        <div 
          style={styles.mobileMenu} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>

        <nav style={applyMediaStyles(
          styles.nav, 
          isMenuOpen ? { ...styles['@media (max-width: 768px)'].nav, ...styles['@media (max-width: 768px)'].navOpen } : styles['@media (max-width: 768px)'].nav
        )}>
          {navItems.map((item) => (
            <a
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              style={{
                ...styles.link,
                ...(isActive(item.path) ? styles.activeLink : {}),
                cursor: 'pointer'
              }}
            >
              <i className={item.icon}></i>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;