// src/EstudiantesList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig';

function EstudiantesList() {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "estudiantes"));
      const data = querySnapshot.docs.map(doc => doc.data());
      setEstudiantes(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Lista de Estudiantes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección Mañana</th>
            <th>Horario Tarde</th>
            <th>Dirección Tarde</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante, index) => (
            <tr key={index}>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.direccionManana}</td>
              <td>{estudiante.horarioTarde}</td>
              <td>{estudiante.direccionTarde}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EstudiantesList;
