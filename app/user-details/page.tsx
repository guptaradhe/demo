"use client"

import { useState, useEffect } from 'react';

// // Mock user data
// const mockUserData = [
//   {
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     address: '123 Main St, Anytown, USA',
//     dob: '1990-01-01',
//     mobile: '123-456-7890',
//   },
//   {
//     name: 'Jane Smith',
//     email: 'jane.smith@example.com',
//     address: '456 Elm St, Anytown, USA',
//     dob: '1985-05-15',
//     mobile: '987-654-3210',
//   },
//   {
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     address: '123 Main St, Anytown, USA',
//     dob: '1990-01-01',
//     mobile: '123-456-7890',
//   },
//   {
//     name: 'Jane Smith',
//     email: 'jane.smith@example.com',
//     address: '456 Elm St, Anytown, USA',
//     dob: '1985-05-15',
//     mobile: '987-654-3210',
//   }
// ];

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

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 1rem;
        }
        .card-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .card {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          padding: 1rem;
          flex: 1 1 calc(50% - 1rem);
          box-sizing: border-box;
        }
        h1 {
          text-align: center;
          margin-bottom: 1rem;
        }
        h2 {
          margin-top: 0;
        }
        p {
          margin: 0.5rem 0;
        }
        strong {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
