import React from "react";
import sample from "../About_components/sample.jpeg";
import SocietyCard from "./SocietyCard";

const societies = [
  {
    Name: "Signal Processing Society (SPS)",
    image: "https://www.signalprocessingsociety.org/sites/default/files/2021-02/SPS_Logo.png", 
    description: "IEEE SPS focuses on the theory and application of signal processing, including image processing, speech recognition, and machine learning.",
  },
  {
    Name: "Circuits and Systems Society (CAS)",
    image: "https://ieee-cas.org/sites/default/files/2022-07/CAS-LOGO_2018_RGB.png", 
    description: "CAS promotes fundamental research in circuit and system design, including VLSI, analog and digital circuits, and computational algorithms.",
  },
  {
    Name: "Nanotechnology Council (NTC)",
    image: "https://ieeenano.org/wp-content/uploads/2019/11/logoNTC.jpg", 
    description: "IEEE NTC supports research and innovation in nanotechnology, including nanoelectronics, nanophotonics, and biomedical nanotechnology.",
  },
  {
    Name: "Computer Society (CS)",
    image: "https://www.computer.org/media/4696/cs_logo_rgb.png", 
    description: "IEEE CS focuses on computing and IT-related fields, including AI, cybersecurity, software engineering, and cloud computing.",
  },
  {
    Name: "Robotics and Automation Society (RAS)",
    image: "https://www.ieee-ras.org/images/RAS-logo-2015.png", 
    description: "IEEE RAS promotes the development of robotics and automation technologies for industrial, medical, and intelligent systems applications.",
  },
  {
    Name: "Power & Energy Society (PES)",
    image: "https://www.ieee-pes.org/images/files/branding/PESlogoFULLCOLORwShadow.png", 
    description: "PES focuses on advancements in electric power and energy, including smart grids, renewable energy, and power electronics.",
  },
  {
    Name: "Photonics Society",
    image: "https://www.photonicssociety.org/themes/custom/photonicssociety/logo.png", 
    description: "The IEEE Photonics Society advances the science and engineering of photonic and optoelectronic technologies.",
  },
  {
    Name: "Engineering in Medicine and Biology Society (EMBS)",
    image: "https://www.embs.org/wp-content/uploads/2017/01/IEEE-EMBS-Logo-Stacked-Color.png", 
    description: "EMBS promotes the development of technology and research in healthcare, medical devices, and biomedical engineering.",
  },
  // Add more societies here
];

const Societies = () => {
  return (
    <div className="container max-w-full mt-16">
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold bg-white w-full py-8 text-[#00629B] text-center">
          Our Societies
        </h1>
        <div className="flex flex-col justify-center w-full items-center">
          {societies.map((society, index) => (
            <SocietyCard
              className={``}
              key={index}
              name={society.Name}
              image={sample}
              description={society.description}
              count={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Societies;
