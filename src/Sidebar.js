// src/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ students }) => {
  return (
    <div style={{ width: '250px', padding: '20px', borderRight: '1px solid #ddd' }}>
      <h2>Panel Lateral</h2>
      <ul>
        <li><Link to="/estudiantes">Estudiantes</Link></li>
        {students.map(student => (
          <li key={student.id}>
            <Link to={`/student/${student.id}`}>{student.nombre}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
