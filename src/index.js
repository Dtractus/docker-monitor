// Import Express and dockerManager
const express = require('express');
const path = require('path');
const dockerManager = require('./dockerManager');

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Serve static files from the `/views` directory
app.use(express.static(path.join(__dirname, 'views')));

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route to list all containers
app.get('/containers', async (req, res) => {
    try {
        const containers = await dockerManager.listContainers();
        res.json(containers);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Route to restart a container
app.post('/containers/:id/restart', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await dockerManager.restartContainer(id);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Route to stop a container
app.post('/containers/:id/stop', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await dockerManager.stopContainer(id);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Route to get the last 50 logs of a container
app.get('/containers/:id/logs', async (req, res) => {
    try {
        const { id } = req.params;
        const logs = await dockerManager.getContainerLogs(id);
        res.send(logs);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Docker Control Panel app listening at http://localhost:${port}`);
});
