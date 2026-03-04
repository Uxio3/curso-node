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

const getSalario = (id) => {
    return new Promise((resolve, reject) => { 
        const salario = salarios.find( sal => sal.id === id)?.salario;

        (salario) ? resolve(salario) : reject('NO existe salario');
    });
};

getSalario(id)
    .then(salario => console.log(salario))
    .catch(err => console.log(err));