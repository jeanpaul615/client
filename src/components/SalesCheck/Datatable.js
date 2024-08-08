import React from 'react';
import DatatableContainer from '../../containers/StockSistema/Datatable';
import { fetchFactura } from '../../controllers/Factura/factura';
import Sidebar from '../../containers/Sidebar';
import ModaltoAdd from './ModaltoAdd';
import ModalUpdate from '../../containers/StockSistema/ModalUpdateStock';

// Configuración de las columnas, incluyendo el formateo de la fecha
const columns = [
  { title: 'ID', data: 'Id_factura' },
  { title: 'Codigo', data: 'Codigo_factura' },
  { title: 'Proveedor ', data: 'Proveedor_factura' },
  { title: 'Observacion de Factura', data: 'Observacion_factura' },
  { title: 'Valor de Factura', data: 'Valor_factura' },
  { 
    title: 'Fecha de Factura', 
    data: 'Fecha_factura',
    render: (data) => {
      const dateObject = new Date(data);
      const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
      return formattedDate;
    }
  }
];

const SalesCheckTable = () => {
  return (
    <>
      <Sidebar />
      <DatatableContainer
        columns={columns}
        fetchData={fetchFactura}
        ModalUpdate={ModalUpdate}
        ModalComponent={ModaltoAdd}
        TextoButton={"Agregar Factura"}
        title="FACTURAS"
        isAdmin={false}
      />
    </>
  );
};

export default SalesCheckTable;
