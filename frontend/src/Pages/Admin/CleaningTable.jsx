import { useState, useEffect } from "react";
import axios from "axios";
import "./AttendeeTable.css";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
emailjs.init("McyT0cwVhQOXgog9F");

function CleaningTable() {
  const [cleaningRequests, setCleaningRequests] = useState([]);
  const [studentEmail, setStudentEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState("");
  
  useEffect(() => {
    axios
      .get("http://localhost:5111/api/cleaning")
      .then((response) => {
        setCleaningRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleStatusChange = async (req, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5111/api/cleaning/${req._id}/status`,
        {
          status: newStatus,
        }
      );
      setRequestStatus(newStatus);
      handleEmailSend(req?.studentEmail, newStatus);
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  const handleEmailSend = (to_email, newStatus) => {
    let emailSubject = "";
    let emailDescription = "";
    if (requestStatus === "accepted") {
      emailSubject = "Cleaning Request Accepted";
      emailDescription = "Your cleaning request has been accepted.";
    } else if (requestStatus === "rejected") {
      emailSubject = "Cleaning Request Rejected";
      emailDescription = "Your cleaning request has been rejected.";
    }

    const templateId =
      newStatus == "accepted" ? "template_kks79ei" : "template_mmudokw";
    sendEmail(to_email, emailSubject, emailDescription, templateId);
  };

  const sendEmail = (toEmail, subject, description, template) => {
    const emailServiceId = "service_glyl12e";
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
        "nuyzdR8p13J07zQfk"
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
      <h1>Cleaning Requests Table</h1>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Room</th>
            <th>Cleaning Level</th>
            <th>Request Date</th>
            <th>Mention</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cleaningRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.studentID}</td>
              <td>{request.roomID}</td>
              <td>{request.cleaningLevel}</td>
              <td>{new Date(request.requestDate).toLocaleString()}</td>
              <td>{request.mention}</td>
              <td className="stats" style={{ textTransform: "capitalize" }}>
                {request.status}
              </td>
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

      {/* Modal for entering student email */}
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

export default CleaningTable;
