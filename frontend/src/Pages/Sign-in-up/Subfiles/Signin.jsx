import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../signInUp.css";
import { UserContext } from "../../../context/UserContext";
import { DNA } from "react-loader-spinner";

function Signin({ setSignin, setLoginState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { updateUser } = React.useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function signInUser(e) {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:5111/api/user/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setLoading(false);

          window.location.reload();
          if (location.pathname == "/signin") {
            setTimeout(() => {
              navigate("/");
            }, 1000);
          } else {
            navigate("/home");
          }
          if (data?.data?.user) {
            updateUser(data?.data?.user);
            localStorage.setItem("userType", "student");
          }
          if (data?.data?.token) {
            localStorage.setItem("token", data?.data?.token);
          }
          Swal.fire({
            icon: "success",
            title: "Login Successful!",
            text: "You have been logged in.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Email or password, please try again!",
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Network error. Please try again later.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      {!loading ? (
        <div className="container2">
          <div className="container1">
            <section style={{ borderRadius: 10 }} className="img">
              <img
                style={{ marginLeft: -4 }}
                src="/Image/Mobile login-pana.png"
              />
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
                <h1 style={{ marginLeft: -40 }}>Sign in</h1>
                <form onSubmit={signInUser}>
                  <div style={{ marginLeft: -30 }} className="sign-in-email">
                    <label htmlFor="sign-in-email">Email</label>
                    <input
                      style={{ width: 280 }}
                      type="email"
                      name="sign-in-email"
                      id="sign-in-email"
                      placeholder="email@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </div>
                  <div style={{ marginLeft: -30 }} className="sign-in-password">
                    <label htmlFor="sign-in-password">Password</label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <input
                        style={{ width: 280, marginTop: -10 }}
                        type={showPassword ? "text" : "password"}
                        name="sign-in-password"
                        id="sign-in-password"
                        placeholder="password..."
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                      />
                      <span
                        type="button"
                        onClick={togglePasswordVisibility}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",

                          marginTop: -15,
                        }}
                      >
                        <i
                          style={{ marginLeft: -25 }}
                          className={showPassword ? "bx bx-hide" : "bx bx-show"}
                        />
                      </span>
                    </div>
                  </div>

                  <button
                    style={{ marginTop: 5, marginLeft: 40, width: 130 }}
                    type="submit"
                  >
                    Login
                  </button>
                </form>
                <Link
                  style={{ marginLeft: -40, marginTop: -8 }}
                  to="/forgot-password"
                >
                  Forgot Password?
                </Link>
                <p style={{ marginTop: 11, marginLeft: -40 }}>
                  Don't have an account?{" "}
                  <span onClick={() => setSignin(() => "signup")}>Sign up</span>
                </p>
                <p style={{ marginLeft: -40 }}>
                  Are you an admin?{" "}
                  <span onClick={() => setSignin(() => "admin")}>Login</span>
                </p>
              </div>
            </section>
          </div>
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

export default Signin;
