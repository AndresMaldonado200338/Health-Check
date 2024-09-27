document.addEventListener('DOMContentLoaded', () => {
    const status1 = document.getElementById('status1');
    const status2 = document.getElementById('status2');

    const checkServer = (url, statusElement) => {
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error en la respuesta del servidor');
                }
            })
            .then(data => {
                statusElement.textContent = `OK - ${data.date}`;
            })
            .catch(error => {
                statusElement.textContent = `Error: ${error.message}`;
            });
    };

    checkServer('http://localhost:3000/health-check', status1);
    checkServer('http://localhost:5000/health-check', status2);
});
