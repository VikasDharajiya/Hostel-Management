import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AttendanceTable.css";
import { DNA } from "react-loader-spinner";
const AttendanceTable = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [users, setUsers] = useState([]);
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAttendance(date);
  }, [date]);

  const fetchAttendance = async (selectedDate) => {
    setLoadingGet(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5111/api/attendance/date",
        { date: selectedDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setError("Failed to load attendance. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load attendance. Please try again.",
      });
    } finally {
      setLoadingGet(false);
    }
  };

  const handleAttendanceChange = (userId, status) => {
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, attendanceStatus: status } : user
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingPost(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const attendance = users.map((user) => ({
        userId: user._id,
        status: user.attendanceStatus || "absent",
      }));

      await axios.put(
        "http://localhost:5111/api/attendance/update",
        { date, attendance },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Attendance Updated",
        text: "Attendance has been updated successfully!",
      });
    } catch (error) {
      console.error("Error updating attendance:", error);
      setError("Failed to update attendance. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update attendance. Please try again.",
      });
    } finally {
      setLoadingPost(false);
    }
  };

  return (
    <div className="table">
      <h1>Attendance Management</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="date-picker"
      />
      {error && <p className="error">{error}</p>}
      {!loadingGet ? (
        <form className="attendance-form" onSubmit={handleSubmit}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.gender}</td>
                  <td className="btn-td">
                    <button
                      type="button"
                      className={`attendance-btn present ${
                        user.attendanceStatus === "present" ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleAttendanceChange(user._id, "present")
                      }
                    >
                      P
                    </button>
                    <button
                      type="button"
                      className={`attendance-btn absent ${
                        user.attendanceStatus === "absent" ? "selected" : ""
                      }`}
                      onClick={() => handleAttendanceChange(user._id, "absent")}
                    >
                      A
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="submit"
            className="btn-submit"
            disabled={loadingPost || loadingGet}
          >
            {loadingPost
              ? "Updating..."
              : loadingGet
              ? "Loading..."
              : "Update Attendance"}
          </button>
        </form>
      ) : (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            height: 350,
          }}
        >
          <DNA
            visible={loadingGet}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;
