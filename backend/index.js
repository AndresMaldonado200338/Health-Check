const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/health-check', (req, res) => {
    res.status(200).json({ status: 'OK', date: new Date() });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});