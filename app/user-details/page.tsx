"use client"

import { useState, useEffect } from 'react';
import './user-details.css'

export default function UserDetails() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Simulate fetching user data
        const response = await fetch('/api/get-user-details'); // Replace with your API endpoint
        const data = await response.json();
        console.log(data.data);
        
        setUsers(data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData();
  }, []);

  if (users.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>User Details</h1>
      <div className="card-container">
        {users.map((user, index) => (
          <div key={index} className="card">
            <h2>{user.name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Date of Birth:</strong> {user.dob}</p>
            <p><strong>Mobile Number:</strong> {user.mobile}</p>
          </div>
        ))}
      </div>

     
    </div>
  );
}
