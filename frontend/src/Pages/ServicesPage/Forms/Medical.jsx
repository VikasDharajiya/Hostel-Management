import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./forms.css";
import { UserContext } from "../../../context/UserContext";

function Medical() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    studentName: user?.name,
    academicYear: "",
    roomID: user?.room?.roomNumber,
    studentEmail: user?.email,
    age: "",
    serviceType: "appointment",
    diseaseLevel: "1",
    treatmentLevel: "normal",
    illness: "fever",
    otherMention: "",
    sickPeriod: "1",
    makeAppointment: false,
    appointmentTime: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FORMDATA ::: ", formData);
    try {
      await axios.post("http://localhost:5111/api/medical", formData);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Medical form submitted successfully!",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to submit medical form. Please try again later.",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="medical">
      <div className="header">
        <Link to="/services">Back</Link>
        <h2 style={{ marginTop: 20 }}>Medical Services</h2>
        <Link to="/home">Home</Link>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="age">Age</label>
        <input type="number" name="age" id="age" onChange={handleInputChange} />

        <label htmlFor="mention">
          Please mention your illness/sick situation
        </label>
        <select name="illness" id="mention" onChange={handleInputChange}>
          <option value="fever">Fever</option>
          <option value="loose_motion">Loose Motion</option>
          <option value="headaches">Headaches</option>
          <option value="bone">Broke a bone</option>
          <option value="tissue">Tissue pains</option>
          <option value="gastic">Gastric</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="other_mention">If other please mention</label>
        <input type="text" name="otherMention" onChange={handleInputChange} />

        <label htmlFor="period">Sick period</label>
        <select name="sickPeriod" id="period" onChange={handleInputChange}>
          <option value="1">1 day</option>
          <option value="2">2 days</option>
          <option value="3">3 days</option>
          <option value="5">more than 5 days</option>
        </select>

        <label htmlFor="TimeAppointment">Time</label>
        <input
          type="datetime-local"
          name="appointmentTime"
          id="TimeAppointment"
          onChange={handleInputChange}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Medical;
