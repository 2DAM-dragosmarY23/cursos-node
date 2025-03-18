const fs = require('fs');

const readDB = (data) => {
    const file = './database/data.json';

    if (!fs.existsSync(file)) {

        return null;

    }
    
    const info = fs.readFileSync(file,{encoding: 'utf-8'});
    const dataDB = JSON.parse(info);

    return dataDB;
}

module.exports = {
    readDB
}