import axios from "axios";

export const AddDevolucion = async (Nombre_material, Cantidad, Estado) => {
  try {
    const response = await axios.post('http://3.136.228.49:8001/devolucion/add-devolucion', {
      Nombre_material,
      Cantidad,
      Estado
    });
    const responsestocksistema = axios.post('http://3.136.228.49:8001/stock/update-stockbydevolucion',{
        Nombre_material,
        Cantidad,
        Estado
    });

    console.log(response.data, responsestocksistema.data);
    return response.data;
  } catch (error) {
    console.error('Error al agregar la devolución:', error);
    throw error;
  }
};
