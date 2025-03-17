
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

const getEmpleado = (id, callback) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre;

    if (empleado) {
        callback(null, empleado);
    } else {
        callback(`Empleado con id ${id} no existe`);
    }

    return empleado;
}

const getSalario = (id, callback) => {
    const empleadoSalario = salarios.find((s) => s.id === id)?.salario;

    if (empleadoSalario) {
        callback(null, empleadoSalario);
    } else {
        callback(`Salario con id ${id} no existe`);
    }

}

const id = 3;

getEmpleado(id, (err, empleado) => {

    if (err) {
        console.log('ERROR!');
        return console.log(err);
    }



    getSalario(id, (err, empleadoSalario) => {

        if (err) {
            console.log('ERROR!');
            return console.log(err);
        }

        console.log('El empleado:', empleado, 'tiene un salario de', empleadoSalario);

    })
});











