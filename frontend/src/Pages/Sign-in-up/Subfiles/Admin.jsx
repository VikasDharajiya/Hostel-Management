import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../signInUp.css";
import { UserContext } from "../../../context/UserContext";
import { DNA } from "react-loader-spinner";

function Admin({ setSignin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5111/api/admin/login",
        { email, password }
      );
      setLoading(false);
      if (response.status === 200) {
        window.location.reload();
        navigate("/adminpage");

        if (response?.data?.data?.admin) {
          updateUser(response?.data?.data?.admin);
          localStorage.setItem("userType", "admin");
        }
        if (response?.data?.data?.token) {
          localStorage.setItem("token", response?.data?.data?.token);
        }
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome, Admin!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error);
      if (error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "An error occurred during login. Please try again later.",
        });
      }
    }
  };

  return (
    <>
      {!loading ? (
        <div className="container1">
          <section className="img">
            <img style={{ marginLeft: 0 }} src="/Image/Mobile login-pana.png" />
          </section>
          <section className="content">
            <div
              style={{
                marginTop: 0,
                marginLeft: -18,
                height: 470,
                width: 350,
                backgroundColor: "transparent",
              }}
              className="sign-main-container"
            >
              <h1 style={{ marginLeft: -13 }}>Admin</h1>
              <form onSubmit={handleSubmit}>
                <div style={{ marginLeft: -10 }} className="admin-email">
                  <label htmlFor="admin-email">Username</label>
                  <input
                    style={{ width: 280 }}
                    type="email"
                    name="admin-email"
                    id="admin-email"
                    placeholder="email@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div style={{ marginLeft: -10 }} className="admin-password">
                  <label htmlFor="admin-password">Password</label>
                  <input
                    style={{ width: 280 }}
                    type="password"
                    name="admin-password"
                    id="admin-password"
                    placeholder="password..."
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  style={{ marginTop: 20, marginLeft: 70, width: 110 }}
                  type="submit"
                >
                  Login
                </button>
              </form>
              <p style={{ marginLeft: -15 }}>
                Are you a Student?{" "}
                <span
                  onClick={() => {
                    setSignin(() => "signin");
                  }}
                >
                  Login
                </span>
              </p>
            </div>
          </section>
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            width: "100wh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DNA
            visible={loading}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
    </>
  );
}

export default Admin;
