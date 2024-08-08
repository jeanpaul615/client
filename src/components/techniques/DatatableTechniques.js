import React from 'react';
import DatatableContainer from '../../containers/StockSistema/Datatable';
import Sidebar from '../../containers/Sidebar';
import { format } from 'date-fns';
import { fetchTechniques } from '../../controllers/technique/Datatable';
import ModaltoAdd from './ModaltoAdd';
import { updateTecnico } from '../../controllers/Updates/Update';
import ModalUpdate from '../../containers/StockSistema/ModalUpdateStock';


const columns = [
  { title: 'Id', data: 'Id_tecnico' },
  { title: 'Cédula', data: 'Cedula' },
  { title: 'Nombre', data: 'Nombre' },
  { title: 'Teléfonos', data: 'Telefonos' },
  { title: 'Cargo', data: 'Cargo' },
  { 
    title: 'Fecha de Creación', 
    data: 'Fecha_creacion',
    render: (date) => format(new Date(date), 'dd/MM/yyyy') // Formato dd/mm/aaaa
  },
  { 
    title: 'Fecha de Modificación', 
    data: 'Fecha_modificacion',
    render: (date) => format(new Date(date), 'dd/MM/yyyy') // Formato dd/mm/aaaa HH:mm:ss
  },
  { 
    title: 'Fecha de Licencia', 
    data: 'Fecha_licencia',
    render: (date) => format(new Date(date), 'dd/MM/yyyy') 
  },
  { 
    title: 'Vencimiento de Licencia', 
    data: 'Vencimiento_licencia',
    render: (date) => format(new Date(date), 'dd/MM/yyyy') // Formato dd/mm/aaaa HH:mm:ss
  },
  { 
    title: 'Estado', 
    data: 'Estado', 
    render: function(data, type, row) {
      return data === 1
        ? '<span class="bg-green-500 text-white px-2 py-1 rounded">Activo</span>'
        : '<span class="bg-red-500 text-white px-2 py-1 rounded">Inactivo</span>';
    } 
  },
];

const TechniquesTable = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return (
  <>
    <Sidebar />
    <DatatableContainer
      columns={columns}
      fetchData={fetchTechniques}
      ModalComponent={ModaltoAdd} 
      ModalUpdate={ModalUpdate}
      title="Técnicos Registrados"
      TextoButton={"Agregar Nuevo Tecnico"}
      isAdmin={isAdmin}
      update={updateTecnico}
    />
  </>
)};

export default TechniquesTable;
