import React, { useState } from "react";
import { addStock } from "../../controllers/StockSistema/addStock"; // Ajusta la ruta según sea necesario

function ModaltoAdd({ isOpen, onClose }) {
  const [materialData, setMaterialData] = useState({
    Nombre_material: "",
    Cantidad: 0,
    Estado: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addStock(materialData);
      console.log("Stock agregado:", response);

      // Aquí puedes manejar la actualización de datos según tu aplicación,
      // por ejemplo, recargando los datos o actualizando el estado local.

      onClose(); // Cierra el modal después de agregar
    } catch (error) {
      console.error("Error al agregar material:", error);
      // Aquí puedes manejar el error según tu aplicación
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterialData({
      ...materialData,
      [name]: value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Agregar Materiales
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Nombre del Material
            </label>
            <input
              type="text"
              name="Nombre_material"
              value={materialData.Nombre_material}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Cantidad
            </label>
            <input
              type="number"
              name="Cantidad"
              value={materialData.Cantidad}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Estado
            </label>
            <input
              type="text"
              name="Estado"
              value={materialData.Estado}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModaltoAdd;
