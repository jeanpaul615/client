import Swal from 'sweetalert2';
import React, { useState, useEffect } from "react";
import { getMaterials } from "../../../controllers/StockTechnique/addStock";
import { SaveTraslado } from "../../../controllers/Traslado/SaveTraslado";
import {  getStockByMaterial } from "../../../controllers/StockTechnique/addStock";

const ModaltoAdd = ({ isOpen, onClose }) => {
  const [materialData, setMaterialData] = useState({
    Sede_origen: "",
    Sede_destino: "",
    Nombre_material: "",
    Stock: 0,
    Cantidad: 0,
  });

  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      const mats = await getMaterials();
      setMaterials(mats || []);
    };

    fetchMaterials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { Sede_origen, Sede_destino, Nombre_material, Cantidad } = materialData;

    if (Sede_origen === Sede_destino) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La sede de origen y destino no pueden ser la misma.',
      });
      return;
    }

    try {
      const response = await SaveTraslado(Sede_origen, Sede_destino, Nombre_material, Cantidad);
      console.log("Operación exitosa:", response);
      onClose();
    } catch (error) {
      console.error("Error al realizar la operación:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterialData({
      ...materialData,
      [name]: value
    });

    if (name === "Nombre_material" && value.trim().length > 0) {
      setFilteredMaterials(
        materials.filter((material) =>
          material.Nombre_material.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredMaterials([]);
    }
  };

  const handleMaterialClick = async (material) => {
    setMaterialData({
      ...materialData,
      Nombre_material: material.Nombre_material
    });

    try {
      const stock = await getStockByMaterial(material.Nombre_material);
      setMaterialData((prevData) => ({
        ...prevData,
        Stock: stock
      }));
    } catch (error) {
      console.error("Error fetching stock by material:", error);
      setMaterialData((prevData) => ({
        ...prevData,
        Stock: 0 
      }));
    }

    setFilteredMaterials([]); // Cierra la lista filtrada después de seleccionar un material
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Registrar Nuevo Traslado</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Sede Origen</label>
            <select
              type="text"
              name="Sede_origen"
              value={materialData.Sede_origen}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecciona una Sede</option>
              <option value="Molivento">Molivento</option>
              <option value="Frailes">Frailes</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Sede Destino</label>
            <select
              type="text"
              name="Sede_destino"
              value={materialData.Sede_destino}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecciona una Sede</option>
              <option value="Molivento">Molivento</option>
              <option value="Frailes">Frailes</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Nombre del Material</label>
            <input
              type="text"
              name="Nombre_material"
              value={materialData.Nombre_material}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {filteredMaterials && filteredMaterials.length > 0 && (
              <ul className="mt-2 border border-gray-300 rounded-lg bg-white max-h-40 overflow-y-auto">
                {filteredMaterials.map((material) => (
                  <li
                    key={material.Id_stocksistema}
                    onClick={() => handleMaterialClick(material)}
                    className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                  >
                    {material.Nombre_material}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              name="Stock"
              value={materialData.Stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Cantidad</label>
            <input
              type="number"
              name="Cantidad"
              value={materialData.Cantidad}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
};

export default ModaltoAdd;
