import Contact from "../../../assets/Contact us-amico.png";
import { Link } from "react-router-dom";

const Experience = () => {
  return (
    <div className="ex-container">
      <div className="ex-content">
        <h2>Experience the Benefits</h2>
        <p>
          Discover how our Hostel Management System can transform your hostel
          operations and enhance the living experience for your residents.
        </p>
        <Link to="/ContactUs">
          <button className="contact-button">Contact Us</button>
        </Link>
      </div>
      <div className="ex-image">
        <img src={Contact} alt="contact" />
      </div>
    </div>
  );
};

export default Experience;
