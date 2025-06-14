// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import AnimalesListado from '../AnimalesComponents/AnimalesListado';
function Home() {
  return (
    <div>
      <AnimalesListado/>
    </div>
  );
}

export default Home;