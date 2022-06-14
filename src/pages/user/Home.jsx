import React from "react";
import Announcement from "../../components/user/Announcement";
import Categories from "../../components/user/Categories";
import Footer from "../../components/user/Footer";
import Navbar from "../../components/user/Navbar";
import Newsletter from "../../components/user/Newsletter";
import Products from "../../components/user/Products";
import Slider from "../../components/user/Slider";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
