const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


app.use((req, res, next) => {
    const originalSend = res.send;

    res.send = function (body) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
        };
        console.log(logEntry); 

        originalSend.call(this, body);
    };

    next(); 
});

app.get('/health-check', (req, res) => {
    try {
        res.status(200).send('Instance is running');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

