
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
            : reject(`El salario con id, ${id}, no existe`);

    })

    return promesa;

}

const id = 3;

let nombre;

getEmpleado(id)
    .then(empleado => {
        nombre = empleado;
        return getSalario(id)
    })
    .then(empleadoSalario => console.log('El empleado:', nombre, 'tiene un salario de:', empleadoSalario))
    .catch(err => console.log(err));


// getEmpleado(id)
//     .then(empleado => console.log(empleado))
//     .catch(err => console.log(err));

// getSalario(id)
//     .then(empleadoSalario => console.log(empleadoSalario))
//     .catch(err => console.log(err));

// getEmpleado(id)
//     .then(empleado => {

//         getSalario(id)
//             .then(empleadoSalario => {

//                 console.log('El empleado:', empleado, 'tiene un salario de', empleadoSalario);

//             })
//             .catch(err => console.log(err))

//     })
//     .catch(err => console.log(err));


