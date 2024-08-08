import React, { useState } from "react";
import ModaltoAdd from "./StockSistema/ModaltoAdd";
import legonbanner from "../assets/legon_banner.png";
import leon_legon from "../assets/leon_legon.png";

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuTransfer, setmenuTransfer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTransfer = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
    setmenuTransfer(!menuTransfer);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  return (
    <div className="fixed top-0 left-0 z-40 w-full">
      <div className="border-white border-b-2 bg-slate-800 h-20 items-center flex">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={legonbanner}
            className="pl-10 h-20 w-full"
            alt="legonbanner"
          />
        </a>
        <div className="mt-36 md:ml-96 md:pl-32">
          <button
            onClick={openModal}
            className="md:fixed flex justify-left items-left top-4 right-4 mt-2 bg-amber-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
          >
            AGREGAR MATERIAL NUEVO
          </button>
        </div>
        <div className="flex-1 flex justify-end pr-5">
          <button
            type="button"
            className="flex p-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 bg-white"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <aside
        className={`fixed top-20 left-0 bottom-0 w-64 transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-slate-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/agregarinventario"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="pr-2 h-5 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#fac003"
                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                  />
                </svg>
                <span className="flex-1 ms-1 whitespace-nowrap text-yellow-400">
                  Agregar Materiales
                </span>
              </a>
            </li>
            <li>
              <a
                href="/datatablestock"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-4 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#ebebeb"
                    d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"
                  />
                </svg>
                <span className="ms-3">Inventario</span>
              </a>
            </li>
            <li onClick={toggleTransfer}>
              <a
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-4 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#ffffff"
                    d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Traslados</span>
                <span className="relative inline-block">
                  <span className="mr-5 absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    3
                  </span>
                </span>
              </a>
            </li>
            {menuTransfer && (
              <ul className="space-y-2 pl-8">
                <li>
                  <a
                    href="/tecnicoacontrato"
                    className="flex items-center p-2 text-gray-900 rounded-lg italic dark:text-white hover:bg-gray-100 hover:text-black bg-gray-700 group"
                  >
                    Tecnico a Contrato
                  </a>
                </li>
                <li>
                  <a
                    href="/tecnicoasistema"
                    className="flex items-center p-2 text-gray-900 rounded-lg italic dark:text-white hover:bg-gray-100 hover:text-black bg-gray-700 group"
                  >
                    Tecnico a Sistema
                  </a>
                </li>
                <li>
                  <a
                    href="/entresedes"
                    className="flex items-center p-2 text-gray-900 rounded-lg italic dark:text-white hover:bg-gray-100 hover:text-black bg-gray-700 group"
                  >
                    Prestamo Entre Sedes
                  </a>
                </li>
              </ul>
            )}
            <li>
              <a
                href="/datatabletechnical"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-4 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="#ffffff"
                    d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Stock del Tecnico
                </span>
              </a>
            </li>
            <li>
              <a
                href="/devoluciones"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="h-4 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#ffffff"
                    d="M48.5 224L40 224c-13.3 0-24-10.7-24-24L16 72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8L48.5 224z"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Devoluciones
                </span>
              </a>
            </li>
            <li>
              <a
                href="/datatabletechniques"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="h-4 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#ffffff"
                    d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h54.1l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109V104c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7H352c-8.8 0-16-7.2-16-16V102.6c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Tecnicos Registrados
                </span>
              </a>
            </li>
            <li>
              <a
                href="/factura"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg 
                className="h-4 w-5"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    fill="#ffffff"
                    d="M0 112.5L0 422.3c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4l0-309.9c0-18-10.1-35-27-41.3C462 15.9 375 38.1 288 60.3C208.2 80.6 128.4 100.9 48.7 79.1C25.6 72.8 0 88.6 0 112.5zM288 352c-44.2 0-80-43-80-96s35.8-96 80-96s80 43 80 96s-35.8 96-80 96zM64 352c35.3 0 64 28.7 64 64l-64 0 0-64zm64-208c0 35.3-28.7 64-64 64l0-64 64 0zM512 304l0 64-64 0c0-35.3 28.7-64 64-64zM448 96l64 0 0 64c-35.3 0-64-28.7-64-64z"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Facturas</span>
              </a>
            </li>
            <li>
              <a
                href="/"
                onClick={handleLogout}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="h-4 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#ffffff"
                    d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Cerrar Sesión
                </span>
              </a>
            </li>
          </ul>
          <div
            className="relative h-64 w-full mb-24 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-slate-800"
            style={{
              backgroundImage: `url(${leon_legon})`,
              backgroundSize: "contain",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </aside>
      <ModaltoAdd isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Sidebar;
