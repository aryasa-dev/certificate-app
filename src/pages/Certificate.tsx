import { useEffect, useState } from "react";
import CertificateImage from "../assets/certificate_template.jpg";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";

export default function Certificate() {
  const location = useLocation();
  const [data, setData] = useState({
    name: "",
    invoice: "",
    platform: "",
    date: "",
    brand: "",
    material: "",
    style: "",
    certificateUrl: "",
    photoUrl: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const fullUrl = `${window.location.origin}${
      location.pathname
    }?${params.toString()}`;

    setData({
      name: params.get("name") || "",
      invoice: params.get("invoice") || "",
      platform: params.get("platform") || "",
      date: params.get("date") || "",
      brand: params.get("brand") || "",
      material: params.get("material") || "",
      style: params.get("style") || "",
      photoUrl: params.get("photoUrl") || "",
      certificateUrl: fullUrl,
    });
  }, [location]);

  function handleDownload() {
    const element = document.getElementById("certificate");
    if (!element) return;

    html2canvas(element, {
      scale: 2, // untuk kualitas lebih tajam
      useCORS: true, // kalau ada gambar dari URL lain
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "certificate.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }

  const {
    brand,
    date,
    material,
    name,
    style,
    certificateUrl,
    photoUrl,
  } = data;

  return (
    <section className="w-screen h-screen overflow-x-hidden py-5">
      <button
        onClick={handleDownload}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mb-10 ml-10"
      >
        Download Sertifikat
      </button>
      <div id="certificate" className="w-[90rem] h-full mx-auto relative">
        <img
          src={CertificateImage}
          alt="certificate"
          crossOrigin="anonymous"
          className="w-full h-full object-contain"
        />

        {/* Name */}
        <div className="absolute top-[245px] left-[29rem] text-2xl">{name}</div>

        {/* Brand */}
        <div className="absolute top-[345px] left-[45rem] text-2xl">
          {brand}
        </div>

        {/* Material */}
        <div className="absolute top-[430px] left-[46rem] text-2xl">
          {material}
        </div>

        {/* Certificate URL */}
        <div className="absolute top-[515px] left-[51rem] text-2xl">
          <span className="whitespace-nowrap overflow-hidden text-ellipsis block max-w-[430px] h-11">
            {certificateUrl || ""}
          </span>
        </div>

        {/* Serial Number */}
        <div className="absolute top-[600px] left-[51rem] text-2xl">
          {style}
        </div>

        {/* Photo of Style# */}
        <div className="absolute top-[380px] left-52 w-[15rem] h-auto">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Style"
              className="w-full h-full object-contain"
            />
          ) : null}
        </div>

        {/* Date */}
        <div className="absolute top-[685px] left-64 text-2xl">{date}</div>
      </div>
    </section>
  );
}
