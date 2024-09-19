import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AttendeeTable.css";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import { sendLeaveRequestEmail } from "../../helpers/emailHelper";
import moment from "moment";
emailjs.init("McyT0cwVhQOXgog9F");

function LeaveRequestTable() {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    getLeaveDetails();
  }, []);

  const getLeaveDetails = () => {
    axios
      .get("http://localhost:5111/api/leave")
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handleStatusChange = async (request, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5111/api/leave/${request._id}/status`,
        {
          status: newStatus,
        }
      );
      getLeaveDetails();
      const inDate = moment(request?.inDate).format("Do MMMM YYYY");
      const outDate = moment(request?.outDate).format("Do MMMM YYYY");
      const message_body =
        newStatus != "rejected"
          ? `Your leave request from ${inDate} to ${outDate} has been approved.`
          : `Your leave request from ${inDate} to ${outDate} has been rejected.`;
      const message_body_parent =
        newStatus != "rejected"
          ? `Your child's leave request from ${inDate} to ${outDate} has been approved.`
          : `Your child's leave request from ${inDate} to ${outDate} has been rejected.`;
      sendLeaveRequestEmail(
        request?.studentEmail,
        {
          to_mail: request?.studentEmail,
          student_name: request?.studentName,
          message_body,
        },
        "template_qkt4r6p"
      );
      sendLeaveRequestEmail(
        request?.parentEmail,
        {
          to_mail: request?.parentEmail,
          student_name: `${request?.studentName}'s Parent`,
          message_body: message_body_parent,
        },
        "template_qkt4r6p"
      );
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  return (
    <div className="table">
      <h1>Leave Requests Table</h1>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student</th>
            {/* <th>Room ID</th> */}
            <th>Leave Type</th>
            <th>In Date</th>
            <th>Out Date</th>
            <th>Contact Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.studentID}</td>
              <td>{request.studentName}</td>
              {/* <td>{request.roomID}</td> */}
              <td>
                {request.leaveType != "other"
                  ? request.leaveType
                  : `Other : ${request?.leaveReason}`}
              </td>
              <td>{new Date(request.inDate).toLocaleDateString()}</td>
              <td>{new Date(request.outDate).toLocaleDateString()}</td>
              <td>{request.contactNo}</td>
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
    </div>
  );
}

export default LeaveRequestTable;
