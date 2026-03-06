import axios from "axios";
import { leerDB, guardarDB } from "../helpers/guardarArchivo.js";

export class Busquedas {
    historial = [];

    constructor() {
        //TODO: Leer DB si existe
        this.historial = [];

        const lugaresDB = leerDB();
        if (lugaresDB) {
            // Establecer lugares
            this.cargarLugaresFromDB(lugaresDB);
        }
    }

    paramsMapbox(lugar) {
        return {
            'language': 'es',
            'limit': 5,
            'access_token': process.env.MAPBOX_KEY,
            'q': `${lugar}`
        }
    }

    async ciudad(lugar = '') {

        try {
            // petición http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/search/geocode/v6/forward`,
                params: this.paramsMapbox(lugar)
            });

            const resp = await instance.get()

            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.properties.full_address,
                lon: lugar.properties.coordinates.longitude,
                lat: lugar.properties.coordinates.latitude
            }));           

        } catch (error) {
            return [];
        }
    }

    paramsOpenWeather(lat, lon) {
        return {
            'lat': lat,
            'lon': lon,
            'units': 'metric',
            'lang': 'es',
            'appid': process.env.OPENWEATHER_KEY
        }
    }

    async weather(lat, lon) {

        try {
            // petición http
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/3.0/onecall`,
                params: this.paramsOpenWeather(lat, lon)
            });

            const resp = await instance.get();
            const {current, daily} = resp.data; 

            return {
                temperatura: current.temp,
                descripcion: current.weather[0].description,
                min: daily[0].temp.min,
                max: daily[0].temp.max
            };           

        } catch (error) {
            return console.log('Error openweatherapi', error);;
        }
    }

    agregarLugarEnDB(lugar = {}) {
        this.historial.push(lugar);
        guardarDB(this.historial);
    }

    cargarLugaresFromDB(lugares = []){
        lugares.forEach(lugar => {
            this.historial.push(lugar);
            
        })
    }

    mostrarHistorial() {
        this.historial.forEach((busqueda, i) => {
            const idx = `${i + 1}.`.green;
            const ciudad = `${busqueda.lugar}`.magenta;
            const temperatura = `${busqueda.temperatura}ºC`.yellow;
            const descripcion = `${busqueda.descripcion}`.cyan;

            console.log(`${idx} ${ciudad} || ${temperatura} || ${descripcion}`);;

        });
    }

}