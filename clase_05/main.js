const crearAleatorios = () => {
  let resultado = {};
  for (let index = 0; index < 10000; index++) {
    const numeroCreado = Number.parseInt(Math.random() * 21);

    Object.keys(resultado).includes(numeroCreado.toString())
      ? (resultado[numeroCreado] += 1)
      : (resultado[numeroCreado] = 1);
  }
  console.log(resultado);
};
//crearAleatorios();

const arrayPrueba = [
  { id: 1, nombre: "Lapicera", precio: 20 },
  { id: 1, nombre: "Goma", precio: 65 },
  { id: 1, nombre: "papel", precio: 52 },
];

const datosObjetos = (obj) => {
    const respuesta = {}
    respuesta.nombres = []
    const precios = []
    respuesta.preciosTotales = 0
    obj.forEach(producto => {
        respuesta.nombres.push(producto.nombre ) 
        precios.push(producto.precio)
        respuesta.preciosTotales += producto.precio

    });
    respuesta.precioProm = Number((respuesta.preciosTotales / obj.length * 100 / 100).toFixed(2))
    respuesta.precioMax = Math.max(...precios)
    respuesta.precioMim = Math.min(...precios)
    console.log(...precios)
    console.log(respuesta)
};

datosObjetos(arrayPrueba)
