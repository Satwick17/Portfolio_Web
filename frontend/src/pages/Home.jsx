import React from "react";
import Hero from "./miniComponents/Hero";
import Timeline from "./miniComponents/Timeline";
import About from "./miniComponents/About";
import Skills from "./miniComponents/Skills";
import Portfolio from "./miniComponents/Portfolio";
import MyApps from "./miniComponents/MyApps";
import Contact from "./miniComponents/Contact";

const Home = () => {
  return (
    <>
      <article className="px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">
        <Hero />
        <Timeline />
        <About />
        <Skills />
        <Portfolio />
        <MyApps />
        <Contact />
      </article>
    </>
  );
};

export default Home;
