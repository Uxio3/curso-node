const empleados = [
    {
        id: 1,
        nombre: 'Fernando'
    },
    {
        id: 2,
        nombre: 'Pedro'
    },
    {
        id: 3,
        nombre: 'Adrian'
    }
];

const salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 1500
    }
];

const id = 1;

const getSalario = (id, callback) => {
    const salario = salarios.find( sal => sal.id === id);

    if (salario) {
        callback(null, salario);
        console.log(`Salario: ${salario.salario}`);
    } else {
        callback(`El salario con id ${id} no existe`);
    }
}

getSalario(id, (err, salario) => {
    if (err) {
        console.log('NO EXISTE SALARIO');
        return console.log(err);
    }
    
    console.log('EXISTE SALARIO');
    return console.log(salario);
})