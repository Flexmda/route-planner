import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import StudentDetails from './StudentDetails';
import { addEstudiante, getEstudiantes } from './EstudiantesService'; // Importa las funciones de servicio
import MapComponent from './MapComponent';
import EstudiantesList from './EstudiantesList';

function App() {
  const [nombre, setNombre] = useState('');
  const [direccionManana, setDireccionManana] = useState('');
  const [horarioTarde, setHorarioTarde] = useState('');
  const [direccionTarde, setDireccionTarde] = useState('');
  const [sector, setSector] = useState(''); // Nuevo estado para el sector
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const estudiantes = await getEstudiantes();
      setStudents(estudiantes);
    };

    fetchStudents();
  }, []);

  const handleAddEstudiante = async () => {
    await addEstudiante(nombre, direccionManana, horarioTarde, direccionTarde, sector);
    setNombre('');
    setDireccionManana('');
    setHorarioTarde('');
    setDireccionTarde('');
    setSector(''); // Limpiar el campo sector
    // Actualiza la lista de estudiantes después de agregar uno nuevo
    const updatedStudents = await getEstudiantes();
    setStudents(updatedStudents);
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar students={students} />
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
          <h1>Route Planner</h1>
          <MapComponent />
          <h2>Agregar Estudiante</h2>
          <input 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder="Nombre" 
          />
          <input 
            value={direccionManana} 
            onChange={(e) => setDireccionManana(e.target.value)} 
            placeholder="Dirección Mañana" 
          />
          <input 
            value={horarioTarde} 
            onChange={(e) => setHorarioTarde(e.target.value)} 
            placeholder="Horario Tarde" 
          />
          <input 
            value={direccionTarde} 
            onChange={(e) => setDireccionTarde(e.target.value)} 
            placeholder="Dirección Tarde" 
          />
          <input 
            value={sector} 
            onChange={(e) => setSector(e.target.value)} 
            placeholder="Sector" 
          />
          <button onClick={handleAddEstudiante}>Agregar Estudiante</button>

          <Routes>
            <Route path="/student/:id" element={<StudentDetails />} />
            <Route path="/estudiantes" element={<EstudiantesList students={students} />} />
            {/* Otras rutas aquí */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
