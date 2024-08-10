import React, { useState, useEffect } from "react";
import { SaveStockTecnico } from "../../controllers/StockTechnique/SaveStockTecnico";
import { getTechnicians, getMaterials, getStockByMaterial } from "../../controllers/StockTechnique/addStock";

const ModaltoAdd = ({ isOpen, onClose }) => {
  const [materialData, setMaterialData] = useState({
    Nombre_material: "",
    Nombre: "",
    Stock: 0,
    Cantidad: 0,
    Id_stocksistema: null
  });

  const [technicians, setTechnicians] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [filteredTechnicians, setFilteredTechnicians] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [isMaterialValid, setIsMaterialValid] = useState(false);
  const [isTechnicianValid, setIsTechnicianValid] = useState(false);

  useEffect(() => {
    const fetchTechniciansAndMaterials = async () => {
      try {
        const techs = await getTechnicians();
        const filteredTechs = techs.filter(tech => tech.Estado === 1); // Filtrar técnicos activos
        setTechnicians(filteredTechs || []);

        const mats = await getMaterials();
        const filteredMats = mats.filter(mats => mats.Cantidad >= 1); // Filtrar materiales con cantidad mayor a 0
        setMaterials(filteredMats || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTechniciansAndMaterials();
  }, []);

  useEffect(() => {
    const validateMaterial = () => {
      setIsMaterialValid(materials.some(material => material.Nombre_material.toLowerCase() === materialData.Nombre_material.toLowerCase()));
    };

    const validateTechnician = () => {
      setIsTechnicianValid(technicians.some(technician => technician.Nombre.toLowerCase() === materialData.Nombre.toLowerCase()));
    };

    validateMaterial();
    validateTechnician();
  }, [materialData.Nombre_material, materialData.Nombre, materials, technicians]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isMaterialValid && isTechnicianValid) {
      try {
        const { Nombre_material, Cantidad, Nombre, Id_stocksistema } = materialData;
        const response = await SaveStockTecnico(Id_stocksistema, Nombre_material, Cantidad, Nombre);
        console.log("Operación exitosa:", response);
        onClose(); // Cierra el modal después de agregar
      } catch (error) {
        console.error("Error al realizar la operación:", error);
      }
    } else {
      console.error("Material o técnico no válido. Asegúrese de seleccionar un material y técnico autocompletado.");
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setMaterialData({
      ...materialData,
      [name]: value
    });

    if (name === "Nombre_material") {
      if (value.trim().length > 0) {
        const filtered = materials.filter((material) =>
          material.Nombre_material.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredMaterials(filtered);
      } else {
        setFilteredMaterials([]);
      }
    } else if (name === "Nombre") {
      if (value.trim().length > 0) {
        const filtered = technicians.filter((technician) =>
          technician.Nombre.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredTechnicians(filtered);
      } else {
        setFilteredTechnicians([]);
      }
    }
  };

  const handleMaterialClick = async (material) => {
    setMaterialData({
      ...materialData,
      Nombre_material: material.Nombre_material,
      Id_stocksistema: material.Id_stocksistema // Asegúrate de tener el Id_stocksistema necesario
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

  const handleTechnicianClick = (technician) => {
    setMaterialData({
      ...materialData,
      Nombre: technician.Nombre
    });
    setFilteredTechnicians([]); // Cierra la lista filtrada después de seleccionar un técnico
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Agregar Materiales</h2>
        <form onSubmit={handleSubmit}>
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
            <label className="block mb-2 text-sm font-medium text-gray-700">Nombre del Técnico</label>
            <input
              type="text"
              name="Nombre"
              value={materialData.Nombre}
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
                    {technician.Nombre}
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
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${!(isMaterialValid && isTechnicianValid) ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!(isMaterialValid && isTechnicianValid)}
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
