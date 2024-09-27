const express = require('express');
const axios = require('axios');
const app = express();

let statusLog = []; 

const checkBackendStatus = async (req, res, next) => {
    try {
        const response = await axios.get('http://localhost:4000/status');
        const status = response.data;
        
        statusLog.push({
            status: 'OK',
            date: new Date().toISOString()
        });
    } catch (error) {
        statusLog.push({
            status: 'Timeout/Error',
            date: new Date().toISOString()
        });
    }
    next();
};

// Usa el middleware en todas las rutas
app.use(checkBackendStatus);

app.get('/logs', (req, res) => {
    res.json(statusLog);
});

app.listen(5000, () => {
    console.log('Middleware corriendo en el puerto 5000');
});
