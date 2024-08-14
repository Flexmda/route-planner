import { firestore } from './firebase'; // Asegúrate de importar Firestore desde firebase.js
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Función para agregar un estudiante a Firestore
export const addEstudiante = async (nombre, direccionManana, horarioTarde, direccionTarde, sector) => {
  try {
    const estudiantesRef = collection(firestore, 'students'); // Asegúrate de que la colección se llame 'students'
    await addDoc(estudiantesRef, {
      nombre,
      direccionManana,
      horarioTarde,
      direccionTarde
    });
    console.log('Estudiante agregado correctamente');
  } catch (error) {
    console.error('Error al agregar estudiante: ', error);
  }
};

// Función para obtener todos los estudiantes
export const getEstudiantes = async () => {
  try {
    const estudiantesRef = collection(firestore, 'students');
    const estudiantesSnap = await getDocs(estudiantesRef);
    const estudiantesList = estudiantesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return estudiantesList;
  } catch (error) {
    console.error('Error al obtener estudiantes: ', error);
    return [];
  }
};
