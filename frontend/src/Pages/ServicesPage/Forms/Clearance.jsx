import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./forms.css";
import { UserContext } from "../../../context/UserContext";

function Clearance() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    studentName: user?.name,
    studentEmail: user?.email,
    roomID: user?.room?.roomNumber,
    registrationYear: "",
    duration: "",
    handOverDate: "",
    otherNotes: "",
    certified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5111/api/clearance", formData)
      .then((response) => {
        console.log(response.data);
        Swal.fire(
          "Success!",
          "Clearance information submitted successfully!",
          "success"
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Error!", "Failed to submit clearance information!", "error");
      });
  };

  return (
    <div className="clearance">
      <div className="header">
        <Link to="/services">Back</Link>
        <h2 style={{ marginTop: 20 }}>Clearance Services</h2>
        <Link to="/home">Home</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="registrationYear">Registration Year</label>
        <input
          type="number"
          name="registrationYear"
          id="registrationYear"
          value={formData.registrationYear}
          onChange={handleChange}
        />

        <label htmlFor="duration">How many years you have use this room?</label>
        <input
          type="text"
          name="duration"
          id="duration"
          value={formData.duration}
          onChange={handleChange}
        />

        <label htmlFor="handOverDate">Hand Over Date</label>
        <input
          type="date"
          name="handOverDate"
          id="handOverDate"
          value={formData.handOverDate}
          onChange={handleChange}
        />

        <label htmlFor="otherNotes">Other Notes</label>
        <textarea
          name="otherNotes"
          id="otherNotes"
          cols="30"
          rows="10"
          value={formData.otherNotes}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="honorCertified">
          I honor certified this clearance information is correct.
        </label>
        <input
          type="checkbox"
          name="certified"
          id="certified"
          checked={formData.certified}
          onChange={handleChange}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Clearance;
