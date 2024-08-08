import React from 'react';
import DatatableContainer from '../../../containers/StockSistema/Datatable';
import { fetchTechniques } from '../../../controllers/StockTechnique/Datatable';
import Sidebar from '../../../containers/Sidebar';
import ModaltoAdd from '../../Traslados/TecnicoaSistema/ModaltoAdd';

const columns = [
  { title: 'ID', data: 'Id_stocktecnico' },
  { title: 'Nombre Técnico', data: 'Nombre_tecnico' },
  { title: 'Material', data: 'Nombre_material' },
  { title: 'Cantidad', data: 'Cantidad' },
  { 
    title: 'Fecha de Modificación', 
    data: 'Fecha_modificacion',
    render: (data) => {
      // Asumiendo que data es un timestamp, puedes formatearlo a dd/mm/yyyy
      const dateObject = new Date(data);
      const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
      return formattedDate;
    }
  }
];

const fetchTechniquesFiltered = async () => {
  const techniques = await fetchTechniques();
  return techniques.filter(technique => technique.Cantidad > 0);
};

const TecnicoaSistemaTable = () => {
  return(
    <>
      <Sidebar />
      <DatatableContainer
        columns={columns}
        fetchData={fetchTechniquesFiltered}
        ModalComponent={ModaltoAdd}
        title="TRASLADO TECNICO A SISTEMA"
        isAdmin={false}
        TextoButton="Registrar Traslado Técnico a Sistema"
      />
    </>
  );
};

export default TecnicoaSistemaTable;
