export function displayStats(stats) {
    const statsContainer = document.getElementById('stats-container');
    statsContainer.innerHTML = '';

    stats.forEach(stat => {
        const statElement = document.createElement('div');
        statElement.className = 'stat-item';
        statElement.innerHTML = `
            <h3>${stat.title}</h3>
            <p>${stat.value}</p>
        `;
        statsContainer.appendChild(statElement);
    });
}

export function updateStats(newStats) {
    displayStats(newStats);
}