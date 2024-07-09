import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import Carousel from "../Components/Carousel";
function Main() {
  return (
    <div>
      <Navbar />
      <Carousel/>
      <div>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
     <div><Footer /></div>
    </div>
  );
}

export default Main;
