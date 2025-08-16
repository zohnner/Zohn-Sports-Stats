// This file handles the logic for fetching and displaying sports statistics, as well as any interactivity on the webpage.

document.addEventListener('DOMContentLoaded', () => {
    const statsContainer = document.getElementById('stats-container');

    async function fetchSportsStats() {
        try {
            const response = await fetch('https://api.example.com/sports-stats'); // Replace with actual API endpoint
            const data = await response.json();
            displayStats(data);
        } catch (error) {
            console.error('Error fetching sports statistics:', error);
            statsContainer.innerHTML = '<p>Failed to load statistics. Please try again later.</p>';
        }
    }

    function displayStats(stats) {
        statsContainer.innerHTML = ''; // Clear previous stats
        stats.forEach(stat => {
            const statElement = document.createElement('div');
            statElement.classList.add('stat');
            statElement.innerHTML = `
                <h3>${stat.team}</h3>
                <p>Wins: ${stat.wins}</p>
                <p>Losses: ${stat.losses}</p>
                <p>Points: ${stat.points}</p>
            `;
            statsContainer.appendChild(statElement);
        });
    }

    fetchSportsStats();
});