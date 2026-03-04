const getUsuarioById = (id, callback) => {
    const usuario = {
        id,
        nombre: 'Adrián'
    }

    setTimeout(() => {
        callback(usuario)
    }, 1500);
};

getUsuarioById(10, ({ id, nombre }) => {
    console.log(nombre);
    console.log(id);
});