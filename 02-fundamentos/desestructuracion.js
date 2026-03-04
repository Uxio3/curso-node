const deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneración',
    getNombre() {
        return `${this.nombre} ${this.apellido}`;
    }
}

const { nombre, apellido, poder, edad = 0 } = deadpool;

console.log(nombre, apellido, poder, edad);