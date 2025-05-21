// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import HomeImage from '../HomeComponents/HomeImage';
import HomeCats from '../HomeComponents/HomeCats';
import HomeVideo from '../HomeComponents/HomeVideo';
import HomeNoticias from '../HomeComponents/HomeNoticias';
import HomeForm from '../HomeComponents/HomeForm';
import HomeVideo2 from '../HomeComponents/HomeVideo2';
function Home() {
  return (
    <div>
      <HomeImage/>
      <HomeCats/>
      <HomeVideo/>
      <HomeNoticias/>
      <HomeForm/>
      <HomeVideo2/>

    </div>
  );
}

export default Home;