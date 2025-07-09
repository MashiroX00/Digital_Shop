"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
export default function ProductAdd() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [isResponse, setIsResponse] = useState(false);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsResponse(false);
  };

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setIsResponse(false);
  };
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // You can use e.target.result as the image src
        // Example: set a preview state if needed
        setPreview(e.target.result);
        console.log("Image data URL:", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("catagory", data.category);
    formData.append("file", file);
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + "products/";
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      setResult(await response.json());
      setIsResponse(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const SuccessPopup = () => {Swal.fire({
    title: "Success!",
    text: "Product added successfully.",
    icon: "success",
    confirmButtonText: "OK",
  })};
  return (
    <div
      className="flex flex-col my-5 mx-5 md:my-15 md:mx-15 bg-[var(--oxford-blue)]/30 rounded-xl p-5 shadow-md shadow-white" data-aos="fade-up"
    >
      {isResponse ? <SuccessPopup /> : null}
      <h1 className="text-2xl font-bold underline underline-offset-2">
        Add new product
      </h1>
      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label className="flex flex-col">
          Product Name:
          <input
            type="text"
            name="name"
            className="border border-gray-300 rounded p-2"
            required
            onChange={handleDataChange}
          />
        </label>
        <label className="flex flex-col">
          Description:
          <textarea
            name="description"
            className="border border-gray-300 rounded p-2"
            required
            onChange={handleDataChange}
          ></textarea>
        </label>
        <label className="flex flex-col">
          Price:
          <input
            type="number"
            name="price"
            className="border border-gray-300 rounded p-2"
            required
            onChange={handleDataChange}
          />
        </label>
        <label className="flex flex-col" onChange={handleDataChange}>
          Category:
          <select name="category" className="border rounded p-2" required>
            <option value="" className="text-black">
              Select a category
            </option>
            <option value="minecraft" className="text-black">
              Minecraft
            </option>
            <option value="genshin" className="text-black">
              Genshin
            </option>
            <option value="honkaistarrail" className="text-black">
              Honkai Star Rail
            </option>
            <option value="Other" className="text-black">
              Other
            </option>
          </select>
        </label>
        <label className="flex flex-col">
          Product Image:
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover mb-2 border"
            />
          ) : null}
          <input
            type="file"
            name="imageUrl"
            className="border border-gray-300 rounded p-2"
            required
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/jpg"
          />
        </label>
        {isResponse ? <button
          type="button"
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600" 
        >
          {result.message}
        </button> : <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>}
      </form>
    </div>
  );
}
