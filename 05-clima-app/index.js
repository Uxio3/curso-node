import { leerInput, inquirerMenu, pausa, seleccionarLugar } from './helpers/inquirer.js';
import { leerDB, guardarDB } from './helpers/guardarArchivo.js';
import { Busquedas } from './models/busquedas.js';
import dotenv from 'dotenv';
dotenv.config();

const main = async () => {

    const busqueda = new Busquedas();

    let opt;

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                // Mostrar el mensaje
                const sitio = await leerInput('Ciudad: ');
                
                // Buscar los lugares
                const lugares = await busqueda.ciudad(sitio);

                // Seleccionar el lugar
                const id = await seleccionarLugar(lugares);

                if (id === 0) {
                    continue;
                }

                const lugarSeleccionado = lugares.find( l => l.id === id);

                // Clima del lugar
                const weather = await busqueda.weather(lugarSeleccionado.lat, lugarSeleccionado.lon);

                // Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad:'.green);
                console.log('-------------------------\n');
                console.log('Ciudad:', `${lugarSeleccionado.nombre}`.green);
                console.log('Latitud:', `${lugarSeleccionado.lat}`.green);
                console.log('Longitud:', `${lugarSeleccionado.lon}`.green);
                console.log('Temperatura Actual:', `${weather.temperatura}ºC`.green);
                console.log('Temperatura Mínima:', `${weather.min}ºC`.green);
                console.log('Temperatura Máxima:', `${weather.max}ºC`.green);
                console.log('Descripción:', `${weather.descripcion}`.green);

                // Guardar en historial
                const datoActual = {
                        'lugar': lugarSeleccionado.nombre,
                        'temperatura': weather.temperatura,
                        'descripcion': weather.descripcion
                }

                busqueda.agregarLugarEnDB(datoActual);

                break;
            case 2:
                // Leer DB
                busqueda.mostrarHistorial();
                break;
        }

        await pausa();

    } while (opt !== 0);
    
}

main();