import React, { useContext, useState } from "react";
import "./AdminProfile.css";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const { user, updateUser } = useContext(UserContext);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConPassword, setConShowPassword] = useState(false);

  const toggleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfPassword = () => {
    setConShowPassword(!showConPassword);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5111/api/admin/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.data?.admin) {
          const admin = response?.data?.admin;
          setProfile({
            email: admin?.email,
            name: admin?.name,
            address: admin?.address,
            mobile: admin?.mobile,
          });
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5111/api/admin/profile",
        profile,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.status) {
        updateUser(response?.data?.admin);
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been updated successfully!",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Both Password are not matched!",
      });
      return;
    }

    try {
      const adminId = user?.id;
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5111/api/admin/password",
        {
          currentPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
          adminId: adminId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.status) {
        Swal.fire({
          icon: "success",
          title: "Password Changed",
          text: "Your password has been changed successfully!",
        });
        setPasswords({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setIsChangePasswordVisible(false);
      }
    } catch (error) {
      console.error("Error changing password:", error);
    } finally {
    }
  };

  return (
    <div className="profile-container">
      <h2>
        {isChangePasswordVisible
          ? "Change Password"
          : "Admin Profile Management"}
      </h2>

      {isChangePasswordVisible ? (
        <form className="password-form-admin" onSubmit={handlePasswordSubmit}>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password:</label>
            <div className="password-container">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                name="oldPassword"
                value={passwords.oldPassword}
                onChange={handlePasswordChange}
                required
              />
              <span
                type="button"
                onClick={toggleShowOldPassword}
                className="password-icon"
              >
                <i style={{marginLeft: -30}} className={showOldPassword ? "bx bx-hide" : "bx bx-show"} />
              </span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <div className="password-container">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                required
              />
              <span
                type="button"
                onClick={toggleShowNewPassword}
                className="password-icon"
              >
                <i style={{marginLeft: -30}} className={showNewPassword ? "bx bx-hide" : "bx bx-show"} />
              </span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmNewPassword">Confirm New Password:</label>
            <div className="password-container">
              <input
                type={showConPassword ? "text" : "password"}
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={passwords.confirmNewPassword}
                onChange={handlePasswordChange}
                required
              />
              <span
                type="button"
                onClick={toggleShowConfPassword}
                className="password-icon"
              >
                <i style={{marginLeft: -30}} className={showConPassword ? "bx bx-hide" : "bx bx-show"} />
              </span>
            </div>
          </div>
          <button style={{width: 149}} type="submit" className="btn-submit">
            {"Update Password"}
          </button>
        </form>
      ) : (
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile:</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={profile.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={profile.address}
              onChange={handleChange}
              required
            />
          </div>
          <button style={{width: 149}} type="submit" className="btn-submit">
            Update Profile
          </button>
        </form>
      )}
      <span
        onClick={() => setIsChangePasswordVisible(!isChangePasswordVisible)}
        className="btn-toggle"
      >
        {isChangePasswordVisible ? "Update Profile ?" : "Change Password ?"}
      </span>
    </div>
  );
};

export default AdminProfile;
