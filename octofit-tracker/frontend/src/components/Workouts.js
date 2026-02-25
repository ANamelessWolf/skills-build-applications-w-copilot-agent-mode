import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
const baseUrl = codespace !== 'localhost'
  ? `https://${codespace}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts endpoint:', baseUrl);
        console.log('Fetched data:', data);
        setWorkouts(data.results || data);
      });
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout, idx) => (
          <li key={idx}>{workout.name} - {workout.description} ({workout.difficulty})</li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
