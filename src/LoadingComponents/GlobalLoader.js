import React from "react";
import { useLoading } from "../contexts/LoadingContext";
import Lottie from "lottie-react";
import loadingCatAnimation from "../Lottie/LoadingCat.json";
import Navbar from '../HomeComponents/Navbar'
import "./GlobalLoader.css";

const GlobalLoader = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    
    <div className="loading-screen">
      <Navbar/>
      <Lottie
        animationData={loadingCatAnimation}
        loop={true}
        autoplay
        style={{ width: 200, height: 200 }}
      />
    </div>
    
  );
};

export default GlobalLoader;
