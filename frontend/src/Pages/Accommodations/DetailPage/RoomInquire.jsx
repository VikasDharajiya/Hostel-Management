import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../ServicesPage/Forms/forms.css";
import Swal from "sweetalert2";
import { UserContext } from "../../../context/UserContext";

function RoomInquire() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    studentId: user?.name,
    roomId: user?.room?.roomNumber,
    inquireType: "Immediate Solution",
    inquiriesCategory: "Room Change",
    contactNumber: user?.phone,
    studentEmail: user?.email,
    reason: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5111/api/inquiries", formData);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Inquiry submitted successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error submitting inquiry. Please try again later.",
      });
    }
  };

  return (
    <div className="mentoring">
      <div className="header">
        <Link to="/home">Back</Link>
        <h2>Room Inquire</h2>
        <Link to="/home">Home</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="student_detail"></div>
        <div className="CleaningType">
          <label htmlFor="inquireType">Inquire Type</label>
          <select
            id="inquireType"
            name="inquireType"
            value={formData.inquireType}
            onChange={handleInputChange}
          >
            <option value="Immediate">Immediate Solution</option>
            <option value="Suggestion">Suggestion</option>
          </select>
          <label htmlFor="inquiriesCategory">Inquiries Category</label>
          <select
            id="inquiriesCategory"
            name="inquiriesCategory"
            value={formData.inquiriesCategory}
            onChange={handleInputChange}
          >
            <option value="Room Change">Room Change</option>
            <option value="New Room Request for Friend">
              Room Request for friend
            </option>
            <option value="Roommate Problem">Roommate Problem</option>
            <option value="Room Services">Room Services</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="reason">Reason for Inquiry</label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            required
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default RoomInquire;
