import Mission from "./Subfiles/Mission";
import OurOfferings from "./Subfiles/OurOfferings";
import Experience from "./Subfiles/Experience ";
import Team from "./Subfiles/Team";
import "./About.css";

function About() {
  return (
    <div className="main-container-about">
      <Mission />
      <Team />
      <OurOfferings />
      <Experience />
    </div>
  );
}

export default About;
