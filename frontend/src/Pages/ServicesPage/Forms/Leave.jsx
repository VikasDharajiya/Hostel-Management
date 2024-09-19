import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./forms.css";
import { UserContext } from "../../../context/UserContext";
import { sendLeaveRequestEmail } from "../../../helpers/emailHelper";

function Leave() {
  const { user } = React.useContext(UserContext);
  const [formData, setFormData] = useState({
    studentName: user?.name,
    studentID: user?.id,
    gender: user?.gender,
    studentEmail: user?.email,
    parentEmail: user?.parentEmail,
    leaveType: "Go Home",
    leaveReason: "",
    inDate: "",
    outDate: "",
    contactNo: user?.phone,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5111/api/leave",
        formData
      );
      console.log("LEAVE RESPONSE : ", response?.data);
      Swal.fire("Success", "Leave request submitted successfully!", "success");
      if (response?.data?.studentID) {
        const toEmail = user?.parentEmail;
        const templateParams = {
          to_email: toEmail,
          user_name: formData.studentName,
          in_date: formData.inDate,
          out_date: formData.outDate,
        };
        sendLeaveRequestEmail(toEmail, templateParams);
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      Swal.fire(
        "Error",
        "Failed to submit leave request. Please try again later.",
        "error"
      );
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="leave">
      <div className="header">
        <Link to="/services">Back</Link>
        <h2 style={{ marginTop: 20 }}>Leave Request</h2>
        <Link to="/home">Home</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="types">
          <label htmlFor="leaveType">Leave Type</label>
          <select
            name="leaveType"
            id="leaveType"
            value={formData.leaveType}
            onChange={handleInputChange}
            required
          >
            <option value="Go Home">Go Home</option>
            <option value="Leave For Practical">Leave for Clinical</option>
            <option value="Family Function">Familty Function</option>
            <option value="Cousin Marriage">Cousin Marriage</option>
            <option value="other">Other</option>
          </select>
          {formData.leaveType === "other" && (
            <div>
              <label htmlFor="leaveReason">Reason for Leave</label>
              <input
                type="text"
                name="leaveReason"
                id="leaveReason"
                value={formData.leaveReason}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
        </div>
        <div className="time">
          <label htmlFor="inDate">IN Date</label>
          <input
            type="date"
            name="inDate"
            id="inDate"
            value={formData.inDate}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="outDate">OUT Date</label>
          <input
            type="date"
            name="outDate"
            id="outDate"
            value={formData.outDate}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* <div className="responsible"> */}
        {/* <label htmlFor="responsiblePerson">
            Responsible Person name/position
          </label>
          <input
            type="text"
            name="responsiblePerson"
            id="responsiblePerson"
            value={formData.responsiblePerson}
            onChange={handleInputChange}
            required
          /> */}
        {/* <label htmlFor="contactNo">Contact No</label>
          <input
            type="tel"
            name="contactNo"
            id="contactNo"
            value={formData.contactNo}
            onChange={handleInputChange}
            required
          /> */}
        {/* </div> */}
        <p>Please approve my leave request</p>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Leave;
