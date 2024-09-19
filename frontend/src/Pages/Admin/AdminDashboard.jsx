import React, { useContext, useState } from "react";
import "./AdminDashboard.css";
import RoomInquiriesTable from "./RoomInquiriesTable";
import CleaningTable from "./CleaningTable";
import MedicalServiceTable from "./MedicalServiceTable";
import ClearanceTable from "./ClearanceTable";
import LeaveRequestTable from "./LeaveRequestTable";
import StatisticsTab from "./StatisticsTab";
import Swal from "sweetalert2";
import AdminProfile from "./AdminProfile";
import { UserContext } from "../../context/UserContext";
import AttendanceTable from "./AttendanceTable";
import RoomManagementTable from "./RoomManagementTable";
import AttendeeTable from "./AttendeeTable";

function AdminDashboard() {
  const [selectedTable, setSelectedTable] = useState("statistics");
  const { user } = useContext(UserContext);
  const userName = user?.name;

  const handleNavItemClick = (tableName) => {
    setSelectedTable(tableName);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log out",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        window.location.reload();
      }
    });
  };

  return (
    <div className="admin-dashboard">
      <div className="side-nav">
        <div className="nav-item-title">ADMIN DASHBOARD</div>
  
        <div
          className={`nav-item ${
            selectedTable === "statistics" ? "active" : ""
          }`}
          onClick={() => handleNavItemClick("statistics")}
        >
          <i className="bx bxs-dashboard" />
          Statistics
        </div>

        <div
          className={`nav-item ${selectedTable === "rooms" ? "active" : ""}`}
          onClick={() => handleNavItemClick("rooms")}
        >
          <svg
            style={{ height: 16, width: 16, fill: "#fff", marginRight: 8 }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24zM352 224a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-96 96c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H256z" />
          </svg>
          Rooms
        </div>

        <div
          className={`nav-item ${selectedTable === "attendee" ? "active" : ""}`}
          onClick={() => handleNavItemClick("attendee")}
        >
          <i className="bx bxs-group" />
          Attendee
        </div>

        <div
          className={`nav-item ${
            selectedTable === "roomInquiries" ? "active" : ""
          }`}
          onClick={() => handleNavItemClick("roomInquiries")}
        >
          <i className="bx bx-home" />
          Room Inquiries
        </div>

        <div
          className={`nav-item ${selectedTable === "cleaning" ? "active" : ""}`}
          onClick={() => handleNavItemClick("cleaning")}
        >
          <i className="bx bxs-doughnut-chart" />
          Cleaning
        </div>

        <div
          className={`nav-item ${
            selectedTable === "medicalService" ? "active" : ""
          }`}
          onClick={() => handleNavItemClick("medicalService")}
        >
          <i className="bx bxs-capsule" />
          Medical Service
        </div>

        <div
          className={`nav-item ${
            selectedTable === "clearance" ? "active" : ""
          }`}
          onClick={() => handleNavItemClick("clearance")}
        >
          <i className="bx bxs-home" />
          Clearance
        </div>

        <div
          className={`nav-item ${
            selectedTable === "leaveRequest" ? "active" : ""
          }`}
          onClick={() => handleNavItemClick("leaveRequest")}
        >
          <i className="bx bxs-message-dots" />
          Leave Request
        </div>

        <div
          className={`nav-item ${
            selectedTable === "attendance" ? "active" : ""
          }`}
          onClick={() => handleNavItemClick("attendance")}
        >
          <i className="bx bx-calendar-check" />
          Attendance
        </div>
      </div>

      <div className="table-container">
        <div style={{ marginBottom: 48 }}>
          <button
            onClick={() => handleNavItemClick("profile")}
            type="button"
            className="profile-btn"
          >
            <span style={{ textTransform: "capitalize" }}>{userName}</span>
            <svg
              className="profile-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </button>
          <button onClick={handleLogout} type="button" className="logout-btn">
            <span>Logout</span>
            <svg
              className="logout-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
          </button>
        </div>
        {selectedTable === "profile" && <AdminProfile />}
        {selectedTable === "attendee" && <AttendeeTable />}
        {selectedTable === "statistics" && <StatisticsTab />}
        {selectedTable === "roomInquiries" && <RoomInquiriesTable />}
        {selectedTable === "cleaning" && <CleaningTable />}
        {selectedTable === "medicalService" && <MedicalServiceTable />}
        {selectedTable === "clearance" && <ClearanceTable />}
        {selectedTable === "leaveRequest" && <LeaveRequestTable />}
        {selectedTable === "attendance" && <AttendanceTable />}
        {selectedTable === "rooms" && <RoomManagementTable />}
      </div>

      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}

export default AdminDashboard;
