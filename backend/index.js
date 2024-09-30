const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const INSTANCE_ID = process.env.INSTANCE_ID || 'Instancia Backend';

app.use(cors());

app.get('/health-check', (req, res) => {
    res.status(200).json({ status: 'OK', date: new Date(), instance: INSTANCE_ID });
});

app.listen(PORT, () => {
    console.log(`Bakcend instance is running on port ${PORT}`);
});