import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import StudentDetails from './StudentDetails';
import MapComponent from './MapComponent';
import { addEstudiante, getEstudiantes } from './EstudiantesService'; // Asegúrate de tener estas funciones en tu servicio
import EstudiantesList from './EstudiantesList';

function App() {
  const [nombre, setNombre] = useState('');
  const [direccionManana, setDireccionManana] = useState('');
  const [horarioTarde, setHorarioTarde] = useState('');
  const [direccionTarde, setDireccionTarde] = useState('');
  const [students, setStudents] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Cambia esto a `true` para mostrar el Sidebar por defecto

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const estudiantes = await getEstudiantes();
        setStudents(estudiantes || []); // Asegúrate de que estudiantes no sea undefined
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleAddEstudiante = async () => {
    try {
      await addEstudiante(nombre, direccionManana, horarioTarde, direccionTarde);
      const estudiantes = await getEstudiantes();
      setStudents(estudiantes || []); // Asegúrate de que estudiantes no sea undefined
      setNombre('');
      setDireccionManana('');
      setHorarioTarde('');
      setDireccionTarde('');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // Extraer las direcciones de la mañana y tarde
  const morningRoutes = students.map(student => student.direccionManana).filter(Boolean);
  const eveningRoutes = students.map(student => student.direccionTarde).filter(Boolean);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} students={students} />
        <div style={{ flex: 1, padding: '20px', marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
          <button className="menu-button" onClick={toggleSidebar}>
            {isSidebarOpen ? 'Cerrar Menú' : 'Abrir Menú'}
          </button>
          <h1>Route Planner</h1>
          <MapComponent morningRoutes={morningRoutes} eveningRoutes={eveningRoutes} />
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
