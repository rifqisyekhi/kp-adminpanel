import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import "./InputContent.css"; // Path CSS untuk halaman ini
import CustomEditor from "../components/CustomEditor";
import {
  createLayanan,
  deleteLayanan,
  getAllLayanan,
  updateLayanan,
} from "../libs/layanan";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nama_layanan", formData.namaLayanan);
      formDataToSend.append("image_layanan", formData.imageLayanan);
      formDataToSend.append("deskripsi", formData.deskripsi);
      formDataToSend.append("standar_acuan", formData.standarAcuan);
      formDataToSend.append("biaya_tarif", formData.biayaTarif);
      formDataToSend.append("produk", formData.produk);

      if (editId) {
        const response = await updateLayanan(editId, formDataToSend);

        if (response.success) alert("Data successfully updated!");
        else alert("Update Data failed!");

        setEditId(null);
      } else {
        // Add new data
        const response = await createLayanan(formDataToSend);
        if (response.success) alert("Data successfully created!");
        else alert("Create Data failed!");
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
      console.log("Error submitting the form:", error.error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  const fetchLayananData = async () => {
    try {
      const response = await getAllLayanan();
      setLayananData(response.data || []);
    } catch (error) {
      console.error("Error fetching layanan data:", error);
    }
  };

  const handleEdit = (layanan) => {
    setEditId(layanan.id);
    setFormData({
      namaLayanan: layanan.nama_layanan,
      imageLayanan: null, // Image cannot be prefilled
      deskripsi: layanan.deskripsi,
      standarAcuan: layanan.standar_acuan,
      biayaTarif: layanan.biaya_tarif,
      produk: layanan.produk,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await deleteLayanan(id);
        if (response.success) {
          alert("Data successfully deleted!");
        }

        fetchLayananData();
      } catch (error) {
        console.error("Error deleting layanan data:", error);
        alert("An error occurred while deleting the data.");
      }
    }
  };

  useEffect(() => {
    fetchLayananData();
  }, []);

  return (
    <div className="input-content">
      <div className="sch-container">
        <Sidebar activePage="input-content" />

        <main className="sch-main-content">
          <h1>{editId ? "Edit Konten" : "Input Konten"}</h1>
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <section>
              <h2>Layanan</h2>

              <div className="form-group">
                <label htmlFor="namaLayanan">Nama Layanan</label>
                <input
                  type="text"
                  name="namaLayanan"
                  value={formData.namaLayanan}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      namaLayanan: e.target.value,
                    }))
                  }
                  placeholder="Masukkan nama layanan"
                />
              </div>

              <div className="form-group">
                <label htmlFor="imageLayanan">Image Layanan</label>
                <input
                  type="file"
                  name="imageLayanan"
                  accept="image/*"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setFormData((prevData) => ({
                      ...prevData,
                      imageLayanan: e.target.files[0],
                    }));
                  }}
                />
              </div>

              <div className="form-group" style={{ marginTop: "20px" }}>
                <label>Deskripsi</label>
                <CustomEditor
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      deskripsi: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-group">
                <label>Standar Acuan</label>
                <CustomEditor
                  value={formData.standarAcuan}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      standarAcuan: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-group">
                <label>Biaya Tarif</label>
                <CustomEditor
                  value={formData.biayaTarif}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      biayaTarif: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="produk">Produk</label>
                <CustomEditor
                  value={formData.produk}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      produk: e.target.value,
                    }))
                  }
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
                  <tr key={layanan.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${layanan.image_layanan}`}
                        alt="Layanan"
                        width="50"
                      />
                    </td>
                    <td>{layanan.nama_layanan}</td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{ __html: layanan.deskripsi }}
                      />
                    </td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: layanan.standar_acuan,
                        }}
                      />
                    </td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: layanan.biaya_tarif,
                        }}
                      />
                    </td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{ __html: layanan.produk }}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleEdit(layanan)}>Edit</button>
                      <button
                        onClick={() => handleDelete(layanan.id)}
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
