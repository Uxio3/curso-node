const fs = require('node:fs');
const { argv } = require('node:process');
const colors = require('colors');

const crearArchivo = async(listar, base = 5, hasta = 10) => {
    
    try {
        let salida = '';

        if (hasta < 1) {
            throw 'hasta debe ser mayor o igual a 1';
        }

        for (let i = 1; i <= hasta; i++) {
            salida += `${base} x ${i} = ${base * i}\n`;
        }

        if (listar) {
            console.log('==================='.bgRed);
            console.log('    Tabla del:', base);
            console.log('==================='.bgRed);

            console.log(salida);
        }

        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);

        return `tabla-${base}.txt`.yellow;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crearArchivo
}