console.log('Inicio del programa');
console.time();

setTimeout(() => {
    console.log('Primer timeOut');
}, 3000);

setTimeout(() => {
    console.log('Segundo timeOut');
    console.timeEnd();
}, 0);

console.log('Fin del programa');