const empleados = [
    {
        id: 1,
        nombre: 'Fernando'
    },
    {
        id: 2,
        nombre: 'Melissa'
    },
    {
        id: 3,
        nombre: 'Juan'
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


const getEmpleado = (id) => {

    const promesa = new Promise((resolve, reject) => {

        const empleado = empleados.find((e) => e.id === id)?.nombre;

        (empleado)
            ? resolve(empleado)

            : reject(`No existe empleado con id ${id}`);

    });

    return promesa;
}

const getSalario = (id) => {

    const promesa = new Promise((resolve, reject) => {

        const empleadoSalario = salarios.find((s) => s.id === id)?.salario;

        (empleadoSalario)
            ? resolve(empleadoSalario)
            : reject(`El salario con id ${id}, no existe`);

    })

    return promesa;

}

const id = 3;

const getInfoUsuario = async (id) => {

    try {
        const empleado = await getEmpleado(id);
        const empleadoSalario = await getSalario(id);


        return `El empleado: ${empleado} tiene un salario de: ${empleadoSalario}`;
    } catch (error) {
        throw error;
    }

}

getInfoUsuario(id)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));

