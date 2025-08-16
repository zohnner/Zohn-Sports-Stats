// Config
const API_BASE_URL = 'https://api.sportsdata.io/v3/';
const API_KEY = 'YOUR_API_KEY';

// API Module
const SportsAPI = {
  async fetchStats(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { 'Ocp-Apim-Subscription-Key': API_KEY }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }
};


function getCurrentDateString() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const currentDateString = getCurrentDateString();

const LEAGUES = [
  { name: 'MLB', endpoint: `mlb/scores/json/GamesByDate/${currentDateString}` },
  { name: 'NBA', endpoint: `nba/scores/json/GamesByDate/${currentDateString}` },
  { name: 'NCAAF', endpoint: `ncaaf/scores/json/GamesByDate/${currentDateString}` },
  { name: 'NFL', endpoint: `nfl/scores/json/GamesByDate/${currentDateString}` },
  { name: 'NHL', endpoint: `nhl/scores/json/GamesByDate/${currentDateString}` }
];

async function fetchRecentScores() {
  const allScores = [];
  for (const league of LEAGUES) {
    try {
      const games = await SportsAPI.fetchStats(league.endpoint);
      games.forEach(game => {
        allScores.push({
          league: league.name,
          home: game.HomeTeam,
          away: game.AwayTeam,
          homeScore: game.HomeTeamScore,
          awayScore: game.AwayTeamScore,
          status: game.Status
        });
      });
    } catch (error) {
      console.error(`Error fetching ${league.name} scores:`, error);
    }
  }
  return allScores;
}

function renderRecentScores(scores) {
  const container = document.getElementById('recent-scores');
  container.innerHTML = '';
  scores.forEach(score => {
    const div = document.createElement('div');
    div.textContent = `[${score.league}] ${score.away} ${score.awayScore} - ${score.home} ${score.homeScore} (${score.status})`;
    container.appendChild(div);
  });
}

// Call this on page load
async function loadRecentScores() {
  const scores = await fetchRecentScores();
  renderRecentScores(scores);
}


// Initial Load
loadStats();
loadRecentScores();


// UI Module
const UI = {
  renderStats(stats) {
    const statsContainer = document.getElementById('stats');
    statsContainer.innerHTML = '';
    stats.forEach(stat => {
      const div = document.createElement('div');
      div.textContent = `${stat.team}: ${stat.wins} Wins, ${stat.losses} Losses`;
      statsContainer.appendChild(div);
    });
  },
  showError(message) {
    const errorContainer = document.getElementById('error');
    errorContainer.textContent = message;
  }
};

// Main App Logic
async function loadStats() {
  try {
    const stats = await SportsAPI.fetchStats('nfl/scores/json/Standings/2023');
    UI.renderStats(stats);
  } catch (error) {
    UI.showError('Failed to load stats. Please try again later.');
  }
}

// Event Listeners
document.getElementById('refresh-btn').addEventListener('click', loadStats);

// Initial Load
loadStats();