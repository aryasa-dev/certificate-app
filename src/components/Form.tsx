import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { FormProps } from "../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  formData: FormProps;
  setFormData: (value: SetStateAction<FormProps>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export function Form({ formData, setFormData, onChange }: Props) {
  const selectedDate = formData.date ? new Date(formData.date) : null;
  const [options, setOptions] = useState<{
    styles: string[];
    platforms: string[];
    brands: string[];
    materials: string[];
  }>({
    styles: [],
    platforms: [],
    brands: [],
    materials: [],
  });

  useEffect(() => {
    fetch("data/options.json")
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
      });
  }, []);

  return (
    <div className="flex flex-col px-4 py-6 gap-2 w-full md:w-1/2">
      <label>
        Name \ User ID:
        <input
          name="name"
          value={formData.name}
          onChange={onChange}
          className="border w-full px-2"
        />
      </label>

      <label>
        Invoice# :
        <input
          name="invoice"
          value={formData.invoice}
          onChange={onChange}
          className="border w-full px-2"
        />
      </label>

      <label>
        Platform:
        <select
          name="platform"
          value={formData.platform}
          onChange={onChange}
          className="border w-full"
        >
          <option value="">Platform</option>
          {options.platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col">
        Date of Purchase:
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => {
            if (date) {
              const isoDate = date.toISOString().split("T")[0];
              setFormData((prev) => ({ ...prev, date: isoDate }));
            }
          }}
          dateFormat="yyyy-MM-dd"
          className="block border w-full px-2 py-1"
          placeholderText="Select a date"
        />
      </label>

      <label>
        Brand:
        <select
          name="brand"
          value={formData.brand}
          onChange={onChange}
          className="border w-full"
        >
          <option value="">Brand</option>
          {options.brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>

      <label>
        Material:
        <select
          name="material"
          value={formData.material}
          onChange={onChange}
          className="border w-full"
        >
          <option value="">Material</option>
          {options.materials.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
      </label>

      <label>
        Style# :
        <select
          name="style"
          value={formData.style}
          onChange={onChange}
          className="border w-full"
        >
          <option value="">Style</option>
          {options.styles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
