// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./HomeImage.css";

const Hero = () => {
  return (
    <div className="hero-section slide-down-fade">
      <div className="container text-white imgHome">
        <div className="row justify-content-left">
          <div className="col-md-12 text-md-start text-center hero-text-wrapper">
            <h1 className="hero-title slide-down-fade mb-3">DALE UN<br />HOGAR</h1>
            <Link to="/animales" className="btn custom-btn mt-2 btn-lg slide-down-fade">
              Ver Nuestros Gatos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
