

const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']

    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    state: {
        type: Boolean,
        default: false
    }
});

// Quitar __v y password del objeto que se retorna
UserSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
}





module.exports = model('User', UserSchema);