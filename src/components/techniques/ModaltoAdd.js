import React, { useState } from 'react';
import { addTechnician } from '../../controllers/technique/addTechnique';

const ModaltoAdd = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    Cedula: '',
    Nombre: '',
    Telefonos: '',
    Fecha_licencia: '',
    Vencimiento_licencia: '',
    Cargo: '',
    Estado: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTechnician(formData);
      onClose();
    } catch (error) {
      console.error('Error al guardar técnico:', error);
      // Aquí podrías mostrar un mensaje de error al usuario si es necesario
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center mt-9 ml-20">
      <div className="p-5 border w-full md:max-w-md shadow-lg rounded-md bg-white">
        <h3 className="text-lg leading-6 text-gray-900 font-bold text-center">Agregar Técnico</h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Cedula">
                Cédula
              </label>
              <input
                type="number"
                name="Cedula"
                id="Cedula"
                value={formData.Cedula}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nombre">
                Nombre
              </label>
              <input
                type="text"
                name="Nombre"
                id="Nombre"
                value={formData.Nombre}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Telefonos">
              Teléfonos
            </label>
            <input
              type="text"
              name="Telefonos"
              id="Telefonos"
              value={formData.Telefonos}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Fecha_licencia">
                Fecha de Licencia
              </label>
              <input
                type="date"
                name="Fecha_licencia"
                id="Fecha_licencia"
                value={formData.Fecha_licencia}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Vencimiento_licencia">
                Vencimiento de Licencia
              </label>
              <input
                type="date"
                name="Vencimiento_licencia"
                id="Vencimiento_licencia"
                value={formData.Vencimiento_licencia}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Cargo">
              Cargo
            </label>
            <select
              name="Cargo"
              id="Cargo"
              value={formData.Cargo}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Selecciona un cargo</option>
              <option value="Administrador">Administrador</option>
              <option value="Técnico">Técnico</option>
              <option value="Almacenista">Almacenista</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Estado">
              Estado
            </label>
            <select
              name="Estado"
              id="Estado"
              value={formData.Estado}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </select>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModaltoAdd;
