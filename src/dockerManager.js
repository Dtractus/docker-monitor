// Import Dockerode
const Docker = require('dockerode');
const docker = new Docker({socketPath: '/var/run/docker.sock'});

// Async function to list all containers
async function listContainers() {
    try {
        const containers = await docker.listContainers({all: true});
        return containers;
    } catch (error) {
        console.error("Error listing containers:", error);
        throw error;
    }
}

// Async function to restart a container
async function restartContainer(containerId) {
    try {
        const container = docker.getContainer(containerId);
        await container.restart();
        return { success: true, message: `Container ${containerId} restarted successfully.` };
    } catch (error) {
        console.error(`Error restarting container ${containerId}:`, error);
        throw error;
    }
}

// Async function to stop a container
async function stopContainer(containerId) {
    try {
        const container = docker.getContainer(containerId);
        await container.stop();
        return { success: true, message: `Container ${containerId} stopped successfully.` };
    } catch (error) {
        console.error(`Error stopping container ${containerId}:`, error);
        throw error;
    }
}

// Async function to get the last 50 logs of a container
async function getContainerLogs(containerId) {
    try {
        const container = docker.getContainer(containerId);
        const logs = await container.logs({
            stdout: true,
            stderr: true,
            tail: 50
        });
        return logs.toString();
    } catch (error) {
        console.error(`Error fetching logs for container ${containerId}:`, error);
        throw error;
    }
}

module.exports = { listContainers, restartContainer, stopContainer, getContainerLogs };
