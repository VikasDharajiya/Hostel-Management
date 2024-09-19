import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetch('/api/facilities')
      .then(res => res.json())
      .then(data => setFacilities(data));
  }, []);

  return (
    <div>
      <h1>
        Facilities
      </h1>
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Availability</th>
                <th>Gender</th>
                <th>StudentID</th>
                <th>Name</th>
                <th>Services</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {
                facilities.map(facility =>
                  <tr>
                    <td>{facility.roomNumber}</td>
                    <td>{facility.isAvailable}</td>
                    <td>{facility.gender}</td>
                    <td>{facility.studentID}</td>
                    <td>{facility.studentName}</td>
                    <td>{facility.services}</td>
                    <td>{facility.price}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
