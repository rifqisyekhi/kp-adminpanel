import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import "./InputContent.css"; // Path CSS untuk halaman ini
import axios from "axios";
import { BtnBold, BtnItalic, Editor, EditorProvider, Toolbar } from "react-simple-wysiwyg";
import CustomEditor from "../components/CustomEditor";

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

  const [content, setContent] = useState(''); // State to manage editor content
  const [standarAcuan, setStandarAcuan] = useState('');
  const [biayaTarif, setBiayaTarif] = useState('');
  const [produk, setProduk] = useState('');


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
      formDataToSend.append("deskripsi", content);
      formDataToSend.append("standarAcuan", standarAcuan);
      formDataToSend.append("biayaTarif", biayaTarif);
      formDataToSend.append("produk", produk);

      if (editId) {
        // Edit existing data
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/layanan/${editId}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if(response.status === 401 || response.status === 403){
          localStorage.removeItem('token');
          window.location.href = "/login";
        }
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
    setContent(layanan.deskripsi)
    setBiayaTarif(layanan.biayaTarif)
    setStandarAcuan(layanan.standarAcuan)
    setProduk(layanan.produk)
    setFormData({
      namaLayanan: layanan.namaLayanan,
      imageLayanan: null, // Image cannot be prefilled
      deskripsi: content,
      standarAcuan: standarAcuan,
      biayaTarif: biayaTarif,
      produk: produk,
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

  
  const handleOnChange = (e) => {
    setContent(e.target.value); // Update the content state
  };

  const handleOnChangeStandar = (e) => {
    setStandarAcuan(e.target.value); // Update the content state
  };

  const handleOnChangeBiaya = (e) => {
    setBiayaTarif(e.target.value); // Update the content state
  };

  const handleOnChangeProduk = (e) => {
    setProduk(e.target.value); // Update the content state
  };

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
                <label>Deskripsi</label>
                <CustomEditor value={content} onChange={handleOnChange}/>
              </div>

              <div className="form-group">
                <label>Standar Acuan</label>
                <CustomEditor value={standarAcuan} onChange={handleOnChangeStandar}/>
              </div>

              <div className="form-group">
                <label>Biaya Tarif</label>
                <CustomEditor value={biayaTarif} onChange={handleOnChangeBiaya}/>
              </div>

              <div className="form-group">
                <label htmlFor="produk">Produk</label>
                <CustomEditor value={produk} onChange={handleOnChangeProduk}/>
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
                    <td><div dangerouslySetInnerHTML={{__html: layanan.deskripsi}}/></td>
                    <td><div dangerouslySetInnerHTML={{__html: layanan.standarAcuan}}/></td>
                    <td><div dangerouslySetInnerHTML={{__html: layanan.biayaTarif}}/></td>
                    <td><div dangerouslySetInnerHTML={{__html: layanan.produk}}/></td>
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
