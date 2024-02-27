document.addEventListener('DOMContentLoaded', function() {
    fetchContainers();

    async function fetchContainers() {
        const response = await fetch('/containers');
        const containers = await response.json();
        const containerDiv = document.getElementById('containers');
        containerDiv.innerHTML = ''; // Clear existing containers

        containers.forEach(container => {
            const div = document.createElement('div');
            div.className = 'container';
            div.innerHTML = `
                <p><strong>ID:</strong> ${container.Id.substring(0, 12)}</p>
                <p><strong>Name:</strong> ${container.Names[0]}</p>
                <p><strong>Status:</strong> ${container.State}</p>
                <button onclick="restartContainer('${container.Id}')">Restart</button>
                <button onclick="stopContainer('${container.Id}')">Stop</button>
                <button onclick="fetchLogs('${container.Id}')">Logs</button>
            `;
            containerDiv.appendChild(div);
        });
    }

    window.restartContainer = async function(containerId) {
        await fetch(`/containers/${containerId}/restart`, { method: 'POST' });
        fetchContainers(); // Refresh the list
    };

    window.stopContainer = async function(containerId) {
        await fetch(`/containers/${containerId}/stop`, { method: 'POST' });
        fetchContainers(); // Refresh the list
    };

    window.fetchLogs = async function(containerId) {
        const response = await fetch(`/containers/${containerId}/logs`);
        const logs = await response.text();
        alert(logs); // For simplicity, showing logs in an alert
    };
});
