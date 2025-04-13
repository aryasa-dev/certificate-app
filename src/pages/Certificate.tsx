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
    <section className="lg:w-screen overflow-x-hidden py-5">
      <button
        onClick={handleDownload}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mb-10 ml-10"
      >
        Download Sertifikat
      </button>
      <div id="certificate" className="w-[375px] md:w-[700px] lg:w-[900px] h-full mx-auto relative">
        <img
          src={CertificateImage}
          alt="certificate"
          crossOrigin="anonymous"
          className="w-full h-full object-contain"
        />

        {/* Name */}
        <div className="absolute top-[3.85rem] left-28 md:top-[8rem] md:left-[13rem] lg:top-[10.25rem] lg:left-[17rem] text-xs lg:text-base">{name}</div>

        {/* Brand */}
        <div className="absolute top-[5.5rem] left-[11.8rem] md:top-[11.2rem] md:left-[21.5rem] lg:top-[14.25rem] lg:left-[28rem] text-xs lg:text-base">
          {brand}
        </div>

        {/* Material */}
        <div className="absolute top-[7rem] left-48 md:top-[13.8rem] md:left-[22.5rem] lg:top-[18rem] lg:left-[29rem] text-xs lg:text-base">
          {material}
        </div>

        {/* Certificate URL */}
        <div className="absolute top-[8.7rem] left-[13.5rem] md:top-[16.7rem] md:left-[25rem] lg:top-[21.5rem] lg:left-[32rem] text-xs lg:text-base">
          <span className="whitespace-nowrap overflow-hidden text-ellipsis block max-w-[120px] md:max-w-[220px] lg:max-w-[280px] h-11">
            {certificateUrl || ""}
          </span>
        </div>

        {/* Serial Number */}
        <div className="absolute top-[10.1rem] left-[13.5rem] md:top-[19.5rem] md:left-[25rem] lg:top-[25rem] lg:left-[32rem] text-xs lg:text-base">
          {style}
        </div>

        {/* Photo of Style# */}
        <div className="absolute top-28 lg:top-[15rem] left-11 md:top-[11.25rem] md:left-[4.7rem] lg:left-[6rem] w-16 md:w-[150px] lg:w-[180px] h-auto">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Style"
              className="w-full h-full object-contain"
            />
          ) : null}
        </div>

        {/* Date */}
        <div className="absolute top-[11.5rem] left-12 md:top-[22.25rem] md:left-[7rem] lg:top-[28.5rem] lg:left-36 text-xs lg:text-base">{date}</div>
      </div>
    </section>
  );
}
