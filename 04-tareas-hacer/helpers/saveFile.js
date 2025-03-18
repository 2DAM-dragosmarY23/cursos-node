const fs = require('fs');

const saveDB = (data) => {

    const file = './database/data.json';
    
    fs.writeFileSync(file, JSON.stringify(data));
    
}

module.exports = {
    saveDB
}


