import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
const baseUrl = codespace !== 'localhost'
  ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard endpoint:', baseUrl);
        console.log('Fetched data:', data);
        setLeaderboard(data.results || data);
      });
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, idx) => (
          <li key={idx}>{entry.team} - {entry.points} pts</li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
