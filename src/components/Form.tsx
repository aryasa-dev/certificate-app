import { ChangeEvent, SetStateAction } from "react";
import { FormProps } from "../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  formData: FormProps;
  setFormData: (value: SetStateAction<FormProps>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export function Form({ formData, setFormData, onChange }: Props) {
  console.log(formData.date);
  const selectedDate = formData.date ? new Date(formData.date) : null;

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
          <option value="Tiktok">Tiktok</option>
          <option value="Shopee">Shopee</option>
          <option value="Lazada">Lazada</option>
          <option value="Offline">Offline</option>
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
          // onChange={(date: Date) => {
          //   setFormData((prev) => ({ ...prev, date: isoDate }));
          // }}
          dateFormat="yyyy-MM-dd"
          className="block border w-full px-2 py-1"
          placeholderText="Select a date"
        />
        {/* <input
          type="date"
          name="date"
          value={formData.date}
          onChange={onChange}
          className="border w-full px-2"
        /> */}
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
          <option value="Cellini">Cellini</option>
          <option value="Checkers">Checkers</option>
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
          <option value="Genuine Leather">Genuine Leather</option>
          <option value="Full Grain Leather">Full Grain Leather</option>
          <option value="Synthetic Leather">Synthetic Leather</option>
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
          {Array.from({ length: 29 }, (_, i) => {
            const value = `${(i + 1).toString().padStart(2, "0")}N`;
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}
