import React from 'react';
import { Link } from 'react-router-dom';

const EstudiantesList = ({ students }) => {
  return (
    <div>
      <h2>Lista de Estudiantes</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            <Link to={`/student/${student.id}`}>
              {student.nombre} - {student.sector} - {student.direccionManana} - {student.horarioTarde} - {student.direccionTarde}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstudiantesList;
