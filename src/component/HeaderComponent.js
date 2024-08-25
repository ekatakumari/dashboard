import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Style/HeaderComponent.css'; // Add your CSS here

const HeaderComponent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://34.93.245.38/sale');
        const users = [
          response.data.userDetails,
          { name: "User 2", designation: "Developer" },
          { name: "User 3", designation: "Designer" }
        ]; // Example additional users
        setUsers(users);
        setSelectedUser(users[0]); // Default to the first user
        setLoading(false);
      } catch (error) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <header className="header">
      <div className="header-right">
      <div className="icons">
          <i className="icon-message">&#9993;</i> {/* Message Icon */}
          <i className="icon-search">&#128269;</i> {/* Search Icon */}
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            {selectedUser ? selectedUser.name : 'Select User'}
          </button>
          <div className="dropdown-content">
            {users.map((user, index) => (
              <a key={index} onClick={() => handleUserSelect(user)}>
                {user.name}
              </a>
            ))}
          </div>
        </div>
        
      </div>
    </header>
  );
};

export default HeaderComponent;
