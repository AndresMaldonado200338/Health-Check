const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/health-check', (req, res) => {
    try {
        res.status(200).json({ status: 'OK', date: new Date() });
    } catch (error) {
        res.status(500).json({ status: 'ERROR' , error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});