const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleVerify(token = '') {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, picture, email } = ticket.getPayload();

        return {
            name,
            img: picture,
            email
        };
    } catch (error) {
        console.error('Error verifying Google token:', error.message);
        throw new Error('El token de Google no es válido');
    }
}


module.exports = {
    googleVerify
}

