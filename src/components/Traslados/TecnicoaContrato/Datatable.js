import React from 'react';
import DatatableContainer from '../../../containers/StockSistema/Datatable';
import { fetchContrato } from '../../../controllers/Contrato/Datatable';
import Sidebar from '../../../containers/Sidebar';
import ModaltoAdd from './ModaltoAdd';

const columns = [
  { title: 'ID', data: 'Id_contrato' },
  { title: 'N° Contrato', data: 'Nombre_contrato' },
  { title: 'Nombre Técnico', data: 'Nombre_tecnico' },
  { title: 'Material', data: 'Nombre_material' },
  { title: 'Cantidad', data: 'Cantidad' },
  { 
    title: 'Fecha de Instalación', 
    data: 'Fecha',
    render: (data) => {
      // Asumiendo que data es un timestamp, puedes formatearlo a dd/mm/yyyy
      const dateObject = new Date(data);
      const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
      return formattedDate;
    }
  }
];

const TecnicoaContratoTable = () => {
  return (
    <>
      <Sidebar />
      <DatatableContainer
        columns={columns}
        fetchData={fetchContrato}
        ModalComponent={ModaltoAdd}
        title="TRASLADO TÉCNICO A CONTRATO"
        isAdmin={false}
        TextoButton="Registrar Nuevo Traslado a Contrato"
      />
    </>
  );
};

export default TecnicoaContratoTable;
