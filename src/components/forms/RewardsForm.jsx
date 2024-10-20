import React, { useState } from "react";

export default function RewardsForm() {
  const [formData, setFormData] = useState({
    reward: "",
    description: "",
    points: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-md font-bold text-gray-700"
           htmlFor="reward"
           >
            Name
            </label>
            <input
            type="text"
            name="name"
            id="name" 
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            required
            />
        </div>

        <div className="mb-4">
          <label className="block text-md font-bold text-gray-700"
          htmlFor="description"
          >
            Description
            </label>
            <input
            type="text"
            name="description"
            id="description"  
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            required
            />
        </div>

        <div className="mb-4">
          <label className="block text-md font-bold text-gray-700"
          htmlFor="points_required"
          >
            Points Required
            </label>
            <input
            type="number"
            name="points_required"
            id="points_required"
            value={formData.points_required}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            required
            />
        </div>

        <div className="mb-4">
          <label className="block text-md font-bold text-gray-700"
          htmlFor="image"
          >
            Image URL
            </label>
            <input
            type="text"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            required    
            />
        </div>
        <div className="flex justify-end mt-6">
          <button
          type="submit"
          className="w-1/3 bg-primaryLighter text-white font-bold py-2 px-4 rounded hover:bg-primary focus:outline-none focus:ring-2 focus:ring-opacity-75"
          >
            Submit
          </button>
        </div>
            
      </form>
    </div>
  </div>
}
