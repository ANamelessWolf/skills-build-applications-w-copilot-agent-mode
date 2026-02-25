import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
const baseUrl = codespace !== 'localhost'
  ? `https://${codespace}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Users endpoint:', baseUrl);
        console.log('Fetched data:', data);
        setUsers(data.results || data);
      });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user, idx) => (
          <li key={idx}>{user.name} ({user.email}) - Team: {user.team}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
