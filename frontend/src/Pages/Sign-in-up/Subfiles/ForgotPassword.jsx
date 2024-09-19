import React, { useState } from "react";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    fetch("http://localhost:5111/api/user/forgot-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          sendEmail(email, data.otp);
          Swal.fire({
            icon: "success",
            title: "OTP Sent!",
            text: "Check your " + email + " for the OTP.",
          });
          navigate("/verify-otp", { state: { email } });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
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

  const sendEmail = (userEmail, otp) => {
    emailjs
      .send(
        "service_31h6ibc",
        "template_jdok7bu",
        {
          to_email: userEmail,
          otp: otp,
          subject: "OTP for your HMS password recovery",
        },
        "oQV2DYGdAkq6YA89R"
      )
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
      })
      .catch((err) => {
        console.log("Failed to send email. Error:", err);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.header}>Forgot Password</h1>
        <form onSubmit={handleForgotPassword}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Send OTP
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
    width: "100px",
    padding: "10px",
    backgroundColor: "#4e6d7a",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    
  },
};

export default ForgotPassword;
