import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Certificate from "./pages/Certificate";
import O2NImage from './assets/WANG101.png'
import O3NImage from './assets/WANG101Fashion.png'
import O7NImage from './assets/WANG101.jpg'
import { ChangeEvent, useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    invoice: "",
    platform: "",
    date: "",
    brand: "",
    material: "",
    style: "",
    certificateUrl: "",
  });
  const [showPreview, setShowPreview] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");

  const generateCertificate = () => {
    const { brand, date, invoice, material, name, platform, style } = formData;
    if (
      !name ||
      !invoice ||
      !platform ||
      !date ||
      !brand ||
      !material ||
      !style
    ) {
      setFormData((prev) => ({ ...prev, certificateUrl: "" }));
      setShowPreview(false);
      return;
    }

    // Update photo preview berdasarkan style
    const styleImageMap: Record<string, string> = {
      "02N": O2NImage,
      "03N": O3NImage,
      "07AN": O7NImage,
      "07N": O7NImage,
    };

    const selectedPhoto = styleImageMap[style] || "";

    const params = new URLSearchParams({
      name,
      invoice,
      platform,
      date,
      brand,
      material,
      style,
      photoUrl: selectedPhoto,
    });

    const baseUrl = `${window.location.origin}/certificate`
    const fullUrl = `${baseUrl}?${params.toString()}`;
    setFormData((prev) => ({ ...prev, certificateUrl: fullUrl }));
    setPhotoUrl(selectedPhoto);
    setShowPreview(true);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            formData={formData}
            onChange={handleChange}
            onGenerate={generateCertificate}
            showPreview={showPreview}
            photoUrl={photoUrl}
          />
        }
      />
      <Route path="/certificate" element={<Certificate />} />
    </Routes>
  );
}
