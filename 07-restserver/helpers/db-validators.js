const Role = require('../models/role');
const User = require('../models/user');


const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`El rol ${role} no esta registrado en la BD`);
    }
}


const emailExists = async (email = '') => {
    //Verificar si el correo existe
    const emailExists2 = await User.findOne({ email });
    if (emailExists2) {
        throw new Error(`El correo: ${email} ya está registrado`);
    }
}



const existsUserId = async (id) => {

    //Verificar si el correo existe
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(`El id: ${id} no existe`);
    }

}


module.exports = { isValidRole, emailExists, existsUserId }


