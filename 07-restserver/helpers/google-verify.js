const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleVerify(token = '') {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, picture, email, exp } = ticket.getPayload();


        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        if (exp < currentTime) {
            throw new Error('El token de Google ha expirado');
        }

        return {
            name,
            img: picture,
            email,
            currentTime
        };
    } catch (error) {
        console.error('Error verifying Google token:', error.message);
        throw new Error('El token de Google no es válido');
    }
}


module.exports = {
    googleVerify
}

