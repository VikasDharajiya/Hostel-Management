import React, { useState } from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;

  const handleResetPassword = (e) => {
    e.preventDefault();
    fetch("http://localhost:5111/api/user/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Password Reset!",
            text: "Your password has been reset successfully.",
          });
          navigate("/");
        } else {
          console.log("ERROR : ", data);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message,
          });
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Network error. Please try again later.",
        });
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.header}>Reset Password</h1>
        <form onSubmit={handleResetPassword}>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "transparent",
  },
  formContainer: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  header: {
    marginBottom: "20px",
    color: "#333",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    width: "140px",
    padding: "10px",
    backgroundColor: "#4e6d7a",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default ResetPassword;
