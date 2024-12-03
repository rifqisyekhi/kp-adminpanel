import React from 'react';
import './Sidebar.css';
import logo from '../assets/images/Logo_bplj.png';
import illustration from '../assets/images/ilustrasi_kalender.png';

function Sidebar({ activePage }) {
  return (
    <aside className="sb-sidebar">
      <div className="sb-center">
        <img src={logo} alt="Logo" className="sb-logo" />
      </div>
      <h2>JADWAL RAPAT</h2>
      <nav className="sb-menu">
        <a href="/dashboard" className={`sb-menu-item ${activePage === 'dashboard' ? 'active' : ''}`}>🏠 Dashboard</a>
        <a href="/input-meeting" className={`sb-menu-item ${activePage === 'input-meeting' ? 'active' : ''}`}>📅 Input Meeting</a>
        <a href="/schedule" className={`sb-menu-item ${activePage === 'schedule' ? 'active' : ''}`}>📆 Schedule</a>
        <a href="/input-content" className={`sb-menu-item ${activePage === 'input-content' ? 'active' : ''}`}>📝 Input Content</a>
      </nav>
      <div className="sb-illustration">
        <img src={illustration} alt="Illustration" />
      </div>
    </aside>
  );
}

export default Sidebar;
