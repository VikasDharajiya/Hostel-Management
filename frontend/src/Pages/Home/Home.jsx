import Welcome from "./Subfiles/Welcome";
import Reservations from "./Subfiles/Reservations";
import Facilities from "./Subfiles/Facilities";

import "./home.css";

function Home() {
  return (
    <>
      <Welcome />
      <Reservations />
      <Facilities />
    </>
  );
}

export default Home;
