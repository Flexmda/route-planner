// src/Sidebar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Asegúrate de tener este archivo para los estilos del sidebar

const Sidebar = ({ isOpen, onClose, students }) => {
  const [isStudentsOpen, setIsStudentsOpen] = useState(false);

  const handleToggleStudents = () => {
    setIsStudentsOpen(!isStudentsOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>X</button>
      <h2>Panel Lateral</h2>
      <ul>
        <li>
          <button className="collapsible" onClick={handleToggleStudents}>
            Estudiantes {isStudentsOpen ? '▲' : '▼'}
          </button>
          <ul className={`collapsible-content ${isStudentsOpen ? 'show' : ''}`}>
            {students.map(student => (
              <li key={student.id}>
                <Link to={`/student/${student.id}`}>{student.nombre}</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
