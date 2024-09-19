import "../About.css";
import backgroundImg from "../../../assets/About us page-cuate.png";

const Mission = () => {
  return (
    <div className="mission-container">
      <div className="mission-content">
        <h1>Our Mission</h1>
        <p style={{ textAlign: "justify" }}>
          Our mission is to revolutionize hostel management by providing a
          seamless, efficient, and user-friendly system that enhances the living
          experience for students. We aim to integrate cutting-edge technology
          to streamline administrative tasks, ensure transparency, and foster a
          supportive community. Our commitment is to continuous improvement and
          adapting to the evolving needs of our users.
        </p>
      </div>
      <div className="mission-image">
        <img
          className="background-image"
          src={backgroundImg}
          alt="Hostel image"
        />
      </div>
    </div>
  );
};

export default Mission;
