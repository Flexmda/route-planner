// src/EstudiantesService.js

import { firestore } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Agrega un estudiante a la colección 'students'
export const addEstudiante = async (nombre, direccionManana, horarioTarde, direccionTarde) => {
  try {
    await addDoc(collection(firestore, 'students'), {
      nombre,
      direccionManana,
      horarioTarde,
      direccionTarde
    });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

// Obtiene todos los estudiantes de la colección 'students'
export const getEstudiantes = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'students'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching students: ', error);
    return [];
  }
};
