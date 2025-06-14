// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import DetalleAnimal from '../DetalleAnimalComponents/DetalleAnimal';
function Home() {
  return (
    <div>
      <DetalleAnimal/>
    </div>
  );
}

export default Home;