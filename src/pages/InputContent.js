import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Import Sidebar
import './InputContent.css'; // Path CSS untuk halaman ini

function InputContent() {
  const [content, setContent] = useState({
    layanan: Array(10).fill(''), // Layanan Ada10
    duratek: '',
    advisTeknik: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const [category, index] = name.split('-');
    if (category === 'layanan') {
      const updatedLayanan = [...content.layanan];
      updatedLayanan[index] = value;
      setContent({ ...content, layanan: updatedLayanan });
    } else {
      setContent({ ...content, [category]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validasi: Pastikan semua input terisi
    const isLayananValid = content.layanan.every((value) => value.trim() !== '');
    const isOtherValid =
      content.duratek.trim() !== '' && content.advisTeknik.trim() !== '';
    if (!isLayananValid || !isOtherValid) {
      alert('Harap isi semua layanan dan konten sebelum submit.');
      return;
    }

    console.log('Konten:', content);
    alert('Konten berhasil disimpan!');
  };

  return (
    <div className="input-content">
      <div className="sch-container">
        <Sidebar activePage="input-content" />

        <main className="sch-main-content">
          <h1>Input Konten</h1>
          <form onSubmit={handleSubmit}>
            <section>
              <h2>Layanan</h2>
              {content.layanan.map((layanan, index) => (
                <div key={index} className="form-group">
                  <label>Layanan {index + 1}</label>
                  <textarea
                    name={`layanan-${index}`}
                    value={layanan}
                    onChange={handleInputChange}
                    placeholder={`Masukkan konten untuk Layanan ${index + 1}`}
                  />
                </div>
              ))}
            </section>

            <section>
              <h2>Duratek</h2>
              <div className="form-group">
                <label>Konten Duratek</label>
                <textarea
                  name="duratek"
                  value={content.duratek}
                  onChange={handleInputChange}
                  placeholder="Masukkan konten untuk Duratek"
                />
              </div>
            </section>

            <section>
              <h2>Advis Teknik</h2>
              <div className="form-group">
                <label>Konten Advis Teknik</label>
                <textarea
                  name="advisTeknik"
                  value={content.advisTeknik}
                  onChange={handleInputChange}
                  placeholder="Masukkan konten untuk Advis Teknik"
                />
              </div>
            </section>

            <button type="submit">Submit</button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default InputContent;
