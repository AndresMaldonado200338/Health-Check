const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/health-check', (req, res) => {
    res.status(200).json({ status: 'OK', date: new Date() });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
