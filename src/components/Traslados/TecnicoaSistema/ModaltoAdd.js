import React, { useState, useEffect } from "react";
import { getTechnicians, getMaterials, getStockByMaterial, SaveStockTecnico } from "../../../controllers/TecnicoaSistema/AddStock";

const ModaltoAdd = ({ isOpen, onClose }) => {
  const [materialData, setMaterialData] = useState({
    Nombre_material: "",
    Nombre_tecnico: "",
    Stock: 0,
    Cantidad: 0
  });

  const [technicians, setTechnicians] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [filteredTechnicians, setFilteredTechnicians] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);

  useEffect(() => {
    const fetchTechniciansAndMaterials = async () => {
      const techs = await getTechnicians();
      setTechnicians(techs || []);
    
      if (materialData.Nombre_tecnico) { // Solo llamar si Nombre_tecnico no está vacío
        const mats = await getMaterials(materialData.Nombre_tecnico);
        setMaterials(mats || []);
      }
    };

    fetchTechniciansAndMaterials();
  }, [materialData.Nombre_tecnico]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { Nombre_material, Cantidad, Nombre_tecnico } = materialData;
      const response = await SaveStockTecnico(Nombre_material, Cantidad, Nombre_tecnico);
      console.log("Operación exitosa:", response);
      onClose();
    } catch (error) {
      console.error("Error al realizar la operación:", error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setMaterialData({
      ...materialData,
      [name]: value
    });

    if (name === "Nombre_tecnico") {
      const filteredTechs = technicians.filter((technician) =>
        technician.Nombre_tecnico.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTechnicians(filteredTechs);
    }

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
      Nombre_material: material.Nombre_material,
      Id_stocksistema: material.Id_stocksistema
    });

    try {
      const stock = await getStockByMaterial(material.Nombre_material, materialData.Nombre_tecnico);
      setMaterialData((prevData) => ({
        ...prevData,
        Stock: stock.cantidad
      }));
    } catch (error) {
      console.error("Error fetching stock by material:", error);
      setMaterialData((prevData) => ({
        ...prevData,
        Stock: 0 
      }));
    }

    setFilteredMaterials([]);
  };

  const handleTechnicianClick = (technician) => {
    setMaterialData({
      ...materialData,
      Nombre_tecnico: technician.Nombre_tecnico
    });
    setFilteredTechnicians([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Agregar Materiales</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Nombre del Técnico</label>
            <input
              type="text"
              name="Nombre_tecnico"
              value={materialData.Nombre_tecnico}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {filteredTechnicians && filteredTechnicians.length > 0 && (
              <ul className="mt-2 border border-gray-300 rounded-lg bg-white max-h-40 overflow-y-auto">
                {filteredTechnicians.map((technician) => (
                  <li
                    key={technician.Id_tecnico}
                    onClick={() => handleTechnicianClick(technician)}
                    className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                  >
                    {technician.Nombre_tecnico}
                  </li>
                ))}
              </ul>
            )}
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
