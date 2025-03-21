const http = require('http');


http.createServer((req, res) => {

    console.log(req);



    res.write(JSON.stringify('Hola Mundo'));
    res.end();

})
    .listen(8080);

console.log('Escuchando el puerto', 8080);



















// res.writeHead(200, { 'Content-Type': ' application/json' });
// res.setHeader('Content-Disposition', 'attachment; filename=list.csv');
// res.writeHead(200, { 'Content-Type': ' application/csv' });

// const person = {
//     id: 1,
//     name: 'Dragos'
// }



// res.write(JSON.stringify('1, Dragos\n'));
// res.write(JSON.stringify('2, Maria\n'));
// res.write(JSON.stringify('3, Ale\n'));
// res.write(JSON.stringify('4, Paula\n'));