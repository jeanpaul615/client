import React, { useState, useEffect } from "react";
import { getTechnicians, getMaterials, getStockByMaterial, submitContrato } from "../../../controllers/Contrato/addStock"; // Ajusta la ruta según sea necesario

const ModaltoAdd = ({ isOpen, onClose }) => {
  const [contractData, setContractData] = useState({
    Nombre_contrato: "",
    Nombre_tecnico: "",
    Nombre_material: "",
    Stock: 0,
    Cantidad: 0,
  });

  const [technicians, setTechnicians] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [filteredTechnicians, setFilteredTechnicians] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);

  useEffect(() => {
    const fetchTechniciansAndMaterials = async () => {
      const techs = await getTechnicians(); // Filtrar técnicos activos
      setTechnicians(techs || []);

      if (contractData.Nombre_tecnico) {
        const mats = await getMaterials(contractData.Nombre_tecnico); // Filtrar materiales que su cantidad es mayor a 0
        setMaterials(mats || []);
      }
    };

    fetchTechniciansAndMaterials();
  }, [contractData.Nombre_tecnico]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContractData((prevState) => ({
      ...prevState,
      [name]: value
    }));

    if (name === "Nombre_material" && value.trim().length > 0 && contractData.Nombre_tecnico.trim().length > 0) {
      fetchStock(value, contractData.Nombre_tecnico);
    }

    if (name === "Nombre_material") {
      setFilteredMaterials(
        materials.filter((material) =>
          material.Nombre_material.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else if (name === "Nombre_tecnico") {
      setFilteredTechnicians(
        technicians.filter((technician) =>
          technician.Nombre_tecnico.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const fetchStock = async (Nombre_material, Nombre_tecnico) => {
    try {
      const stock = await getStockByMaterial(Nombre_material, Nombre_tecnico);
      setContractData((prevState) => ({
        ...prevState,
        Stock: stock
      }));
    } catch (error) {
      console.error("Error al obtener el stock por material:", error);
      setContractData((prevState) => ({
        ...prevState,
        Stock: 0,
        Cantidad: 0
      }));
    }
  };

  const handleMaterialClick = async (material) => {
    setContractData({
      ...contractData,
      Nombre_material: material.Nombre_material,
      Id_stocksistema: material.Id_stocksistema // Asegúrate de tener el Id_stocksistema necesario
    });

    try {
      const stock = await getStockByMaterial(material.Nombre_material, contractData.Nombre_tecnico);
      setContractData((prevData) => ({
        ...prevData,
        Stock: stock
      }));
    } catch (error) {
      console.error("Error fetching stock by material:", error);
      setContractData((prevData) => ({
        ...prevData,
        Stock: 0 
      }));
    }

    setFilteredMaterials([]); // Cierra la lista filtrada después de seleccionar un material
  };

  const handleTechnicianClick = (technician) => {
    setContractData((prevState) => ({
      ...prevState,
      Nombre_tecnico: technician.Nombre_tecnico
    }));
    setFilteredTechnicians([]); // Cierra la lista filtrada después de seleccionar un técnico
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContrato(contractData.Nombre_contrato, contractData.Nombre_material, contractData.Nombre_tecnico, contractData.Cantidad);
      console.log("Contrato agregado y stock actualizado");
      onClose();
    } catch (error) {
      console.error("Error al agregar contrato:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Agregar Contrato</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Número de Contrato</label>
            <input
              type="text"
              name="Nombre_contrato"
              value={contractData.Nombre_contrato}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Nombre del Técnico</label>
            <input
              type="text"
              name="Nombre_tecnico"
              value={contractData.Nombre_tecnico}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {filteredTechnicians.length > 0 && (
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
              value={contractData.Nombre_material}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {filteredMaterials.length > 0 && (
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
              value={contractData.Stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Cantidad</label>
            <input
              type="number"
              name="Cantidad"
              value={contractData.Cantidad}
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
