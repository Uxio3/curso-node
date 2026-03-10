const { crearArchivo } = require('./helpers/multiplicar.js');
const argv = require('./config/yargs.js');
var colors = require('colors/index.js');

console.clear();

console.log(argv);

crearArchivo(argv.listar, argv.base, argv.hasta)
    .then(nombreArchivo => console.log(nombreArchivo, 'creado'.green))
    .catch(err => console.log(err));


// const [ , , arg3 = 'base=5'] = process.argv;
// const [ , base = 5] = arg3.split('=');

// console.log(base);



// const base = 3;