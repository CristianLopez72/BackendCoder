const { Console, clear } = require('console');
const fs = require('fs');
const path = require('path');

class Contenedor {
    nombreArchivo;

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    async leerArchivo() {
        const registros = await fs.promises.readFile(`${this.nombreArchivo}`,'utf-8');
        return JSON.parse(registros);
    }

    async grabarArchivo(productos) {
        const registros = JSON.stringify(productos,null,'\t');
        await fs.promises.writeFile(nombreArchivo,registros);
    } 

    async getAll() {
        const productos = await this.leerArchivo();
        return productos;
    }
 
    async getById(id) {
        const productos = await this.leerArchivo();
        const indice = productos.findIndex((unProducto) => unProducto.id === id);

        if(indice < 0) {
            return null;
        }

        return productos[indice];
    }

    async save(dato) {

        if(!dato.title || !dato.price || typeof dato.title!== 'string' || typeof dato.price !== 'number')
            throw new Error('Datos incorrectos');

        const newId = 1;
        const newProducto = {};

        const productos = await this.leerArchivo();

        if (productos.length === 0) {
            dato.id = newId;
        }
        else {
            dato.id = productos[productos.length-1].id +1;
        }

        const altaProducto = {
            title: dato.title,
            price: dato.price,
            id: dato.id
        }
  
        productos.push(altaProducto);
        await this.grabarArchivo(productos);
        return dato.id;
   }

    async deleteAll() {
        await this.grabarArchivo([]);
        return;
    }

    async deleteById (idaBorrar) {
        const productos = await this.leerArchivo();
   
        const indice = productos.findIndex((unProducto) => unProducto.id === idaBorrar)
        if(indice < 0) {
            return indice;
        }

        productos.splice(indice,1);
        await this.grabarArchivo(productos);
        return indice;
    }  
}
const nombreArchivo = 'productos.txt';
const contenedor1 = new Contenedor (nombreArchivo);
const corridaDesafio = async () => {
    console.log(' ');
    console.log('Inicio de la Corrida');
    //Corre getAll
    console.log('1- getAll: Trae todos los productos del Archivo');
    const getAll1 = await contenedor1.getAll();
    console.log(getAll1);
    console.log(' ');

    //Corre getById
    console.log('2- getById: Trae el producto del archivo con un ID especifico, en este caso el 3:');
    const getById1 = await contenedor1.getById(3);
    console.log(getById1);
    if(getById1 === null) {
        console.log('El producto a buscar no existe')
    }
    console.log(' ');

    //Corre save
    console.log('3- save: Agrega un producto al archivo, en este caso la Pasta de Aceitunas');
    const save1 = await contenedor1.save({title: "Pasta de Aceitunas",price: 1000});
    console.log('Se agrego con el id: ');
    console.log(save1);
    const archivoSave = await contenedor1.getAll();
    console.log(archivoSave)
    console.log(' ');
    
    //Corre deleteById
    console.log('4- deleteById: Borra un producto del archivo con un ID especifico, en este caso el 7:');
    const deleteById1 = await contenedor1.deleteById(7);
    const archivodeleteByID = await contenedor1.getAll();
    console.log(deleteById1);
    if(deleteById1 === -1) {
        console.log('El producto a Eliminar no existe')
    }
    else {
        console.log(archivodeleteByID)
    }
    console.log(' ');

    //Corre deleteAll
    console.log('5- deleteAll: Borra todos los productos del archivo');
    const deleteAll1 = await contenedor1.deleteAll([]);
    const archivodeleteAll = await contenedor1.getAll();
    console.log(archivodeleteAll)
    console.log('Fin de la Corrida');
}

corridaDesafio();