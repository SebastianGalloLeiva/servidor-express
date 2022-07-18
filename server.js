const express = require("express");
const fs = require('fs');
const app = express();
const PORT = 8000;


class Contenedor {
    constructor (nombre) {
        this.nombre = nombre;
        this.nuevoid = 1;
        this.productos = [];
    }

    async getAll() { 
        let archivos
        try {     
            archivos = JSON.parse(await fs.promises.readFile(this.nombre, "utf-8")) 
            return archivos;    
        }  catch (err) { 
            throw new Error(err)  
       }      
    }
    async randomP(){

        try {
            const archivos = JSON.parse(await fs.promises.readFile(this.nombre, 'utf-8'));
            const random = Math.floor(Math.random() * archivos.length);
            return archivos[random];
        } catch (err) {
            throw new Error(err);
        }
    }
}

let contenedor = new Contenedor('./productos.txt');

const server=app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
})

server.on("error", (error)=> console.log(`Error en servidor ${error}`));

app.get("/", (req, res) => {
    res.send('<h1 style="color:blue;">Bienvenidos al servidor express</h1><h2 style="color:red;">Todos los productos! =>>>> <a href="/productos">aca</a></h2><h2 style="color:red;">Un producto random =>>>> <a href="/Random">aca</a></h2> ');
});

app.get("/productos", (req, res) => {
    contenedor.getAll().then(data => {
        res.send(JSON.stringify(data))
    }).catch(err => {
        res.send(err);
    })
})
app.get("/Random", (req, res) => {
    contenedor.randomP().then(data => {
        res.send(JSON.stringify(data));
    }).catch(err => {
        res.send(err);
    })
});





