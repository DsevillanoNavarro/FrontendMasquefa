// src/pages/Home.js
import React from 'react';
import LeerAnimales from '../components/LeerAnimales'; 
import CrearAnimales from '../components/CrearAnimales'; 
function Home() {
  return (
    <div>
        <LeerAnimales/>
        <CrearAnimales/>
    </div>
  );
}

export default Home;