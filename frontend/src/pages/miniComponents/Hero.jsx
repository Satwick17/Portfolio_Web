import axios from "axios";
import { Github, Linkedin } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/me/portfolio",
        { withCredentials: true }
      );
      setUser(data.user);
    };
    getMyProfile();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2">
        </span>
          <p>Online</p>
      </div>
      <h1 className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] 
      md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4">
        Hey, Satwick here!
      </h1>
      <h1 className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] 
      sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]">
        <Typewriter
          words={["MERN STACK DEVELOPER", "DSA Enthusiast", "CSE Graduate (2024)"]}
          loop={10}
          cursor
          typeSpeed={80}
          deleteSpeed={70}
          delaySpeed={1000}
        />
      </h1>
      <div className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 
      items-center mt-4 md:mt-8 lg:mt-10">
        <Link to={user.linkedInURL}>
          <Linkedin className="text-sky-500 w-7 h-7" />
        </Link>
        <Link to={user.githubURL}>
          <Github className="text-gray-500 w-7 h-7"/>
        </Link>
        <Link></Link>
        <Link></Link>
      </div>
    </div>
  );
};

export default Hero;
