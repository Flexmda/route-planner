// src/StudentDetails.js

import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const studentDoc = doc(firestore, 'students', id);
        const studentSnapshot = await getDoc(studentDoc);
        if (studentSnapshot.exists()) {
          setStudent(studentSnapshot.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching student details: ', error);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Detalles del Estudiante</h2>
      <p><strong>Nombre:</strong> {student.nombre}</p>
      <p><strong>Dirección Mañana:</strong> {student.direccionManana}</p>
      <p><strong>Horario Tarde:</strong> {student.horarioTarde}</p>
      <p><strong>Dirección Tarde:</strong> {student.direccionTarde}</p>
    </div>
  );
};

export default StudentDetails;
