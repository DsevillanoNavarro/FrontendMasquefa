// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import NoticiasListado from '../NoticiasComponents/NoticiasListado';
function Home() {
  return (
    <div>
      <NoticiasListado/>
    </div>
  );
}

export default Home;