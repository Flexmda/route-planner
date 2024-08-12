import logo from './logo.svg';
import './App.css';
// src/App.js
import React, { useState } from 'react';
import MapComponent from './MapComponent';
import { addEstudiante } from './EstudiantesService';
import EstudiantesList from './EstudiantesList';

function App() {
  const [nombre, setNombre] = useState('');
  const [direccionManana, setDireccionManana] = useState('');
  const [horarioTarde, setHorarioTarde] = useState('');
  const [direccionTarde, setDireccionTarde] = useState('');

  const handleAddEstudiante = () => {
    addEstudiante(nombre, direccionManana, horarioTarde, direccionTarde);
    setNombre('');
    setDireccionManana('');
    setHorarioTarde('');
    setDireccionTarde('');
  };

  return (
    <div>
      <h1>Route Planner</h1>
      <MapComponent />
      <h2>Agregar Estudiante</h2>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
      <input value={direccionManana} onChange={(e) => setDireccionManana(e.target.value)} placeholder="Dirección Mañana" />
      <input value={horarioTarde} onChange={(e) => setHorarioTarde(e.target.value)} placeholder="Horario Tarde" />
      <input value={direccionTarde} onChange={(e) => setDireccionTarde(e.target.value)} placeholder="Dirección Tarde" />
      <button onClick={handleAddEstudiante}>Agregar Estudiante</button>
    </div>
  );
}

export default App;
