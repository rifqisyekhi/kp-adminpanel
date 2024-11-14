import React from 'react';
import './Lobby.css'; // Include the path to your CSS
import logoInstagram from '../assets/images/IG.png';
import logoYouTube from '../assets/images/YT.png';
import logoTikTok from '../assets/images/Tiktok.png';
//import videoSource from '../assets/videos/your-video.mp4'; // Replace with your actual video path

function Lobby() {
  return (
    <div className="container">
      <header>
        <div className="date-time">
          <p>Monday, October 28 2024<br />4:03 PM</p>
        </div>
        <div className="title">
          <h1>Balai Perkerasan dan Lingkungan Jalan</h1>
          <h2>Kementrian Pekerjaan Umum dan Perumahan Rakyat</h2>
        </div>
      </header>

      <main>
        <section className="meeting-info">
          <div className="meeting-card">
            <h2>RAPAT HARI INI</h2>
            <p>Rapat Perdana BPLJ</p>
            <div className="status">
              <span className="dot"></span> Sedang Berlangsung
            </div>
            <div className="details">
              <p><strong>Waktu:</strong> 10:00 - 12:00</p>
              <p><strong>Tempat:</strong> Ruang 3.01</p>
              <p><strong>Audience:</strong> BPLJ</p>
            </div>
          </div>
          <div className="upcoming">
            <button className="upcoming-btn">RAPAT Monday October 28 2024</button>
            <button className="upcoming-btn">RAPAT Monday October 28 2024</button>
            <button className="upcoming-btn">RAPAT Monday October 28 2024</button>
            <button className="upcoming-btn">RAPAT Monday October 28 2024</button>
          </div>
        </section>

        <section className="video-section">
          {/* <video controls>
            <source src={videoSource} type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
        </section>
      </main>

      <footer>
        <div className="footer-text"></div>
        <div className="social-media">
          <p>Follow us: @pupr_bm_bplj</p>
          <div className="icons">
            <a href="#"><img src={logoInstagram} alt="Instagram" /></a>
            <a href="#"><img src={logoYouTube} alt="YouTube" /></a>
            <a href="#"><img src={logoTikTok} alt="TikTok" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Lobby;
