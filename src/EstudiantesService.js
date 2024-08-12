// src/EstudiantesService.js
import { collection, addDoc } from "firebase/firestore";
import { db } from './firebaseConfig';

export const addEstudiante = async (nombre, direccionManana, horarioTarde, direccionTarde) => {
  try {
    const docRef = await addDoc(collection(db, "estudiantes"), {
      nombre: nombre,
      direccionManana: direccionManana,
      horarioTarde: horarioTarde,
      direccionTarde: direccionTarde
    });
    console.log("Estudiante añadido con ID: ", docRef.id);
  } catch (e) {
    console.error("Error al añadir estudiante: ", e);
  }
};
