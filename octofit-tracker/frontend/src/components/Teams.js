import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
const baseUrl = codespace !== 'localhost'
  ? `https://${codespace}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Teams endpoint:', baseUrl);
        console.log('Fetched data:', data);
        setTeams(data.results || data);
      });
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((team, idx) => (
          <li key={idx}>{team.name} - {team.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
