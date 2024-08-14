// src/Sidebar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Asegúrate de que esta ruta sea correcta

const Sidebar = ({ isOpen, onClose, students = [] }) => {
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
            {students.length > 0 ? (
              students.map(student => (
                <li key={student.id}>
                  <Link to={`/student/${student.id}`}>{student.nombre}</Link>
                </li>
              ))
            ) : (
              <li>No hay estudiantes</li>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
