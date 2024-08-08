import React, { useEffect, useState } from "react";
import { format } from 'date-fns';

const ModalUpdate = ({ isOpen, onClose, rowData, update }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (rowData) {
      const formattedData = {
        ...rowData,
        Fecha_modificacion: format(new Date(rowData.Fecha_modificacion), 'dd/MM/yyyy HH:mm:ss'),
        Fecha_creacion: format(new Date(rowData.Fecha_creacion), 'dd/MM/yyyy HH:mm:ss'),
      };
      setFormData(formattedData);
    }
  }, [rowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update(formData);
    onClose();
  };

  const handleStatusChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      Estado: prevData.Estado === 1 ? 0 : 1
    }));
  };

  if (!isOpen) return null;

  // Filtra las claves que no deseas mostrar en el modal
  const filteredKeys = Object.keys(formData).filter(key => key !== 'Estado');

  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredKeys.map((key) => (
            <div key={key} className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">{key}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <div className="mb-4 col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">Estado</label>
            <button
              type="button"
              onClick={handleStatusChange}
              className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                formData.Estado === 1
                  ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400'
                  : 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400'
              }`}
            >
              {formData.Estado === 1 ? 'Activo' : 'Inactivo'}
            </button>
          </div>
          <div className="col-span-2 flex justify-end gap-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Actualizar
            </button>
            <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
