import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AttendeeTable.css";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
emailjs.init("McyT0cwVhQOXgog9F");

function MedicalServiceTable() {
  const [medicalServiceRequests, setMedicalServiceRequests] = useState([]);
  const [studentEmail, setStudentEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5111/api/medical")
      .then((response) => {
        setMedicalServiceRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleStatusChange = async (req, newStatus) => {
    try {
      await axios.patch(`http://localhost:5111/api/medical/${req._id}/status`, {
        status: newStatus,
      });

      setRequestStatus(newStatus);

      setMedicalServiceRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === req._id ? { ...request, status: newStatus } : request
        )
      );
      handleEmailSend(req?.studentEmail, newStatus);
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  const handleEmailSend = (to_email, newStatus) => {
    let emailSubject = "";
    let emailDescription = "";

    if (requestStatus === "accepted") {
      emailSubject = "Medical Service Request Accepted";
      emailDescription = "Your Medical Service request has been accepted.";
    } else if (requestStatus === "rejected") {
      emailSubject = "Medical Service Request Rejected";
      emailDescription = "Your Medical Service request has been rejected.";
    }

    const templateId =
      newStatus == "accepted" ? "template_tijmhmc" : "template_p2wyiwm";
    sendEmail(to_email, emailSubject, emailDescription, templateId);
  };

  const sendEmail = (toEmail, subject, description, template) => {
    const emailServiceId = "service_sisibq6";
    const templateId = template;

    emailjs
      .send(
        emailServiceId,
        templateId,
        {
          to_email: toEmail,
          subject: subject,
          description: description,
        },
        "M8_HQci_dKyc_Ueli"
      )
      .then(
        (response) => {
          Swal.fire({
            icon: "success",
            title: "Email Sent Successfully!",
            text: `Email sent to ${toEmail}`,
          });
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email sending failed. Please try again later.",
          });
          console.error("Email sending failed:", error);
        }
      );
  };

  return (
    <div className="table">
      <h1>Medical Service Requests Table</h1>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Room</th>
            {/* <th>Medical Service Type</th>
            <th>Treatment Level</th> */}
            <th>Disease</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicalServiceRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.studentName}</td>
              <td>{request.roomID}</td>
              {/* <td>{request.serviceType}</td>
              <td>{request.treatmentLevel}</td> */}
              <td>{request.illness}</td>
              <td>{new Date(request.appointmentTime).toLocaleString()}</td>

              <td className="stats">{request.status}</td>
              <td>
                {request.status === "pending" && (
                  <>
                    <button
                      className="accept"
                      onClick={() => handleStatusChange(request, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="reject"
                      onClick={() => handleStatusChange(request, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="modal-container">
          <h2>Enter Student Email</h2>
          <br />
          <input
            className="modal-input"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            placeholder="Enter student email"
          />
          <div className="modal-buttons">
            <button className="send-btn" onClick={handleEmailSend}>
              Send Email
            </button>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicalServiceTable;
