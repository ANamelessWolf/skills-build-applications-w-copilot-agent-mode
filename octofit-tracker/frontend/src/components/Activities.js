import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
const baseUrl = codespace !== 'localhost'
  ? `https://${codespace}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Activities endpoint:', baseUrl);
        console.log('Fetched data:', data);
        setActivities(data.results || data);
      });
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {activities.map((activity, idx) => (
          <li key={idx}>{activity.user} - {activity.activity_type} - {activity.duration} min</li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
