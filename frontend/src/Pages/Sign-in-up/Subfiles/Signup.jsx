import React, { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../signInUp.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

function Signup({ setSignin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfrimPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function signUpUser(e) {
    e.preventDefault();
    setLoading(true);
    if (password === conPassword) {
      try {
        const response = await axios.post(
          "http://localhost:5111/api/user/signup",
          {
            name,
            email,
            gender,
            password,
            parentEmail,
            phone,
          }
        );

        if (response.data.status === "success") {
          setLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 100);
          navigate("/home");
          if (response?.data?.data?.user) {
            updateUser(response?.data?.data?.user);
            localStorage.setItem("userType", "student");
          }
          if (response?.data?.data?.token) {
            localStorage.setItem("token", response?.data?.data?.token);
          }
          Swal.fire("Signup Successful!", "", "success").then(() => {});
        } else {
          setLoading(false);
          Swal.fire("Oops...", "Sign up failed. Please try again.", "error");
        }
      } catch (error) {
        setLoading(false);
        Swal.fire(
          "Oops...",
          "Network error occurred. Please try again later.",
          "error"
        );
      }
    } else {
      setLoading(false);
      Swal.fire(
        "Oops...",
        "Confirm password and Password does not match!",
        "error"
      );
    }
  }

  return (
    <>
      {!loading ? (
        <div className="sign-main-container1">
          <h1 style={{ marginTop: 25 }}>Sign up</h1>
          <form
            style={{ height: 500, width: 650, alignItems: "center" }}
            onSubmit={signUpUser}
          >
            <fieldset className="info">
              <div className="sign-up-name">
                <label htmlFor="sign-up-name">Name</label>
                <input
                  type="text"
                  name="sign-up-name"
                  id="sign-up-name"
                  placeholder="Full name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div className="sign-up-email">
                <label htmlFor="sign-up-email">Email</label>
                <input
                  type="email"
                  name="sign-up-email"
                  id="sign-up-email"
                  placeholder="email@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="sign-up-parent-email">
                <label htmlFor="sign-up-parent-email">Parent Email</label>
                <input
                  type="email"
                  name="sign-up-parent-email"
                  id="sign-up-parent-email"
                  placeholder="email@example.com"
                  onChange={(e) => setParentEmail(e.target.value)}
                  value={parentEmail}
                  required
                />
              </div>
              <div className="sign-up-phone">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  required
                />
              </div>

              <div className="sign-up-gender">
                <label htmlFor="sign-up-gender">Gender</label>
                <select
                  style={{ marginTop: 0, marginLeft: 5 }}
                  name="sign-up-gender"
                  id="sign-up-gender"
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                  required
                >
                  <option value="Male">Boy</option>
                  <option value="Female">Girl</option>
                </select>
              </div>
              <div className="sign-in-password">
                <label htmlFor="sign-up-password">Password</label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    name="sign-up-password"
                    id="sign-up-password"
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
                    }}
                  >
                    <i className={showPassword ? "bx bx-hide" : "bx bx-show"} />
                  </span>
                </div>
              </div>

              <div className="sign-up-con-password">
                <label htmlFor="sign-up-con-password">Confirm Password</label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="sign-up-con-password"
                    id="sign-up-con-password"
                    placeholder="confirm password..."
                    onChange={(e) => setConPassword(e.target.value)}
                    value={conPassword}
                    required
                  />
                  <span
                    type="button"
                    onClick={toggleConfrimPasswordVisibility}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <i
                      className={
                        showConfirmPassword ? "bx bx-hide" : "bx bx-show"
                      }
                    />
                  </span>
                </div>
              </div>
              <input type="submit" value={"Sign Up"} />
            </fieldset>
          </form>
          <p>
            Have an account?{" "}
            <span onClick={() => setSignin(() => "signin")}>Sign in</span>
          </p>
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

export default Signup;
