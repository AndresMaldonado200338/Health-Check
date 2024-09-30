const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SERVER_HOST_1 = process.env.SERVER_HOST_1 || '127.0.0.1';
const SERVER_HOST_2 = process.env.SERVER_HOST_2 || '127.0.0.1';
const SERVER_PORT_1 = process.env.SERVER_PORT_1 || 3001;
const SERVER_PORT_2 = process.env.SERVER_PORT_2 || 3002;
const HEALTH_ENDPOINT = 'health-check';

let server1HealthData = {};
let server2HealthData = {};

let server1ConnectionLog = [];
let server2ConnectionLog = [];

async function fetchHealthData() {
  try {
    const server1Response = await axios.get(`http://${SERVER_HOST_1}:${SERVER_PORT_1}/${HEALTH_ENDPOINT}`);
    server1HealthData = server1Response.data;
    console.log('Datos de salud del backend 1:', server1HealthData);

    server1ConnectionLog.push({ timestamp: new Date(), status: 'connected' });
  } catch (error) {
    server1HealthData = { status: 'ERROR', error: error.message };
    console.error('Error al obtener datos del backend 1:', error.message);

    server1ConnectionLog.push({ timestamp: new Date(), status: 'ERROR' });
  }

  try {
    const server2Response = await axios.get(`http://${SERVER_HOST_2}:${SERVER_PORT_2}/${HEALTH_ENDPOINT}`);
    server2HealthData = server2Response.data;
    console.log('Datos de salud del backend 2:', server2HealthData);

    server2ConnectionLog.push({ timestamp: new Date(), status: 'connected' });
  } catch (error) {
    server2HealthData = { status: 'ERROR', error: error.message };
    console.error('Error al obtener datos del backend 2:', error.message);

    server2ConnectionLog.push({ timestamp: new Date(), status: 'ERROR' });
  }

  console.log('Datos de salud actualizados');
}

setInterval(fetchHealthData, 10000);

app.use(cors());

app.get('/logs', (req, res) => {
  res.status(200).json({
    server1: server1HealthData,
    server2: server2HealthData,
    server1History: server1ConnectionLog,
    server2History: server2ConnectionLog,
  });
});

app.listen(PORT, () => {
  console.log(`Middleware corriendo en http://localhost:${PORT}`);
});