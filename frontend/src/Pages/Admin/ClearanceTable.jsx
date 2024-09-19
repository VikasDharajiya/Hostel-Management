import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AttendeeTable.css";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
emailjs.init("McyT0cwVhQOXgog9F");

function ClearanceTable() {
  const [clearanceRequests, setClearanceRequests] = useState([]);
  const [studentEmail, setStudentEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5111/api/clearance")
      .then((response) => {
        setClearanceRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleStatusChange = async (req, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5111/api/clearance/${req?._id}/status`,
        {
          status: newStatus,
        }
      );

      setRequestStatus(newStatus);

      setClearanceRequests((prevRequests) =>
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
      emailSubject = "Clearance Request Accepted";
      emailDescription = "Your clearance request has been accepted.";
    } else if (requestStatus === "rejected") {
      emailSubject = "Clearance Request Rejected";
      emailDescription = "Your clearance request has been rejected.";
    }

    const templateId =
      newStatus == "accepted" ? "template_h5tmwdu" : "template_zsilan9";
    sendEmail(to_email, emailSubject, emailDescription, templateId);
  };

  const sendEmail = (toEmail, subject, description, template) => {
    const emailServiceId = "service_wcv66d4";
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
        "TeFz3kSv1KuuvuizF"
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
      <h1>Clearance Requests Table</h1>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Room</th>
            <th>Student Year</th>
            <th>Duration</th>
            <th>Hand Over Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clearanceRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.studentName}</td>
              <td>{request.roomID}</td>
              <td>{new Date(request.handOverDate).getFullYear()}</td>
              <td>{request.duration}</td>
              <td>{new Date(request.handOverDate).toLocaleDateString()}</td>
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

export default ClearanceTable;
