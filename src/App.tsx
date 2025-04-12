import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Certificate from "./pages/Certificate";
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

    const catalogImages = import.meta.glob(
      "./assets/catalog-*.{png,jpg,jpeg}",
      {
        eager: true,
        import: "default",
      }
    ) as Record<string, string>;

    const styleImageMap: Record<string, string> = {};

    Object.entries(catalogImages).forEach(([path, img]) => {
      const match = path.match(/catalog-(\d+)\./);
      if (match) {
        const num = match[1].padStart(2, "0");
        styleImageMap[`${num}N`] = img;
      }
    });

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

    const baseUrl = `${window.location.origin}/certificate`;
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
