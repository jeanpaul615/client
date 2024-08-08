import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import ArticleDetailModal from './ArticleDetailModal';

const DatatableContainer = ({ columns, fetchData, title, isAdmin, TextoButton, ModalComponent, ModalUpdate, update, tableName }) => {
  const [data, setData] = useState([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isArticleDetailModalOpen, setIsArticleDetailModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const tableRef = useRef(null);
  const dataTable = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadData();
  }, [fetchData]);

  useEffect(() => {
    if ($.fn.DataTable && data.length > 0) {
      if (dataTable.current) {
        dataTable.current.destroy(true);
      }

      const columnsWithOptions = [
        ...columns,
        {
          title: 'Opciones',
          data: null,
          render: function () {
            return `
              ${tableName === 'datatableStockSistema' ? 
                '<button class="detail-btn text-green-600 hover:text-green-900 font-bold">Ver</button>' : ''}
              ${isAdmin ? 
                '<button class="update-btn text-blue-600 hover:text-blue-900 font-bold">Actualizar</button>' : ''}
            `;
          }
        }
      ];

      dataTable.current = $(tableRef.current).DataTable({
        data,
        columns: columnsWithOptions,
        paging: true,
        searching: true,
        info: true,
        lengthMenu: [1000,100,50,25,10,5],
        autoWidth: true
      });

      // Click event to open article detail modal
      $('#datatable').on('click', 'button.detail-btn', function () {
        const row = dataTable.current.row($(this).parents('tr')).data();
        setSelectedArticle(row);
        setIsArticleDetailModalOpen(true);
      });

      $('#datatable').on('click', 'button.update-btn', function () {
        const row = dataTable.current.row($(this).parents('tr')).data();
        const { Image_url, ...restRow } = row;
        setSelectedRow(restRow);
        setIsModalUpdateOpen(true);
      });

      return () => {
        if (dataTable.current) {
          dataTable.current.destroy(true);
        }
      };
    }
  }, [data, columns, isAdmin, tableName]);

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#datatable' });
    doc.save('data.pdf');
  };

  const handleExportExcel = () => {
    const workbook = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(document.getElementById('datatable'));
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  const handleAddStock = () => {
    setSelectedRow(null);
    setIsModalAddOpen(true);
  };

  const handleCloseModalAdd = () => {
    setIsModalAddOpen(false);
  };

  const handleCloseModalUpdate = () => {
    setIsModalUpdateOpen(false);
  };

  const handleCloseArticleDetailModal = () => {
    setIsArticleDetailModalOpen(false);
  };

  return (
    <div className="mx-auto mt-36 mb-8 px-4 md:px-8 md:pl-72 rounded-lg border-2 border-gray-300 p-4 overflow-hidden shadow-lg font-semibold text-left">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <button onClick={handlePrintPDF} className="md:mr-12 m-4 mr-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Imprimir PDF
          </button>
          <button onClick={handleExportExcel} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Exportar a Excel
          </button>
        </div>
        {ModalComponent && (
          <button onClick={handleAddStock} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5">
            {TextoButton}
          </button>
        )}
      </div>
      <h1 className="text-center text-2xl font-bold mb-4">{title}</h1>
      <table id="datatable" ref={tableRef} className="table-auto w-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col">{column.title}</th>
            ))}
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={isAdmin ? item.Id_stocksistema : item.id}>
              {columns.map((column, colIndex) => (
                <td key={`${isAdmin ? item.Id_stocksistema : item.id}-${colIndex}`}
                    className={column.data === 'Nombre_material' || column.data === 'id' ? 'name-cell cursor-pointer' : ''}>
                  {item[column.data]}
                </td>
              ))}
              <td>
                {tableName === 'datatableStockSistema' && (
                  <button className="detail-btn text-green-600 hover:text-green-900 font-bold">Ver</button>
                )}
                {isAdmin && (
                  <button className="update-btn text-blue-600 hover:text-blue-900 font-bold">Actualizar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalAddOpen && ModalComponent && (
        <ModalComponent
          isOpen={isModalAddOpen}
          onClose={handleCloseModalAdd}
        />
      )}

      {isModalUpdateOpen && ModalUpdate && (
        <ModalUpdate
          isOpen={isModalUpdateOpen}
          onClose={handleCloseModalUpdate}
          rowData={selectedRow}
          update={update}
        />
      )}

      <ArticleDetailModal
        isOpen={isArticleDetailModalOpen}
        onClose={handleCloseArticleDetailModal}
        article={selectedArticle}
      />
    </div>
  );
};

export default DatatableContainer;
