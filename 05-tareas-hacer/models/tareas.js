/**
 * _listado: 
 *      { 'uuid-1231242-1232341-2: { id12, desc:asd, completadoEn:31313 }' }
 *      { 'uuid-1231242-1232341-2: { id12, desc:asd, completadoEn:31313 }' }
 *      { 'uuid-1231242-1232341-2: { id12, desc:asd, completadoEn:31313 }' }
 * 
 */

import { Tarea } from './tarea.js';

export class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    // Borrar tarea
    borrartarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    // Cra tarea solo con la descripción
    crearTarea(desc = ''){
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }
    // Rellena _listado con las tareas del data.json que es un array de objectos
    cargarTareasFromArray(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }
    // Muestra todas las tareas y su estado
    listadoCompleto() {
        let numero = 0;
        let salida = '';

        console.log();
        Object.values(this._listado).forEach( ({desc, completadoEn}) => {
            numero++;
            const idx = `${numero}.`.green;
            const estado = (completadoEn === null) ? 'Pendiente'.red : 'Completada'.green;

            salida += `${idx} ${desc} :: ${estado}\n`;
        });

        console.log(salida);;
    }

    // Muestra todas las tareas según el estado pedido
    listarPendientesCompletadas(completadas = true) {

        let numero = 0;
        let salida = '';
        // Completadas
        if (completadas) {
            this.listadoArr.forEach(({desc, completadoEn}) => {

                if (completadoEn) {
                    numero++;
                    const idx = `${numero}.`.green;

                    salida += `${idx} ${desc} :: ${completadoEn.green}\n`;
                }
            });

            return console.log(salida);;
        } 
        // Pendientes
        this.listadoArr.forEach(({desc, completadoEn}) => {

            if (!completadoEn) {
                numero++;
                const idx = `${numero}.`.green;
                const estado = 'Pendiente'.red;

                salida += `${idx} ${desc} :: ${estado}\n`;
            }
            
        });

        return console.log(salida);;
    }

    // Devuelve el listado pero en array
    get listadoArr() {
        const listado = [];

        Object.entries(this._listado).forEach(([clave, valor]) => {
            // const tarea = this._listado[clave];
            listado.push(valor);
        });

        return listado;
    }

    // Cambiar estados
    toggleCompletadas(ids = []) {

        ids.forEach( id => {
            const tarea = this._listado[id];

            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}