import "../home.css";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";
import backgroundImg from "../../../assets/Hostel.jpg";

const Welcome = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="container">
      <img
        className="background-image"
        src={backgroundImg}
        alt="Hostel image"
      />

      <div className="overlay">
        <h1>Welcome , {user?.name}</h1>
        <p>
          Welcome to our premier student housing community, where comfort,
          convenience, and community come together to create the ideal living
          environment. Explore our site to discover your perfect home away from
          home.
        </p>
        <div>
          <button>Read More</button>
        </div>
      </div>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default Welcome;
