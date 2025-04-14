import { ChangeEvent, SetStateAction, useRef } from "react";
import { Form } from "../components/Form";
import { Preview } from "../components/Preview";
import { FormProps } from "../types";
import CertificateImage from "../assets/certificate_template.jpg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Props = {
  formData: FormProps;
  setFormData: (value: SetStateAction<FormProps>) => void;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onGenerate: () => void;
  showPreview: boolean;
  photoUrl: string;
};

export default function Home({
  formData,
  setFormData,
  onChange,
  onGenerate,
  showPreview,
  photoUrl,
}: Props) {
  const { brand, date, invoice, material, name, style } = formData;
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!certificateRef.current) return;

    html2canvas(certificateRef.current, {
      scale: 2, // default 1, semakin tinggi semakin tajam
      useCORS: true, // jika ada image dari domain luar
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("certificate.pdf");
    });
  };

  return (
    <div className="flex flex-col items-center p-4 text-sm">
      <h1 className="text-xl font-bold">- WANG101 -</h1>
      <p className="mb-4">Certificate Generator</p>
      <div className="absolute -z-10 opacity-0 pointer-events-none">
        <div
          ref={certificateRef}
          id="certificate"
          className="w-[375px] md:w-[700px] lg:w-[900px] h-full mx-auto relative"
        >
          <img
            src={CertificateImage}
            alt="certificate"
            crossOrigin="anonymous"
            className="w-full h-full object-contain"
          />

          <div className="absolute top-[3.75rem] left-28 md:top-[7.85rem] md:left-[13rem] lg:top-[10.15rem] lg:left-[17rem] text-[0.5rem] md:text-xs lg:text-base">
            {name}
          </div>

          <div className="absolute top-[5.5rem] left-[11.8rem] md:top-[11.1rem] md:left-[21.5rem] lg:top-[14.25rem] lg:left-[28rem] text-[0.5rem] md:text-xs lg:text-base">
            {brand}
          </div>

          <div className="absolute top-[7rem] left-48 md:top-[13.8rem] md:left-[22.5rem] lg:top-[17.85rem] lg:left-[29rem] text-[0.5rem] md:text-xs lg:text-base">
            {material}
          </div>

          <div className="absolute top-[8.5rem] left-[13.5rem] md:top-[16.55rem] md:left-[25rem] lg:top-[21.25rem] lg:left-[32rem] text-[0.5rem] md:text-xs lg:text-base">
            {invoice}
          </div>

          <div className="absolute top-[9.9rem] left-[13.5rem] md:top-[19.5rem] md:left-[25rem] lg:top-[24.85rem] lg:left-[32rem] text-[0.5rem] md:text-xs lg:text-base">
            {style}
          </div>

          <div className="absolute top-[6.15rem] lg:top-[15rem] left-[2.55rem] md:top-[11.25rem] md:left-[4.7rem] lg:left-[6.5rem] w-[80px] md:w-[150px] lg:w-[180px] h-auto">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Style"
                className="w-full h-full object-contain"
              />
            ) : null}
          </div>

          <div className="absolute top-[11.4rem] left-12 md:top-[22.25rem] md:left-[7rem] lg:top-[28.5rem] lg:left-36 text-[0.5rem] md:text-xs lg:text-base">
            {date}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row border border-black divide-x w-full md:w-[700px] lg:w-[800px]">
        {/* Form */}
        <Form
          formData={formData}
          onChange={onChange}
          setFormData={setFormData}
        />

        {/* Preview */}
        <Preview
          formData={formData}
          onChange={onChange}
          onGenerate={onGenerate}
          showPreview={showPreview}
          photoUrl={photoUrl}
          downloadPdf={downloadPDF}
        />
      </div>
    </div>
  );
}
