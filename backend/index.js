const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

app.get('/status', (req, res) => {
    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`Backend corriendo en el puerto ${port}`);
});
//Asi se ejecuta:
//set PORT=4000 
//node index.js