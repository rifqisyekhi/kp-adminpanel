import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import "./InputContent.css"; // Path CSS untuk halaman ini
import axios from "axios";

function InputContent() {
  const [formData, setFormData] = useState({
    namaLayanan: "",
    imageLayanan: null,
    deskripsi: "",
    standarAcuan: "",
    biayaTarif: "",
    produk: "",
  });

  const [layananData, setLayananData] = useState([]); // State for table data
  const [editId, setEditId] = useState(null); // State for editing

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value, // Handle file inputs separately
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("namaLayanan", formData.namaLayanan);
      formDataToSend.append("imageLayanan", formData.imageLayanan);
      formDataToSend.append("deskripsi", formData.deskripsi);
      formDataToSend.append("standarAcuan", formData.standarAcuan);
      formDataToSend.append("biayaTarif", formData.biayaTarif);
      formDataToSend.append("produk", formData.produk);

      if (editId) {
        // Edit existing data
        await axios.put(
          `${process.env.REACT_APP_API_URL}/layanan/${editId}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Data successfully updated!");
        setEditId(null);
      } else {
        // Add new data
        await axios.post(
          `${process.env.REACT_APP_API_URL}/layanan`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Data successfully submitted!");
      }

      setFormData({
        namaLayanan: "",
        imageLayanan: null,
        deskripsi: "",
        standarAcuan: "",
        biayaTarif: "",
        produk: "",
      });
      fetchLayananData(); // Refresh data
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  const fetchLayananData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/layanan`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLayananData(response.data);
    } catch (error) {
      console.error("Error fetching layanan data:", error);
    }
  };

  const handleEdit = (layanan) => {
    setEditId(layanan._id);
    setFormData({
      namaLayanan: layanan.namaLayanan,
      imageLayanan: null, // Image cannot be prefilled
      deskripsi: layanan.deskripsi,
      standarAcuan: layanan.standarAcuan,
      biayaTarif: layanan.biayaTarif,
      produk: layanan.produk,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/layanan/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("Data successfully deleted!");
        fetchLayananData(); // Refresh data
      } catch (error) {
        console.error("Error deleting layanan data:", error);
        alert("An error occurred while deleting the data.");
      }
    }
  };

  useEffect(() => {
    fetchLayananData(); // Fetch data on component mount
  }, []);

  return (
    <div className="input-content">
      <div className="sch-container">
        <Sidebar activePage="input-content" />

        <main className="sch-main-content">
          <h1>{editId ? "Edit Konten" : "Input Konten"}</h1>
          <form onSubmit={handleSubmit}>
            <section>
              <h2>Layanan</h2>

              <div className="form-group">
                <label htmlFor="namaLayanan">Nama Layanan</label>
                <input
                  type="text"
                  name="namaLayanan"
                  onChange={handleInputChange}
                  value={formData.namaLayanan}
                  placeholder="Masukkan nama layanan"
                />
              </div>

              <div className="form-group">
                <label htmlFor="imageLayanan">Image Layanan</label>
                <input
                  type="file"
                  name="imageLayanan"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group" style={{ marginTop: "20px" }}>
                <label htmlFor="deskripsi">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  rows="5" // Menentukan tinggi awal
                  onChange={handleInputChange}
                  value={formData.deskripsi}
                  placeholder="Masukkan deskripsi layanan"
                  style={{ whiteSpace: "pre-wrap" }} // Menjaga enter di tampilan
                />
              </div>

              <div className="form-group">
                <label htmlFor="standarAcuan">Standar Acuan</label>
                <textarea
                  name="standarAcuan"
                  onChange={handleInputChange}
                  value={formData.standarAcuan}
                  placeholder="Masukkan standar acuan"
                />
              </div>

              <div className="form-group">
                <label htmlFor="biayaTarif">Biaya Tarif</label>
                <textarea
                  name="biayaTarif"
                  onChange={handleInputChange}
                  value={formData.biayaTarif}
                  placeholder="Masukkan biaya tarif"
                />
              </div>

              <div className="form-group">
                <label htmlFor="produk">Produk</label>
                <textarea
                  name="produk"
                  onChange={handleInputChange}
                  value={formData.produk}
                  placeholder="Masukkan produk terkait layanan"
                />
              </div>

              <div style={{ marginTop: "20px" }}>
                <button type="submit">{editId ? "Update" : "Submit"}</button>
              </div>
            </section>
          </form>

          <section style={{ marginTop: "40px" }}>
            <h2>Layanan Pengujian</h2>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Foto Layanan</th>
                  <th>Nama Layanan</th>
                  <th>Deskripsi</th>
                  <th>Standar Acuan</th>
                  <th>Biaya Tarif</th>
                  <th>Produk</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {layananData.map((layanan, index) => (
                  <tr key={layanan._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${layanan.imageLayanan}`}
                        alt="Layanan"
                        width="50"
                      />
                    </td>
                    <td>{layanan.namaLayanan}</td>
                    <td>{layanan.deskripsi}</td>
                    <td>{layanan.standarAcuan}</td>
                    <td>{layanan.biayaTarif}</td>
                    <td>{layanan.produk}</td>
                    <td>
                      <button onClick={() => handleEdit(layanan)}>Edit</button>
                      <button
                        onClick={() => handleDelete(layanan._id)}
                        style={{ marginLeft: "10px", backgroundColor: "red" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {layananData.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      Belum ada data layanan pengujian
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}

export default InputContent;
