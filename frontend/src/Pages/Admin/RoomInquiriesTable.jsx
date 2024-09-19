import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AttendeeTable.css";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
emailjs.init("McyT0cwVhQOXgog9F");

function RoomInquiriesTable() {
  const [inquiries, setInquiries] = useState([]);
  const [studentEmail, setStudentEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5111/api/inquiries")
      .then((response) => {
        setInquiries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleStatusChange = async (req, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5111/api/inquiries/${req?._id}/status`,
        {
          status: newStatus,
        }
      );
      setRequestStatus(newStatus);
      setInquiries((prevInquiries) =>
        prevInquiries.map((inquiry) =>
          inquiry._id === req?._id ? { ...inquiry, status: newStatus } : inquiry
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
      emailSubject = "Room inquiry Request Accepted";
      emailDescription = "Your Room inquiry request has been accepted.";
    } else if (requestStatus === "rejected") {
      emailSubject = "Room inquiry Request Rejected";
      emailDescription = "Your Room inquiry request has been rejected.";
    }
    const templateId =
      newStatus == "accepted" ? "template_afigbbf" : "template_f1z58d2";
    sendEmail(to_email, emailSubject, emailDescription, templateId);
  };

  const sendEmail = (toEmail, subject, description, template) => {
    const emailServiceId = "service_099n0tg";
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
        "0tBSXa2Ns5xP73u1R"
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
      <h1>Room Inquiries Table</h1>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Room</th>
            <th>Inquiry Type</th>
            <th>Request Date</th>
            <th>Phone</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry._id}>
              <td>{inquiry.studentId}</td>
              <td>{inquiry.roomId}</td>
              <td>{inquiry.inquireType}</td>
              <td>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
              <td>{inquiry.contactNumber}</td>
              <td>{inquiry.reason}</td>
              <td className="stats">{inquiry.status}</td>
              <td>
                {inquiry.status === "pending" && (
                  <>
                    <button
                      className="accept"
                      onClick={() => handleStatusChange(inquiry, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="reject"
                      onClick={() => handleStatusChange(inquiry, "rejected")}
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

export default RoomInquiriesTable;
