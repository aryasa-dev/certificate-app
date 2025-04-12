import { ChangeEvent } from "react";
import { FormProps } from "../types";

type Props = {
  formData: FormProps;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export function Form({ formData, onChange }: Props) {
  return (
    <div className="flex flex-col px-4 py-6 gap-2 w-1/2">
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

      <label>
        Date of Purchase:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={onChange}
          className="border w-full px-2"
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
