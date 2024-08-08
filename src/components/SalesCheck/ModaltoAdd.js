import React,{useState} from "react";
import { AddFactura } from "../../controllers/Factura/factura";

const ModaltoAdd = ({ isOpen, onClose }) => {
  const [materialData, setMaterialData] = useState({
    Codigo_factura:"",
    Proveedor_factura: "",
    Observacion_factura: "",
    Valor_factura: 0,
    Fecha_factura: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { Codigo_factura, Proveedor_factura, Observacion_factura, Valor_factura,Fecha_factura } = materialData;
      const response = await AddFactura(Codigo_factura, Proveedor_factura, Observacion_factura,Valor_factura,Fecha_factura);
      console.log("Operación exitosa:", response);
      onClose(); // Cierra el modal después de agregar
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
  };

 

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Agregar Materiales</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Codigo de Factura</label>
            <input
              type="text"
              name="Codigo_factura"
              value={materialData.Codigo_factura}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Proveedor de Factura</label>
            <input
              type="text"
              name="Proveedor_factura"
              value={materialData.Proveedor_factura}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Observacion de Factura</label>
            <input
              type="text"
              name="Observacion_factura"
              value={materialData.Observacion_factura}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Valor de Factura</label>
            <input
              type="number"
              name="Valor_factura"
              value={materialData.Valor_factura}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Fecha de Factura</label>
            <input
              type="date"
              name="Fecha_factura"
              value={materialData.Fecha_factura}
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
